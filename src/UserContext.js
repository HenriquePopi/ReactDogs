import React from 'react';
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './Api/api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [logado, setLogado] = React.useState(null);
  const [carregando, setCarregando] = React.useState(false);
  const [erro, setErro] = React.useState(false);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setErro(null);
      setCarregando(false);
      setLogado(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const resposta = await fetch(url, options);
    const userJson = await resposta.json();
    setData(userJson);
    setLogado(true);
  }
  async function userLogin(username, password) {
    try {
      setErro(null);
      setCarregando(true);
      const { url, options } = TOKEN_POST({ username, password });
      const respostaToken = await fetch(url, options);
      if (!respostaToken.ok) throw new Error(`Erro: Usuário invalido.`);
      const { token } = await respostaToken.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err) {
      setErro(err.message);
      setLogado(false);
    } finally {
      setCarregando(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setErro(null);
          setCarregando(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido.');
          await getUser(token);
          //navigate('/conta');
        } catch (erro) {
          userLogout();
        } finally {
          setCarregando(false);
        }
      } else {
        setLogado(false);
      }
    }
    autoLogin();
    // eslint-disable-next-line no-use-before-define
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, data, userLogout, erro, carregando, logado }}
    >
      {children}
    </UserContext.Provider>
  );
};

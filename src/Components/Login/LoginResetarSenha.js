import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../Api/api';
import Erro from '../Helper/Erro';
import { useNavigate } from 'react-router';

const LoginResetarSenha = () => {
  const [login, setLogin] = React.useState();
  const [key, setKey] = React.useState();
  const senha = useForm();
  const { carregando, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (senha.validar) {
      const { url, options } = PASSWORD_RESET({
        login: login,
        key: key,
        password: senha.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input label="Nova senha" type="password" name="password" {...senha} />
        {carregando ? (
          <Button disabled>Alterando...</Button>
        ) : (
          <Button>Pronto</Button>
        )}
      </form>
      {error && <Erro erro={error} />}
    </div>
  );
};

export default LoginResetarSenha;

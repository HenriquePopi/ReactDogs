import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Erro from '../Helper/Erro';
import Styles from './LoginForm.module.css';
import StylesBtn from '../Forms/Button.module.css';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, erro, carregando } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validar() && password.validar()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section className="animeLeft">
      <h1 className="titulo">Login</h1>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <Input label="Usúario" name="username" type="text" {...username} />
        <Input label="Senha" name="password" type="password" {...password} />
        {carregando ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Erro erro={erro} />
      </form>
      <Link className={Styles.perdeu} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={Styles.cadastro}>
        <h2 className={Styles.subtitulo}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={StylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;

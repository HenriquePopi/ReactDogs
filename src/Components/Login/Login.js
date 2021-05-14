import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPerdeuSenha from './LoginPerdeuSenha';
import LoginResetarSenha from './LoginResetarSenha';
import { UserContext } from '../../UserContext';
import Styles from './Login.module.css';
import NotFound from '../NotFound';
import Head from '../Helper/Head';
const Login = () => {
  const { logado } = React.useContext(UserContext);
  if (logado === true) {
    return <Navigate to="/conta" />;
  }
  return (
    <section className={Styles.login}>
      <Head title="Login" />
      <div className={Styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPerdeuSenha />} />
          <Route path="resetar" element={<LoginResetarSenha />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;

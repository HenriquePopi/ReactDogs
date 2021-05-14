import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Erro from '../Helper/Erro';
import { PASSWORD_LOST } from '../../Api/api';

const LoginPerdeuSenha = () => {
  const login = useForm();
  const { error, data, carregando, request } = useFetch();
  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validar) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      await request(url, options);
    }
  }
  if (data) return <p style={{ color: '#4c1' }}>{data}</p>;
  return (
    <section>
      <h1 className="titulo"> Perdeu a senha?</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Email / Usuario" type="text" nam="email" {...login} />
        {carregando ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button> Enviar</Button>
        )}
      </form>
      {error && <Erro erro={error} />}
    </section>
  );
};

export default LoginPerdeuSenha;

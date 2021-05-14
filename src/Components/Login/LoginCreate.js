import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Api/api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Erro from '../Helper/Erro';

const LoginCreate = () => {
  const username = useForm('');
  const email = useForm('email');
  const password = useForm('');

  const { userLogin } = React.useContext(UserContext);
  const { carregando, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className={`animeLeft`}>
      <h1 className={`titulo`}>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usúario" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {carregando ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Erro erro={error} />
      </form>
    </section>
  );
};

export default LoginCreate;

import React from 'react';
import Styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Erro from '../Helper/Erro';
import { PHOTO_POST } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, carregando, request } = useFetch();
  const navegate = useNavigate();

  React.useEffect(() => {
    if (data) navegate('/conta');
  }, [data, navegate]);
  function createFormData() {
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);
    return formData;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = createFormData();
    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }
  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${Styles.userPhotoPost} animeLeft`}>
      <Head title="Nova Foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="text" name="peso" {...peso} />
        <Input label="Idade" type="text" name="idade" {...idade} />
        <input
          className={Styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {carregando ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Erro erro={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={Styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;

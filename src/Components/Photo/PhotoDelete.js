import React from 'react';
import { PHOTO_DELETE } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
import Styles from './PhotoDelete.module.css';

const PhotoDelete = ({ id }) => {
  const { request, carregando } = useFetch();
  async function handleClick(event) {
    const confirme = window.confirm(
      'Tem certeza que deseja deletar esta foto?',
    );
    if (confirme) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }
  return (
    <>
      {carregando ? (
        <button disabled className={Styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={Styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;

import React from 'react';
import { PHOTO_GET } from '../../Api/api';
import useFetch from '../../Hooks/useFetch';
import Carregando from '../Helper/Carregando';
import Erro from '../Helper/Erro';
import PhotoContent from '../Photo/PhotoContent';
import Styles from './FeedModal.module.css';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, carregando, error, request } = useFetch();

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  return (
    <div className={Styles.modal} onClick={handleOutsideClick}>
      {error && <Erro erro={error} />}
      {carregando && <Carregando />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

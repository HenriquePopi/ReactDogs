import React from 'react';
import useFetch from '../../Hooks/useFetch';
import FeedPhotoItem from './FeedPhotoItem';
import { PHOTOS_GET } from '../../Api/api';
import Erro from '../Helper/Erro';
import Carregando from '../Helper/Carregando';
import Styles from './FeedPhoto.module.css';

const FeedPhoto = ({ setModalPhoto, user, page, setInfinito }) => {
  const { data, carregando, error, request } = useFetch();

  React.useEffect(() => {
    const itens = 6;
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({
        page: page,
        totalItens: itens,
        user,
      });
      const { json, response } = await request(url, options);
      console.log('Request', json);
      if (response && response.ok && json.length < itens) setInfinito(false);
    }
    fetchPhotos();
  }, [request, user, page, setInfinito]);

  if (error) return <Erro erro={error} />;
  if (carregando) return <Carregando />;
  if (data)
    return (
      <ul className={`${Styles.feed} animeLeft`}>
        {data.map((photo) => {
          return (
            <FeedPhotoItem
              key={photo.id}
              photo={photo}
              setModalPhoto={setModalPhoto}
            />
          );
        })}
      </ul>
    );
  return null;
};

export default FeedPhoto;

import React from 'react';
import { useParams } from 'react-router';
import useFetch from '../../Hooks/useFetch';
import { GET_ONE_PHOTO } from '../../Api/api';
import Erro from '../Helper/Erro';
import Carregando from '../Helper/Carregando';
import PhotoContent from './PhotoContent';
import Head from '../Helper/Head';

const Photo = () => {
  const { id } = useParams();
  const { data, carregando, request, error } = useFetch();

  React.useEffect(() => {
    const { url } = GET_ONE_PHOTO(id);
    request(url);
  }, [request, id]);
  if (error) return <Erro erro={error} />;
  if (carregando) return <Carregando />;
  if (data) {
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  }
  return null;
};

export default Photo;

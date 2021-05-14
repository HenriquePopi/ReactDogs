import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Image from '../Helper/Image';
import PhotoComents from './PhotoComents';
import Styles from './PhotoContent.module.css';
import PhotoDelete from './PhotoDelete';
const PhotoContent = ({ data, single }) => {
  const usuario = React.useContext(UserContext);
  const { photo, comments } = data;
  return (
    <div className={`${Styles.photo} ${single ? Styles.photoSingle : ''} `}>
      <div className={Styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={Styles.details}>
        <div>
          <p className={Styles.author}>
            {usuario.data && usuario.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={Styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="titulo">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={Styles.atributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
        <PhotoComents id={photo.id} coments={comments} />
      </div>
    </div>
  );
};

export default PhotoContent;

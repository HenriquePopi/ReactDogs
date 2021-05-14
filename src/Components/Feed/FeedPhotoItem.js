import React from 'react';
import Image from '../Helper/Image';
import Styles from './FeedPhotoItem.module.css';
const FeedPhotoItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={Styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />

      <span className={Styles.visualizacoes}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;

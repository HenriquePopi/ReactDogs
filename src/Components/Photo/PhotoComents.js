import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoComentsForm from './PhotoComentsForm';
import Styles from './PhotoComents.module.css';
const PhotoComents = ({ id, coments }) => {
  const [comments, setComments] = React.useState(() => coments);
  const { logado } = React.useContext(UserContext);
  const secaoDeComentarios = React.useRef(null);

  React.useEffect(() => {
    // scrola os comentarios para os mais atuais
    secaoDeComentarios.current.scrollTop =
      secaoDeComentarios.current.scrollHeight;
  }, [comments]);
  return (
    <>
      <ul ref={secaoDeComentarios} className={Styles.commentList}>
        {comments &&
          comments.map((comentario) => (
            <li key={comentario.comment_id}>
              <b>{comentario.comment_author}: </b>
              <span>{comentario.comment_content}</span>
            </li>
          ))}
      </ul>
      {logado && <PhotoComentsForm id={id} setComments={setComments} />}
    </>
  );
};

export default PhotoComents;

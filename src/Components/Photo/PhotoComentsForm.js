import React from 'react';
import { COMMENT_POST } from '../../Api/api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Erro from '../Helper/Erro';
import Styles from './PhotoComentsForm.module.css';
const PhotoComentsForm = ({ id, setComments }) => {
  const { request, error } = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComments((comments) => [...comments, json]);
      setComment('');
    }
  }
  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
      <textarea
        className={Styles.textArea}
        placeholder="Comente..."
        id="comment"
        name="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={Styles.enviar}>
        <Enviar />
      </button>
      {error && <Erro erro={error} />}
    </form>
  );
};

export default PhotoComentsForm;

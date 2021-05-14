import React from 'react';
import FeedModal from './FeedModal';
import FeedPhoto from './FeedPhoto';
import PropTypes from 'prop-types';
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [infinito, setInfinito] = React.useState(true);
  const [paginas, setPaginas] = React.useState([1]);
  React.useEffect(() => {
    let espere = false;
    function scrollInfinito(event) {
      console.log(infinito);
      if (infinito === true) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !espere) {
          setPaginas([...paginas, paginas.length + 1]);
          espere = true;
          setTimeout(() => (espere = false), 500);
        }
      }
    }
    window.addEventListener('wheel', scrollInfinito);
    window.addEventListener('scrool', scrollInfinito);
    return () => {
      window.removeEventListener('wheel', scrollInfinito);
      window.removeEventListener('scrool', scrollInfinito);
    };
  }, [infinito, paginas]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {paginas.map((pagina) => {
        return (
          <FeedPhoto
            key={pagina}
            page={pagina}
            user={user}
            setModalPhoto={setModalPhoto}
            setInfinito={setInfinito}
          />
        );
      })}
    </div>
  );
};
Feed.protoTypes = {
  user: PropTypes.string.isRequired,
};

export default Feed;

import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Header.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data } = React.useContext(UserContext); // data = usuario
  return (
    <header className={Styles.header}>
      <nav className={`${Styles.nav} container`}>
        <Link to="/" className={Styles.logo} aria-label=" Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <>
            <Link
              to="/conta"
              className={Styles.login}
              aria-label="Nomde de usúario"
            >
              {data.nome}
            </Link>
          </>
        ) : (
          <Link to="/login" className={Styles.login} aria-label=" Dogs - Login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

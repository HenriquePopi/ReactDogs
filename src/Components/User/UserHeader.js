import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import Styles from './UserHeader.module.css';
import { useLocation } from 'react-router';
const UserHeader = () => {
  const [titulo, setTitulo] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/conta/estatisticas':
        setTitulo('Estatisticas');
        break;
      case '/conta/postar':
        setTitulo('Postar Foto');
        break;
      default:
        setTitulo('Minha Conta');
    }
  }, [location]);
  return (
    <header className={Styles.header}>
      <h1 className="titulo">{titulo}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;

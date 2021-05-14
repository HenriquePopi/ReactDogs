import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as Adicionar } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import Styles from './UserHeaderNav.module.css';
import useMedias from '../../Hooks/useMedias';
const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const isMobile = useMedias('(max-width: 40rem)');
  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);
  return (
    <>
      {isMobile && (
        <button
          className={`${Styles.mobileMenuButton} ${
            mobileMenu && Styles.mobileMenuButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${isMobile ? Styles.mobileNav : Styles.nav} ${
          mobileMenu && Styles.mobileNavActive
        }`}
      >
        <NavLink end to="/conta" activeClassName={Styles.active}>
          <MinhasFotos />
          {isMobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas" activeClassName={Styles.active}>
          <Estatisticas />
          {isMobile && 'Estatisticas'}
        </NavLink>
        <NavLink to="/conta/postar" activeClassName={Styles.active}>
          <Adicionar />
          {isMobile && 'Adicionar Foto'}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {isMobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;

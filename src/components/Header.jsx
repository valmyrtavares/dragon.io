import style from '../assets/style/Header.module.scss';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import ConfirmMessage from './Messages/InitialMessageCustomer';
import Login from './forms/Login';
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext'; //
import LogoImage from '../assets/image/Logo.png';
import useIsMobile from '../hook/useIsMobile';
import HamburgerButton from './HamburgerButton'; // Importando o componente HamburgerButton

const Header = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] =
    React.useState(false);
  const [loginPopup, setLoginPopup] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [linksMenuMobile, setLinksMenuMobile] = React.useState(false);
  const { login, setLogin } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile(650); // Hook para verificar se é mobile

  const isSellPage =
    location.pathname === '/user-rules' ||
    location.pathname === '/form' ||
    location.pathname === '/register';

  const handleNavigation = (event) => {
    event.preventDefault(); // Impede a navegação automática do Link

    setOpenCloseConfirmMessage(true);

    setMessage('O seu computador foi comprado na Dragon Computadores');
  };

  const Checklogin = () => {
    setLoginPopup(true);
  };

  const logout = () => {
    localStorage.removeItem('login');
    // window.location.reload();
    setLogin(false);
    navigate(`/`);
  };

  return isMobile ? (
    <div className={style.headerBtnMobileContainer}>
      {loginPopup && <Login setOpenClose={setLoginPopup} />}
      {!linksMenuMobile && (
        <div className={style.btnMobileContainer}>
          <div>
            <NavLink
              to="https://dragoncomputadores.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LogoImage} alt="Logo dragon" />
            </NavLink>
          </div>
          <HamburgerButton setLinksMenuMobile={setLinksMenuMobile} />
        </div>
      )}
      {linksMenuMobile && (
        <nav className={style.nav}>
          <ul
            className={style.navList}
            onClick={() => setLinksMenuMobile(false)}
          >
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to="/"
              >
                Vitrine
              </NavLink>
            </li>
            <li>
              <button
                className={isSellPage ? style.active : ''}
                onClick={handleNavigation}
              >
                Quero Vender
              </button>
            </li>
            {login && (
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? style.active : '')}
                  to="/customers"
                >
                  Clientes
                </NavLink>
              </li>
            )}
            {login ? (
              <h3 className={style.logout} onClick={logout}>
                Logado
              </h3>
            ) : (
              <button className={style.login} onClick={Checklogin}></button>
            )}
          </ul>
        </nav>
      )}
    </div>
  ) : (
    <header className={style.header}>
      {loginPopup && <Login setOpenClose={setLoginPopup} />}
      <div className={style.containerMessage}>
        {openCloseConfirmMessage && (
          <ConfirmMessage
            setCloseMessage={setOpenCloseConfirmMessage}
            message={message}
          />
        )}
      </div>
      <nav className={style.nav}>
        <div>
          <NavLink
            to="https://dragoncomputadores.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LogoImage} alt="Logo dragon" />
          </NavLink>
        </div>
        <ul className={style.navList}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? style.active : '')}
              to="/"
            >
              Vitrine
            </NavLink>
          </li>
          <li>
            <button
              className={isSellPage ? style.active : ''}
              onClick={handleNavigation}
            >
              Quero Vender
            </button>
          </li>
          {login && (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : '')}
                to="/customers"
              >
                Clientes
              </NavLink>
            </li>
          )}
        </ul>
        {login ? (
          <h3 className={style.logout} onClick={logout}>
            Logado
          </h3>
        ) : (
          <button onClick={Checklogin}></button>
        )}
      </nav>
    </header>
  );
};

export default Header;

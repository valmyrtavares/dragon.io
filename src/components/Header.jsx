import style from '../assets/style/Header.module.scss';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import ConfirmMessage from './Messages/InitialMessageCustomer';
import Login from './forms/Login';
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext'; //
import LogoImage from '../assets/image/Logo.png';

const Header = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] =
    React.useState(false);
  const [loginPopup, setLoginPopup] = React.useState(false);
  const [message, setMessage] = React.useState('');
  // const navigate = useNavigate();
  const { login, setLogin } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
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

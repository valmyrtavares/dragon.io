import style from '../assets/style/Header.module.scss';
import { Link } from 'react-router-dom';
import ConfirmMessage from './Messages/InitialMessageCustomer';
import Login from './forms/Login';
import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext'; //

const Header = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] =
    React.useState(false);
  const [loginPopup, setLoginPopup] = React.useState(false);
  const [message, setMessage] = React.useState('');
  // const navigate = useNavigate();
  const { login, setLogin } = useContext(GlobalContext);

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
    window.location.reload();
    setLogin(false);
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
        <ul className={style.navList}>
          <li>
            <Link to="/">Vitrine</Link>
          </li>
          <li>
            <a href="" onClick={handleNavigation}>
              Quero Vender
            </a>
          </li>
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

import React from 'react';
import style from '../assets/style/Header.module.scss';
import { Link } from 'react-router-dom';
import ConfirmMessage from './Messages/InitialMessageCustomer';
import Login from './forms/Login';

const Header = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] =
    React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [message, setMessage] = React.useState('');
  // const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.preventDefault(); // Impede a navegação automática do Link

    setOpenCloseConfirmMessage(true);

    setMessage('O seu computador foi comprado na Dragon Computadores');
  };

  const Checklogin = () => {
    setLogin(true);
  };

  return (
    <header className={style.header}>
      {login && <Login setOpenClose={setLogin} />}
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
        <button onClick={Checklogin}></button>
      </nav>
    </header>
  );
};

export default Header;

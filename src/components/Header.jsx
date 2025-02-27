import React from 'react';
import style from '../assets/style/Header.module.scss';
import { Link } from 'react-router-dom';
import ConfirmMessage from './Messages/ConfirmMessage';

const Header = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] =
    React.useState(false);
  const [message, setMessage] = React.useState('');
  // const navigate = useNavigate();

  const handleNavigation = (event) => {
    event.preventDefault(); // Impede a navegação automática do Link

    setOpenCloseConfirmMessage(true);

    setMessage('O seu computador foi comprado na Dragon Computadores');
  };

  return (
    <header className={style.header}>
      <div className={style.containerMessage}>
        {openCloseConfirmMessage && (
          <ConfirmMessage
            setCloseMessage={setOpenCloseConfirmMessage}
            message={message}
          />
        )}
      </div>
      <nav>
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
      </nav>
    </header>
  );
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/style/setBriefMessage.module.scss';
import { useNavigate } from 'react-router-dom';

const BriefMessage = ({ message, setClose, setCloseMessage, adress }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (setClose) setClose(false);
      if (setCloseMessage) setCloseMessage(false);
      if (adress) navigate(adress); // Agora deve navegar corretamente
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={style.container}>
      <div className={style.messageBox}>{message}</div>
    </div>
  );
};

BriefMessage.propTypes = {
  message: PropTypes.string.isRequired,
  adress: PropTypes.string, //  opcional
  setCloseMessage: PropTypes.func, //  opcional
  setClose: PropTypes.func.isRequired,
};

export default BriefMessage;

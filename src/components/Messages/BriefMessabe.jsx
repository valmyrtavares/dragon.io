import React from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/style/setBriefMessage.module.scss';

const BriefMessage = ({ message, setClose, setCloseMessage }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClose(false);
      setCloseMessage(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setClose]);

  return (
    <div className={style.container}>
      <div className={style.messageBox}>{message}</div>
    </div>
  );
};

BriefMessage.propTypes = {
  message: PropTypes.string.isRequired,
  setClose: PropTypes.func.isRequired,
  setCloseMessage: PropTypes.func.isRequired,
};

export default BriefMessage;

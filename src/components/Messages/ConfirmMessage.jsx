import style from '../../assets/style/ConfirmMessage.module.scss';
import PropTypes from 'prop-types';

const ConfirmMessage = ({ setCloseMessage, defaultMessage, goOn }) => {
  return (
    <div className={style.container}>
      <div className={style.geralContainerConfirmMessage}>
        <div>
          {' '}
          <h1>{defaultMessage}</h1>
        </div>
        <div className={style.containerBtn}>
          <button onClick={goOn}>Sim</button>
          <button onClick={() => setCloseMessage(false)}>Não</button>
        </div>
      </div>
    </div>
  );
};

ConfirmMessage.propTypes = {
  setCloseMessage: PropTypes.func.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  goOn: PropTypes.func.isRequired,
};
export default ConfirmMessage;

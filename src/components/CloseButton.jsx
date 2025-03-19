import styles from '../assets/style/CloseButton.module.scss';
import PropTypes from 'prop-types';

const CloseButton = ({ setOpenClose }) => {
  return (
    <div className={styles.containerCloseBtn}>
      <button
        className={styles.closeButton}
        onClick={() => setOpenClose(false)}
      >
        x
      </button>
    </div>
  );
};
CloseButton.propTypes = {
  setOpenClose: PropTypes.func.isRequired,
};
export default CloseButton;

import styles from '../assets/style/CloseButton.module.scss';
import PropTypes from 'prop-types';

const CloseButton = ({ setOpenClose, right, top }) => {
  return (
    <div className={styles.containerCloseBtn}>
      <button
        style={{ position: 'aboslute', right: right, top: top }}
        className={styles.closeButton}
        onClick={() => setOpenClose(false)}
      >
        x
      </button>
    </div>
  );
};
CloseButton.propTypes = {
  left: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  setOpenClose: PropTypes.func.isRequired,
};
export default CloseButton;

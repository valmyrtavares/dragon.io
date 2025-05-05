import styles from '../assets/style/HamburgerButton.module.scss';
import PropTypes from 'prop-types';

const HamburgerButton = ({ setLinksMenuMobile }) => {
  return (
    <button
      className={styles.mobile}
      onClick={() => setLinksMenuMobile((prev) => !prev)}
    >
      {' '}
      <span></span>
    </button>
  );
};
export default HamburgerButton;
HamburgerButton.propTypes = {
  setLinksMenuMobile: PropTypes.func.isRequired,
};

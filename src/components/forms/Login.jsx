import PropTypes from 'prop-types';
import styles from '../../assets/style/Login.module.scss';
import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext'; //
import CloseButton from '../CloseButton';

const Login = ({ setOpenClose }) => {
  const [password, setPassword] = React.useState('');
  const { setLogin } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      localStorage.removeItem('login');
    } else {
      localStorage.setItem('login', 'true');
    }
  }, [setOpenClose]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = 'jadeucerto'; // Replace with your actual password
    if (password === correctPassword) {
      localStorage.setItem('login', 'true');
      setLogin(true);
      setOpenClose(false);
    } else {
      alert('Incorrect password');
    }
  };
  React.useEffect(() => {
    const inputElement = document.querySelector(`.${styles.input}`);
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <CloseButton setOpenClose={setOpenClose} />
      <h2>Please enter your password</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Password:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.showPassword}>
          Confira a senha
          <input
            type="checkbox"
            checked={showPassword}
            onChange={toggleShowPassword}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  setOpenClose: PropTypes.func.isRequired,
};

export default Login;

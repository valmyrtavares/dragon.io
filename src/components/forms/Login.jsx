import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/style/Login.module.scss';

const Login = ({ setOpenClose }) => {
  const [password, setPassword] = React.useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = '1234'; // Replace with your actual password
    if (password === correctPassword) {
      localStorage.setItem('login', 'true');
      setOpenClose(false);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Please enter your password</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={handleChange}
            className={styles.input}
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

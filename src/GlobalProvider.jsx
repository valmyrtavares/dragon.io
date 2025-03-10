import React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from './GlobalContext';

export const GlobalProvider = ({ children }) => {
  const [currentCustomer, setCurrentCustomer] = React.useState({});
  const [cpf, setCpf] = React.useState(''); // 🔹 Estado para armazenar o CPF
  const [login, setLogin] = React.useState(''); // 🔹 Estado para armazenar o CPF

  return (
    <GlobalContext.Provider
      value={{
        currentCustomer,
        setCurrentCustomer,
        cpf,
        setCpf,
        setLogin,
        login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from 'prop-types';
import styles from '../../assets/style/PopupCustomerDetails.module.scss';
import React from 'react';

const PopupCustomerDetails = ({ customer, setClose }) => {
  if (Array.isArray(customer)) {
    customer = customer[0];
  }
  React.useEffect(() => {
    console.log('Customer', customer);
  }, [customer]);

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    alert('Copied to clipboard: ' + value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.containerBtn}>
          <button
            className={styles.closeButton}
            onClick={() => setClose(false)}
          >
            X
          </button>
        </div>

        {!customer ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2>Customer Details</h2>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.cnpj)}
            >
              <strong>CNPJ:</strong> {customer.cnpj}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.cpf)}
            >
              <strong>CPF:</strong> {customer.cpf}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.email)}
            >
              <strong>Email:</strong> {customer.email}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.name)}
            >
              <strong>Name:</strong> {customer.name}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.phone)}
            >
              <strong>Phone:</strong> {customer.phone}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.purchaseDate)}
            >
              <strong>Purchase Date:</strong> {customer.purchaseDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PopupCustomerDetails.propTypes = {
  customer: PropTypes.shape({
    cnpj: PropTypes.string,
    cpf: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    purchaseDate: PropTypes.string,
  }).isRequired,
  setClose: PropTypes.func.isRequired,
};

export default PopupCustomerDetails;
/* PopupCustomerDetails.module.scss */

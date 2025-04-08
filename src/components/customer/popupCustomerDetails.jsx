import PropTypes from 'prop-types';
import styles from '../../assets/style/PopupCustomerDetails.module.scss';
import React from 'react';

const PopupCustomerDetails = ({ customer, setClose }) => {
  if (Array.isArray(customer)) {
    customer = customer[0];
  }
  React.useEffect(() => {
    console.log('Customer objeto', customer);
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
            <h2>Detalhes do Cliente</h2>
            {customer.cnpj && (
              <div
                className={styles.detail}
                onClick={() => copyToClipboard(customer.cnpj)}
              >
                <strong>CNPJ:</strong>
                {customer.cnpj ? customer.cnpj : ''}
              </div>
            )}
            {customer.cpf && (
              <div
                className={styles.detail}
                onClick={() => copyToClipboard(customer.cpf)}
              >
                <strong>CPF:</strong> {customer.cpf}
              </div>
            )}
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
              <strong>Nome:</strong> {customer.name}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.phone)}
            >
              <strong>Telefone / Whatsapp:</strong> {customer.phone}
            </div>
            <div
              className={styles.detail}
              onClick={() => copyToClipboard(customer.purchaseDate)}
            >
              <strong>Data da compra:</strong> {customer.purchaseDate}
            </div>
            {customer.productIds && customer.productIds.length > 0 && (
              <div className={styles.detail}>
                <strong>Produtos:</strong>
                <ul>
                  {customer.productIds.map((productId) => (
                    <li key={productId}>{productId}</li>
                  ))}
                </ul>
              </div>
            )}
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
    productIds: PropTypes.array, // Assuming productIds is an array of product IDs
  }).isRequired,
  setClose: PropTypes.func.isRequired,
};

export default PopupCustomerDetails;
/* PopupCustomerDetails.module.scss */

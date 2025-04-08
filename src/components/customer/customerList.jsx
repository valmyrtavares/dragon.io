import React from 'react';
import { getListData } from '../../api/Api';
import styles from '../../assets/style/CustomerList.module.scss';

const CustomerList = () => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getListData('customer');
        setCustomers(data);
        const products = await getListData('products');
        const updatedCustomers = data.map((customer) => {
          const customerProducts = products
            .filter((product) => product.customerCpf === customer.cpf)
            .map((product) => product.id);
          return { ...customer, productIds: customerProducts };
        });
        setCustomers(updatedCustomers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);
  React.useEffect(() => {
    console.log('Clientes atualizados  ', customers);
  }, [customers]);

  return (
    <div className={styles.customerList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Celular</th>
            <th>CPF</th>
            <th>CNPJ</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.cpf}</td>
              <td>{customer.cnpj}</td>
              <td>{customer.email}</td>
              <td>
                <button className={styles.viewProductsButton}>
                  Ver Produtos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;

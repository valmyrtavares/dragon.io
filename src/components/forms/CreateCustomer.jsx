import React from 'react';
import styles from '../../assets/style/CreateCustomer.module.scss';

const CreateCustomer = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cnpj: '',
    purchaseDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customers = JSON.parse(localStorage.getItem('customer')) || [];
    customers.push(form);
    localStorage.setItem('customer', JSON.stringify(customers));
    setForm({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      cnpj: '',
      purchaseDate: '',
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>CNPJ:</label>
          <input
            type="text"
            name="cnpj"
            value={form.cnpj}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Data de Compra:</label>
          <input
            type="text"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCustomer;

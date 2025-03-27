import React from 'react';
import styles from '../../assets/style/CreateCustomer.module.scss';
import BriefMessage from '../Messages/BriefMessage';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext'; //
import { addDataToCollection } from '../../api/Api';

const CreateCustomer = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cnpj: '',
    purchaseDate: '',
  });
  const [briefMessage, setBriefMessage] = React.useState(false);
  const { setCpf, setCurrentCustomer } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue = formatField(name, value);

    if (name === 'cpf' || name === 'cnpj' || name === 'phone') {
      setForm({
        ...form,
        [name]: formattedValue,
      });
      return;
    }

    if (name === 'purchaseDate') {
      const [year, month, day] = value.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      setForm({
        ...form,
        [name]: formattedDate,
      });
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const formatField = (name, value) => {
    if (name === 'cpf') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (name === 'cnpj') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    } else if (name === 'phone') {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.cpf === '' && form.cnpj === '') {
      alert('Por favor, preencha o campo CPF ou CNPJ.');
      return;
    }
    setCpf(form.cpf);
    setCurrentCustomer(form);
    try {
      const docRef = await addDataToCollection('customer', form);
      console.log('Document created with ID: ', docRef.id);
      setBriefMessage(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        cnpj: '',
        purchaseDate: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Ocorreu um erro ao criar o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      {briefMessage && (
        <BriefMessage
          message="Seu cadastro foi criado com sucesso, agora vc pode cadastrar o seu produto"
          setClose={setBriefMessage}
          adress="/user-rules"
        />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Phone:</label>
          <input
            required
            type="text"
            name="phone"
            maxLength="15"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            maxLength="14"
            value={form.cpf}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>CNPJ:</label>
          <input
            type="text"
            name="cnpj"
            maxLength="18"
            value={form.cnpj}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Data de Compra:</label>
          <input
            required
            type="date"
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

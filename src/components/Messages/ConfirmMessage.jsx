import React from 'react';
import style from '../../assets/style/ConfirmMessage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import BriefMessage from './BriefMessabe';

// eslint-disable-next-line react/prop-types
const ConfirmMessage = ({ setCloseMessage, message }) => {
  const navigate = useNavigate();
  const [firstMessage, setFirstMessage] = React.useState(true);
  const [briefMessage, setBriefMessage] = React.useState(false);
  const [briefMessageCpfNotFounded, setBriefMessageCpfNotFounded] =
    React.useState(false);

  const [cpf, setCpf] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setCpf(value);
  };

  const checkoutCpf = () => {
    if (cpf) {
      const customers = JSON.parse(localStorage.getItem('customer')) || [];
      const customerExists = customers.some((customer) => customer.cpf === cpf);
      if (customerExists) {
        console.log('CPF não encontrado');
        setCloseMessage(false);
        navigate('/form');
      } else {
        console.log('Temos um CPF   ', cpf);
        setBriefMessageCpfNotFounded(true);
        navigate('/register');
      }
    }
  };

  const finishDeal = () => {
    setBriefMessage(true);
  };

  const callCpf = () => {
    setFirstMessage(false);
    setCloseMessage(true);
  };
  return (
    <div className={style.container}>
      <div className={style.geralContainerConfirmMessage}>
        {firstMessage && (
          <div>
            <div>{message && <h1>{message}</h1>}</div>
            <div className={style.containerBtn}>
              <button onClick={callCpf}>Sim</button>
              <button onClick={finishDeal}>Não</button>
            </div>
          </div>
        )}
        <div className={style.geralContainerConfirmMessage}>
          {briefMessage && (
            <BriefMessage
              message="Somente computadores comprados na Dragon podem ser comercializados nesse site"
              setClose={setBriefMessage}
              setCloseMessage={setCloseMessage}
            />
          )}
          {briefMessageCpfNotFounded && (
            <BriefMessage
              message="O seu Número de CPF não foi encontrado, por favor cadastre-se"
              setClose={setBriefMessage}
              setCloseMessage={setCloseMessage}
            />
          )}
        </div>
        setClose={setBriefMessage}
        {!firstMessage && (
          <div className={style.containerCpf}>
            <h1>
              Já vendeu pela Dragon Computadores? Se sim entre com seu cpf caso
              contrário, cadastre-se!
            </h1>
            <input
              type="text"
              value={cpf}
              onChange={handleChange}
              onBlur={checkoutCpf}
              maxLength="11"
              placeholder="Digite seu CPF"
            />
            <Link to="/register">Cadastre-se</Link>
          </div>
        )}
        ;
      </div>
    </div>
  );
};
export default ConfirmMessage;

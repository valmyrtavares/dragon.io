import style from '../../assets/style/ConfirmMessage.module.scss';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import BriefMessage from './BriefMessabe';
import { GlobalContext } from '../../GlobalContext'; //

// eslint-disable-next-line react/prop-types
const InitialMessageCustomer = ({ setCloseMessage, message }) => {
  const navigate = useNavigate();
  const [firstMessage, setFirstMessage] = React.useState(true);
  const [briefMessage, setBriefMessage] = React.useState(false);
  const [briefMessageCpfNotFounded, setBriefMessageCpfNotFounded] =
    React.useState(false);
  const { setCpf, setCurrentCustomer } = useContext(GlobalContext);

  const [currentCpf, setCurrentCpf] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrentCpf(value);
  };

  const registerAndClose = () => {
    navigate('/register');
    setCloseMessage(false);
  };

  const checkoutCpf = () => {
    if (currentCpf) {
      const customers = JSON.parse(localStorage.getItem('customer')) || []; //grabbing the customer from local storage
      const customerExists = customers.filter(
        //compare the currentCpf with the cpf in the local storage
        (customer) => customer.cpf.replace(/[.-]/g, '') === currentCpf
      );

      if (customerExists.length > 0) {
        setCpf(currentCpf); //set the currentCpf in the global context
        setCurrentCustomer(customerExists); //set the complete data customer in the global context
        setCloseMessage(false);
        navigate('/user-rules');
      } else {
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
              value={currentCpf}
              onChange={handleChange}
              onBlur={checkoutCpf}
              maxLength="11"
              placeholder="Digite seu CPF"
            />
            <p className={style.register} onClick={registerAndClose}>
              Registre-se
            </p>
          </div>
        )}
        ;
      </div>
    </div>
  );
};
export default InitialMessageCustomer;

import { useState, useEffect } from 'react';
import style from '../../assets/style/InputProducts.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmMessage from '../Messages/ConfirmMessage';
import { GlobalContext } from '../../GlobalContext'; //
import { useContext } from 'react';
import BriefMessage from '../Messages/BriefMessage';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  addDataToCollection,
  uploadImage,
  getDataById,
  updateDataInCollection,
  deleteDataFromCollection,
  getDataByField,
  sendEmail,
} from '../../api/Api';

const MAX_LENGTH = 350; // Defina o limite de caracteres

const InputProducts = () => {
  const [OpenCloseConfirmSaveMessage, setOpenCloseConfirmSaveMessage] =
    useState(false);
  const [briefMessage, setBriefMessage] = React.useState(false);
  const [characterCpuCounter, setCharacterCpuCounter] = React.useState(0);
  const [characterMotherBoardCounter, setCharacterMotherBoardCounter] =
    React.useState(0);
  const { cpf, login } = useContext(GlobalContext);
  const [text, setText] = React.useState('');
  const [OpenCloseConfirmDeleteMessage, setOpenCloseConfirmDeleteMessage] =
    React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    cpu: '',
    processorBrand: '',
    graphicsCardBrand: '',
    motherBoard: '',
    cpuText: '',
    tower: '',
    adApproved: false,
    font: '',
    memory: '',
    graphicsCard: '',
    cooling: '',
    amoutCables: '',
    ages: '',
    link: '',
    motherBoardText: '',
    customerCpf: '',
    images: [],
  });

  useEffect(() => {
    const fetchObjectProduct = async () => {
      if (id) {
        const storedProduct = await getDataById('products', id);

        if (
          storedProduct &&
          typeof storedProduct === 'object' &&
          Object.keys(storedProduct).length > 0
        ) {
          setFormData({
            title: storedProduct.title,
            price: storedProduct.price,
            cpu: storedProduct.cpu,
            motherBoard: storedProduct.motherBoard,
            adApproved: storedProduct.adApproved,
            customerCpf: storedProduct.customerCpf,
            processorBrand: storedProduct.processorBrand,
            graphicsCardBrand: storedProduct.graphicsCardBrand,
            cpuText: storedProduct.cpuText,
            tower: storedProduct.tower,
            font: storedProduct.font,
            memory: storedProduct.memory,
            graphicsCard: storedProduct.graphicsCard,
            cooling: storedProduct.cooling,
            amoutCables: storedProduct.amoutCables,
            ages: storedProduct.ages,
            link: storedProduct.link,
            motherBoardText: storedProduct.motherBoardText,
            images: storedProduct.images,
          });
        }
      }
    };
    fetchObjectProduct();
  }, []);

  React.useEffect(() => {
    console.log('FormData atualizado   ', formData);
  }, [formData]); // Adicione um efeito colateral para verificar o formData atualizado

  const handleChange = (e) => {
    let { id, value } = e.target;

    if (id === 'price') {
      value = value.replace(/\D/g, ''); // Remove non-numeric characters
      value = (parseFloat(value) / 100).toFixed(2); // Format as a decimal with two places
      value = `R$ ${value.replace('.', ',')}`; // Add "R$" and replace dot with comma
    }

    if (
      id !== 'title' &&
      id !== 'ages' &&
      id !== 'motherBoardText' &&
      id !== 'cpuText' &&
      id !== 'link' &&
      id !== 'processorBrand' &&
      id !== 'graphicsCardBrand'
    ) {
      value = value.toUpperCase();
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadImage(file, setProgress, setUrl, setFormData);
      } catch (error) {
        console.error('Erro no upload:', error);
      }
    }
  };

  const handleQuillChange = (value, id) => {
    const textOnly = value.replace(/<[^>]*>/g, ''); // Contar apenas caracteres visíveis

    if (textOnly.length <= MAX_LENGTH) {
      setText(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleKeyDown = (id) => {
    const textOnly = text.replace(/<[^>]*>/g, ''); // Contar apenas texto sem tags
    if (id === 'cpuText') {
      setCharacterCpuCounter(textOnly.length); // Atualiza o contador de caracteres para CPU
    } else if (id === 'motherBoardText') {
      setCharacterMotherBoardCounter(textOnly.length); // Atualiza o contador de caracteres para Placa Mãe
    }
    textOnly.length; // Atualiza o contador de caracteres
    if (textOnly.length >= MAX_LENGTH && event.key !== 'Backspace') {
      event.preventDefault(); // Bloqueia a entrada de novos caracteres
    }
  };

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     images: files,
  //   }));
  // };

  const saveForm = () => {
    if (OpenCloseConfirmSaveMessage === false) {
      console.log('formData', formData);
      const missingFields = Object.keys(formData).filter(
        (key) =>
          key !== 'link' &&
          (formData[key] === '' || formData[key] === undefined)
      );

      if (missingFields.length > 0) {
        alert(
          `Os seguintes campos precisam ser preenchidos: ${missingFields.join(
            ', '
          )}`
        );
        return;
      }
      setOpenCloseConfirmSaveMessage(true);
      return;
    }
    setOpenCloseConfirmSaveMessage(false);
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    if (!e || typeof e.preventDefault !== 'function') {
      // Se e não existir ou não for um evento válido, criar um mock
      e = { preventDefault: () => {} };
    }

    e.preventDefault();
    formData.price = formData.price.replace('R$ ', '').replace(',00', '');
    //const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (id) {
      formData.customerCpf = formatCpf(formData.customerCpf);
      // storedProducts[id] = formData;
      updateDataInCollection('products', id, formData);
      navigate('/');
      return;
    }
    formData.customerCpf = formatCpf(cpf);
    debugger;
    // storedProducts.push(formData);
    const idCreated = await addDataToCollection('products', formData);
    await prepareEmail(idCreated);

    setFormData({
      id: '',
      title: '',
      price: '',
      cpu: '',
      motherBoard: '',
      tower: '',
      cpuText: '',
      processorBrand: '',
      graphicsCardBrand: '',
      motherBoardText: '',
      font: '',
      graphicsCard: '',
      customerCpf: '',
      memory: '',
      cooling: '',
      amoutCables: '',
      ages: '',
      link: '',
      images: [],
    });
    setBriefMessage(true);
  };
  const formatCpf = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const prepareEmail = async (id) => {
    const customerCpf = formatCpf(cpf);
    const currentCustomer = await getDataByField(
      'customer',
      'cpf',
      customerCpf
    );
    console.log('EMAIL   ', currentCustomer.email);
    console.log('ID DO PRODUTO   ', id);
    try {
      await sendEmail(currentCustomer.email, id); // Envia o email com o ID do produto
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  };

  // Função para remover a imagem
  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Filtra a imagem pelo índice
    }));
  };
  // const removeSize = (str) => (str.length > 6 ? str.slice(0, 6) + '...' : str);

  const DeleteCard = (openClosePopup) => {
    if (id) {
      if (openClosePopup) {
        deleteDataFromCollection('products', id);
        setOpenCloseConfirmDeleteMessage(false);
        navigate('/');
        return;
      }
      setOpenCloseConfirmDeleteMessage(true);
    }
  };

  return (
    <div className={style.productFormContainer}>
      {briefMessage && (
        <BriefMessage
          message="Seu produto foi criado com sucesso. Ele será avaliado e em breve estará disponível para venda."
          setClose={setBriefMessage}
          adress="/"
        />
      )}
      {OpenCloseConfirmDeleteMessage && (
        <ConfirmMessage
          defaultMessage="Você está prestes a excluir esse card. Tem certeza que quer continuar"
          setCloseMessage={setOpenCloseConfirmDeleteMessage}
          goOn={() => DeleteCard(true)}
        />
      )}
      {OpenCloseConfirmSaveMessage && (
        <ConfirmMessage
          defaultMessage="Tem certeza que quer enviar os dados?"
          setCloseMessage={setOpenCloseConfirmSaveMessage}
          goOn={() => saveForm()}
        />
      )}
      <h2>Formulário para máquinas Dragon</h2>
      <button onClick={sendEmail}>Clique de mandar email</button>
      <form className={style.formContainer}>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="title">Título/Aplicação:</label>
            <select
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            >
              <option value="">Selecione sua opção</option>
              <option value="Gamer">Gamer</option>
              <option value="Escritório">Escritório</option>
              <option value="Render">Render</option>
              <option value="Doméstico">Doméstico</option>
              <option value="Edição de Video">Edição de Video</option>
            </select>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="price">Preço:</label>
            <input
              type="text"
              required
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="processador" title="modelo">
              Processador:
            </label>
            <input
              title="modelo"
              type="text"
              required
              id="cpu"
              value={formData.cpu}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="processorBrand">Marca do Processador:</label>
            <select
              id="processorBrand"
              required
              value={formData.processorBrand}
              onChange={handleChange}
            >
              <option value="">Selecione sua opção</option>
              <option value="AMD">AMD</option>
              <option value="Intel">Intel</option>
            </select>
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="graphicsCard" title="modelo e memoria">
              Placa de Video:
            </label>
            <input
              title="modelo e memoria"
              type="text"
              id="graphicsCard"
              value={formData.graphicsCard}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="graphicsCardBrand">Marca da Placa de vídeo:</label>
            <select
              id="graphicsCardBrand"
              value={formData.graphicsCardBrand}
              required
              onChange={handleChange}
            >
              <option value="">Selecione sua opção</option>
              <option value="AMD">AMD</option>
              <option value="Arc">Arc</option>
              <option value="NVIDEA">Nvidea</option>
            </select>
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="processador" title="quantidade, frequencia e marca">
              Memória:
            </label>
            <input
              title="quantidade, frequencia e marca"
              type="text"
              required
              id="memory"
              value={formData.memory}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard" title="modelo e marca">
              Refrigeração:
            </label>
            <input
              title="modelo e marca"
              type="text"
              required
              id="cooling"
              value={formData.cooling}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard" title="Marca e modelo">
              Placa de mãe:
            </label>
            <input
              title="Marca e modelo"
              type="text"
              required
              id="motherBoard"
              value={formData.motherBoard}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="font" title="Watt´s, marca e certificação">
              Fonte:
            </label>
            <input
              title="Watt´s, marca e certificação"
              type="text"
              id="font"
              value={formData.font}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="quantidadeDeCabos" title="modelos">
              {' '}
              Cabos:
            </label>
            <input
              title="modelos"
              type="text"
              id="amoutCables"
              value={formData.amoutCables}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="font" title="modelo e marca.">
              Gabinete:
            </label>
            <input
              title="modelo e marca."
              type="text"
              id="tower"
              value={formData.tower}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="quantidadeDeCabos">Data da Compra</label>
            <input
              type="date"
              id="ages"
              value={formData.ages}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="images">Imagens:( png, jpg, jpeg )</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
            />

            <progress value={progress} max="100" />
            {url && (
              <img
                className={style.imagePreview}
                src={url}
                alt="Uploaded file"
              />
            )}
          </div>
        </div>
        <div className={style.containerImages}>
          {formData &&
            formData.images &&
            formData.images.length > 0 &&
            formData.images.map((item, index) => (
              <div key={index} className={style.imageItem}>
                <button
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '50px', // Aumente para um tamanho adequado
                    height: '40px', // Aumente para um tamanho adequado
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                  type="button"
                  onClick={() => removeImage(index)}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '2px 5px',
                      fontSize: '12px',
                    }}
                  >
                    X
                  </span>
                </button>
              </div>
            ))}
        </div>
        <div className={style.formTextareaColumn}>
          <div className={style.textareaColumn}>
            <label htmlFor="motherBoardText">ESPECIFICAÇÕES PLACA MÃE:</label>
            <ReactQuill
              id="motherBoardText"
              className={style.textField}
              value={formData.motherBoardText}
              onChange={(value) => handleQuillChange(value, 'motherBoardText')}
              onKeyDown={() => handleKeyDown('motherBoardText')}
            />
            <div className={style.characterCounter}>
              {characterMotherBoardCounter}/{MAX_LENGTH} caracteres
            </div>
          </div>
          <div className={style.textareaColumn}>
            <label htmlFor="cpuText" title="modelo, htz, cache e marca">
              ESPECIFICAÇÕES DO PROCESSADOR:
            </label>
            <ReactQuill
              id="cpuText"
              title="modelo, htz, cache e marca"
              className={style.textField}
              value={formData.cpuText}
              onChange={(value) => handleQuillChange(value, 'cpuText')}
              onKeyDown={() => handleKeyDown('cpuText')} // Impede digitação acima do limite
            />
            <div className={style.characterCounter}>
              {characterCpuCounter}/{MAX_LENGTH} caracteres
            </div>
          </div>
        </div>
        <div className={style.btnContainer}>
          <button type="button" onClick={saveForm}>
            Salvar
          </button>
          <button type="button" onClick={() => DeleteCard(false)}>
            Excluir
          </button>
        </div>
        <div className={style.formRow}>
          {login && (
            <div className={style.formGroup}>
              <label htmlFor="adApproved">Aprovar Anúncio:</label>
              <input
                type="checkbox"
                id="adApproved"
                checked={formData.adApproved}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    adApproved: e.target.checked,
                  }))
                }
              />
              <span>
                Somente os inputs checados aparecerão na área de cliente.
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputProducts;

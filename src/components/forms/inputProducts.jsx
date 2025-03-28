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
import { addDataToCollection, uploadImage, getDataById } from '../../api/Api';

const MAX_LENGTH = 350; // Defina o limite de caracteres

const InputProducts = () => {
  const [OpenCloseConfirmSaveMessage, setOpenCloseConfirmSaveMessage] =
    useState(false);
  const [briefMessage, setBriefMessage] = React.useState(false);
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
    motherBoard: '',
    cpuText: '',
    storage: '',
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
        console.log('Objeto selecionado   ', storedProduct);

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
            cpuText: storedProduct.cpuText,
            storage: storedProduct.storage,
            tower: storedProduct.tower,
            font: storedProduct.font,
            memory: storedProduct.memory,
            graphicsCard: storedProduct.graphicsCard,
            cooling: storedProduct.cooling,
            amoutCables: storedProduct.amoutCables,
            ages: storedProduct.ages,
            link: storedProduct.link,
            customerCpf: cpf,
            motherBoardText: storedProduct.motherBoardText,
            images: storedProduct.images,
          });
        }
      }
    };
    fetchObjectProduct();
  }, []);

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
      id !== 'link'
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

  const handleKeyDown = (event) => {
    const textOnly = text.replace(/<[^>]*>/g, ''); // Contar apenas texto sem tags
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
      setOpenCloseConfirmSaveMessage(true);
      return;
    }
    setOpenCloseConfirmSaveMessage(false);
    handleSubmit();
  };

  const handleSubmit = (e) => {
    if (!e || typeof e.preventDefault !== 'function') {
      // Se e não existir ou não for um evento válido, criar um mock
      e = { preventDefault: () => {} };
    }

    e.preventDefault();
    formData.price = formData.price.replace('R$ ', '').replace(',00', '');
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (id) {
      formData.customerCpf = formatCpf(cpf);
      storedProducts[id] = formData;
      // updateDataInCollection('products', id, formData);
      //localStorage.setItem('products', JSON.stringify(storedProducts));
      navigate('/');
      return;
    }
    formData.customerCpf = formatCpf(cpf);
    storedProducts.push(formData);
    //localStorage.setItem('products', JSON.stringify(storedProducts));
    addDataToCollection('products', formData);
    setFormData({
      id: '',
      title: '',
      price: '',
      cpu: '',
      motherBoard: '',
      storage: '',
      tower: '',
      cpuText: '',
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

  const addImage = () => {
    if (formData.link.trim() === '') return; // Não adiciona se o campo estiver vazio

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, formData.link], // Adiciona o link no array images
      link: '', // Limpa o campo de link após adicionar
    }));
  };

  // Função para remover a imagem
  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Filtra a imagem pelo índice
    }));
  };
  const removeSize = (str) => (str.length > 6 ? str.slice(0, 6) + '...' : str);

  const DeleteCard = (openClosePopup) => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (id) {
      if (openClosePopup) {
        storedProducts.splice(id, 1);
        localStorage.setItem('products', JSON.stringify(storedProducts));
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
              <option value="Office">Office</option>
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
            <label htmlFor="processador">CPU:</label>
            <input
              type="text"
              required
              id="cpu"
              value={formData.cpu}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard">Placa Mãe:</label>
            <input
              type="text"
              required
              id="motherBoard"
              value={formData.motherBoard}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="processador">Memória:</label>
            <input
              type="text"
              required
              id="memory"
              value={formData.memory}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard">Refrigeração:</label>
            <input
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
            <label htmlFor="graphicsCard">Placa de Video:</label>
            <input
              type="text"
              id="graphicsCard"
              value={formData.graphicsCard}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="font">Fonte:</label>
            <input
              type="text"
              id="font"
              value={formData.font}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="quantidadeDeCabos"> Cabos:</label>
            <input
              type="text"
              id="amoutCables"
              value={formData.amoutCables}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="font">Gabinete:</label>
            <input
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
            <label htmlFor="images">Imagens:</label>
            <input type="file" onChange={handleFileChange} />
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

        <div className={style.linkAddImgContainer}>
          <div className={style.linkField}>
            <label htmlFor="idade">Link da imagem:</label>
            <input
              type="text"
              id="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className={style.btn}>
            <button type="button" onClick={addImage}>
              Adicione imagem
            </button>
          </div>
        </div>
        <div className={style.containerImages}>
          {formData &&
            formData.images &&
            formData.images.length > 0 &&
            formData.images.map((item, index) => (
              <div key={index}>
                <div className={style.imageItem}>
                  <p>{removeSize(item)}</p>
                  <button type="button" onClick={() => removeImage(index)}>
                    X
                  </button>
                </div>
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
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={style.textareaColumn}>
            <label htmlFor="cpuText">ESPECIFICAÇÕES CPU:</label>
            <ReactQuill
              id="cpuText"
              className={style.textField}
              value={formData.cpuText}
              onChange={(value) => handleQuillChange(value, 'cpuText')}
              onKeyDown={handleKeyDown} // Impede digitação acima do limite
            />
          </div>
        </div>

        <div className={style.btnContainer}>
          <button type="button" onClick={saveForm}>
            Salvar
          </button>
          <button
            type="button"
            onClick={() => DeleteCard(false)}
            disabled={id === undefined}
          >
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

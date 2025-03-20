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

const InputProducts = () => {
  const [openCloseConfirmMessage, setOpenCloseConfirmMessage] = useState(false);
  const [briefMessage, setBriefMessage] = React.useState(false);
  const { cpf, login } = useContext(GlobalContext);
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
    imagens: [],
  });

  useEffect(() => {
    console.log(' Formulario de dados   ', formData);
    console.log(' ID  ', id);
    if (id) {
      const storedProduct = localStorage.getItem('products');

      if (storedProduct && storedProduct.length > 0) {
        const products = JSON.parse(storedProduct); // Converta a string em um array
        console.log('Produto Selecionado   ', products[id]);
        setFormData({
          title: products[id].title,
          price: products[id].price,
          cpu: products[id].cpu,
          motherBoard: products[id].motherBoard,
          adApproved: products[id].adApproved,
          cpuText: products[id].cpuText,
          storage: products[id].storage,
          tower: products[id].tower,
          font: products[id].font,
          memory: products[id].memory,
          graphicsCard: products[id].graphicsCard,
          cooling: products[id].cooling,
          amoutCables: products[id].amoutCables,
          ages: products[id].ages,
          link: products[id].link,
          customerCpf: cpf,
          motherBoardText: products[id].motherBoardText,
          imagens: products[id].imagens,
        });
      }
    }
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

  const handleQuillChange = (value, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      imagens: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.price = formData.price.replace('R$ ', '').replace(',00', '');
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (id) {
      formData.customerCpf = formatCpf(cpf);
      storedProducts[id] = formData;
      localStorage.setItem('products', JSON.stringify(storedProducts));
      navigate('/');
      return;
    }
    formData.customerCpf = formatCpf(cpf);
    storedProducts.push(formData);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    setFormData({
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
      imagens: [],
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
      imagens: [...prevData.imagens, formData.link], // Adiciona o link no array imagens
      link: '', // Limpa o campo de link após adicionar
    }));
  };

  // Função para remover a imagem
  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imagens: prevData.imagens.filter((_, i) => i !== index), // Filtra a imagem pelo índice
    }));
  };
  const removeSize = (str) => (str.length > 6 ? str.slice(0, 6) + '...' : str);

  const DeleteCard = (openClosePopup) => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (id) {
      if (openClosePopup) {
        storedProducts.splice(id, 1);
        localStorage.setItem('products', JSON.stringify(storedProducts));
        setOpenCloseConfirmMessage(false);
        navigate('/');
        return;
      }
      setOpenCloseConfirmMessage(true);
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
      {openCloseConfirmMessage && (
        <ConfirmMessage
          defaultMessage="Você está prestes a excluir esse card. Tem certeza que quer continuar"
          setCloseMessage={setOpenCloseConfirmMessage}
          goOn={() => DeleteCard(true)}
        />
      )}
      <h2>Formulário para máquinas Dragon</h2>
      <form className={style.formContainer} onSubmit={handleSubmit}>
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
            <label htmlFor="quantidadeDeCabos">Quantidade de Cabos:</label>
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
            <label htmlFor="imagens">Imagens:</label>
            <input
              type="file"
              id="imagens"
              multiple
              onChange={handleImageUpload}
            />
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
            formData.imagens &&
            formData.imagens.length > 0 &&
            formData.imagens.map((item, index) => (
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
              value={formData.motherBoardText}
              onChange={(value) => handleQuillChange(value, 'motherBoardText')}
            />
          </div>
          <div className={style.textareaColumn}>
            <label htmlFor="cpuText">Texto do CPU:</label>
            <ReactQuill
              id="cpuText"
              value={formData.cpuText}
              onChange={(value) => handleQuillChange(value, 'cpuText')}
            />
          </div>
        </div>

        <div className={style.btnContainer}>
          <button type="submit">Salvar</button>
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

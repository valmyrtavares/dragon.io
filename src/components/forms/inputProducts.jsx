import { useState, useEffect } from 'react';
import style from './InputProducts.module.scss';

const InputProducts = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    cpu: '',
    motherBoard: '',
    storage: '',
    tower: '',
    font: '',
    graphicsCard: '',
    amoutCables: '',
    ages: '',
    link: '',
    imagens: [],
  });

  useEffect(() => {
    console.log(' Formulario de dados   ', formData);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
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
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(formData);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    alert('Produto adicionado com sucesso!');
    setFormData({
      processador: '',
      placaMae: '',
      armazenamento: '',
      gabinete: '',
      fonte: '',
      placaDeVideo: '',
      quantidadeDeCabos: '',
      idade: '',
      link: '',
      imagens: [],
    });
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

  return (
    <>
      <h1>Formulário para máquinas Dragon</h1>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="title">Título/Aplicação:</label>
            <select id="title" value={formData.title} onChange={handleChange}>
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
              id="price"
              value={formData.placaMae}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="processador">CPU:</label>
            <input
              type="text"
              id="cpu"
              value={formData.cpu}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard">Placa Mãe:</label>
            <input
              type="text"
              id="motherBoard"
              value={formData.motherBoard}
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
              type="text"
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

        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default InputProducts;

import { useState, useEffect } from 'react';
import style from './InputProducts.module.scss';

const InputProducts = () => {
  const [formData, setFormData] = useState({
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
            <label htmlFor="title">Título/Apliceação:</label>
            <input
              type="text"
              id="title"
              value={formData.processador}
              onChange={handleChange}
            />
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
            <label htmlFor="processador">Processador:</label>
            <input
              type="text"
              id="processador"
              value={formData.processador}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="motherBoard">Placa Mãe:</label>
            <input
              type="text"
              id="motherBoard"
              value={formData.placaMae}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="computerMemory">Armazenamento:</label>
            <input
              type="text"
              id="armazenamento"
              value={formData.armazenamento}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="graphicsCard">Placa de Video:</label>
            <input
              type="text"
              id="graphicsCard"
              value={formData.gabinete}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="font">Fonte:</label>
            <input
              type="text"
              id="font"
              value={formData.fonte}
              onChange={handleChange}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="placaDeVideo">Placa de Vídeo:</label>
            <input
              type="text"
              id="placaDeVideo"
              value={formData.placaDeVideo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="quantidadeDeCabos">Quantidade de Cabos:</label>
            <input
              type="text"
              id="quantidadeDeCabos"
              value={formData.quantidadeDeCabos}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label htmlFor="imagens">Imagens:</label>
            <input
              type="file"
              id="imagens"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="idade">Link da imagem:</label>
            <input
              type="text"
              id="link"
              value={formData.link}
              onChange={handleChange}
            />
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
        <button type="button" onClick={addImage}>
          Adicione imagem
        </button>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default InputProducts;

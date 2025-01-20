import { useState } from 'react';
import './InputProducts.css';

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

  return (
    <>
      <h1>Formulário para máquinas Dragon</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="processador">Processador:</label>
            <input
              type="text"
              id="processador"
              value={formData.processador}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placaMae">Placa Mãe:</label>
            <input
              type="text"
              id="placaMae"
              value={formData.placaMae}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="armazenamento">Armazenamento:</label>
            <input
              type="text"
              id="armazenamento"
              value={formData.armazenamento}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gabinete">Gabinete:</label>
            <input
              type="text"
              id="gabinete"
              value={formData.gabinete}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fonte">Fonte:</label>
            <input
              type="text"
              id="fonte"
              value={formData.fonte}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="placaDeVideo">Placa de Vídeo:</label>
            <input
              type="text"
              id="placaDeVideo"
              value={formData.placaDeVideo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantidadeDeCabos">Quantidade de Cabos:</label>
            <input
              type="text"
              id="quantidadeDeCabos"
              value={formData.quantidadeDeCabos}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="imagens">Imagens:</label>
            <input
              type="file"
              id="imagens"
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idade">Link da imagem:</label>
            <input
              type="text"
              id="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default InputProducts;

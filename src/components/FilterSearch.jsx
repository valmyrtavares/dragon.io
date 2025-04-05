import React from 'react';
import PropTypes from 'prop-types';
import style from '../assets/style/FilterSearch.module.scss';

const FilterSearch = ({ filteredProducts, sortByPrice, filterByIdProduct }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    price: '',
    processorBrand: '',
    graphicsCardBrand: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      title: '',
      price: '',
      processorBrand: '',
      graphicsCardBrand: '',
      [id]: value,
    });
    filteredProducts(id, value);
  };
  return (
    <div className={style.containerGlobal}>
      <div className={style.searchField}>
        <input
          type="text"
          placeholder="Busque o produto pelo id"
          onChange={(e) => filterByIdProduct(e.target.value)}
        />
      </div>

      <div className={style.containerFilteredProducts}>
        <div className={style.formGroup}>
          <label htmlFor="graphicsCardBrand">Marca da Placa de vídeo:</label>
          <select
            id="graphicsCardBrand"
            value={formData.graphicsCardBrand}
            onChange={handleChange}
          >
            <option value="">Selecione sua opção</option>
            <option value="AMD">AMD</option>
            <option value="Arc">Arc</option>
            <option value="NVIDEA">Nvidea</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="title">Título/Aplicação:</label>
          <select id="title" value={formData.title} onChange={handleChange}>
            <option value="">Selecione sua opção</option>
            <option value="Gamer">Gamer</option>
            <option value="Escritório">Escritório</option>
            <option value="Render">Render</option>
            <option value="Doméstico">Doméstico</option>
            <option value="Edição de Video">Edição de Video</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="processorBrand">Marca do Processador:</label>
          <select
            id="processorBrand"
            value={formData.processorBrand}
            onChange={handleChange}
          >
            <option value="">Selecione sua opção</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <button onClick={sortByPrice}>
            Selecione do menor para o maior preço
          </button>
        </div>
      </div>
    </div>
  );
};
FilterSearch.propTypes = {
  filteredProducts: PropTypes.func.isRequired,
  sortByPrice: PropTypes.func.isRequired,
  filterByIdProduct: PropTypes.func.isRequired,
};

export default FilterSearch;

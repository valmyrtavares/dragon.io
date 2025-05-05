import { useEffect, useState } from 'react';
import style from '../assets/style/ShowCase.module.scss';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext'; //
import { useContext } from 'react';
import { getListData } from '../api/Api';
import FilterSearch from './filterSearch';

const ShowCase = () => {
  const [products, setProducts] = useState([]);
  const [Filteredproducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);
  const [showFIlterSearch, setShowFilterSearch] = useState(false);

  useEffect(() => {
    bringProducts();
  }, []);
  useEffect(() => {
    bringProducts();
  }, [login]);

  const bringProducts = async () => {
    const productList = await getListData('products');
    // let storedProducts = localStorage.getItem('products');
    // let products = JSON.parse(storedProducts);
    if (productList && productList.length > 0) {
      if (!login) {
        const productFiltered = productList.filter(
          (product) => product.adApproved === true
        );
        setProducts(productFiltered);
        setFilteredProducts(productFiltered);
        return;
      } else {
        setFilteredProducts(productList);
        setProducts(productList);
      }
    }
  };

  const filteredProducts = async (category, value) => {
    if (value === '') {
      setFilteredProducts(products);
      return;
    }
    const filteredList = products.filter(
      (product) => product[category] === value
    );

    setFilteredProducts(filteredList);
  };

  const displaySingleProduct = (index) => {
    console.log('Qual é oproduto   ', index);
    navigate(`/singleProduct/${index}`);
  };

  const sortByPrice = (order) => {
    const sortedProducts = [...Filteredproducts].sort((a, b) => {
      if (order === 'asc') {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    console.log('Produtos ordenados', sortedProducts);
    setFilteredProducts(sortedProducts);
  };

  const filterByIdProduct = (value) => {
    if (value !== '') {
      products.filter((product) => {
        if (product.id === value) {
          setFilteredProducts([product]);
        }
      });
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className={style.showcaseContainer}>
      <h1>Vitrine </h1>
      <div>
        <p onClick={() => setShowFilterSearch((prev) => !prev)}>Busca</p>
      </div>
      {showFIlterSearch && (
        <FilterSearch
          filteredProducts={filteredProducts}
          sortByPrice={sortByPrice}
          filterByIdProduct={filterByIdProduct}
        />
      )}
      <div className={style.scrollContainer}>
        {Filteredproducts.length > 0 ? (
          <div className={style.productsGrid}>
            {Filteredproducts.map((product, index) => (
              <div
                className={`${style.productCard} ${
                  product.adApproved === false ? style.cardNotAvaiable : ''
                } ${style.hoverEffect}`}
                key={index}
                onClick={() => displaySingleProduct(product.id)}
              >
                <div className={style.imageContainer}>
                  <img
                    src={product.images[0]}
                    alt={`Produto ${index + 1}`}
                    className={style.productImage}
                  />
                </div>
                <h3 className={style.title}>{product.title}</h3>
                <h3 className={style.price}>R$ {product.price},00</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum produto encontrado no localStorage.</p>
        )}
      </div>
    </div>
  );
};

export default ShowCase;

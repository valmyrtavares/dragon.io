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

  useEffect(() => {
    bringProducts();
  }, []);
  useEffect(() => {
    bringProducts();
  }, [login]);

  const bringProducts = async () => {
    const productList = await getListData('products');
    console.log('produtos com id  ', productList);
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
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className={style.showcaseContainer}>
      <h1>Vitrine de Produtos</h1>
      <FilterSearch
        filteredProducts={filteredProducts}
        sortByPrice={sortByPrice}
      />
      <div className={style.scrollContainer}>
        {Filteredproducts.length > 0 ? (
          <div className={style.productsGrid}>
            {Filteredproducts.map((product, index) => (
              <div
                className={style.productCard}
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

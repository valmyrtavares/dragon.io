import { useEffect, useState } from 'react';
import style from '../assets/style/ShowCase.module.scss';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext'; //
import { useContext } from 'react';

const ShowCase = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);

  useEffect(() => {
    bringProducts();
  }, []);
  useEffect(() => {
    bringProducts();
  }, [login]);

  const bringProducts = () => {
    let storedProducts = localStorage.getItem('products');
    let products = JSON.parse(storedProducts);
    if (products && products.length > 0) {
      if (!login) {
        products = products.filter((product) => product.adApproved === true);
        setProducts(products);
        return;
      } else {
        setProducts(products);
      }
    }
  };

  const displaySingleProduct = (index) => {
    console.log('Qual é oproduto   ', index);
    navigate(`/singleProduct/${index}`);
  };

  return (
    <div className={style.showcaseContainer}>
      <h1>Vitrine de Produtos</h1>
      <div className={style.scrollContainer}>
        {products.length > 0 ? (
          <div className={style.productsGrid}>
            {products.map((product, index) => (
              <div
                className={style.productCard}
                key={index}
                onClick={() => displaySingleProduct(index)}
              >
                <div className={style.imageContainer}>
                  <img
                    src={product.imagens[0]}
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

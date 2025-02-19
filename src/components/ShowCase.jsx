import { useEffect, useState } from 'react';
import style from './Showcase.module.scss';
import { useNavigate } from 'react-router-dom';

const ShowCase = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    console.log('DADOS   ', storedProducts);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const displaySingleProduct = (index) => {
    console.log('Qual é oproduto   ', index);
    navigate(`/singleProduct/${index}`);
  };

  return (
    <div className={style.showcaseContainer}>
      <h1>Vitrine de Produtos</h1>
      <div>
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
                <h3>{product.title}</h3>
                <h3>R$ {product.price},00</h3>
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

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
                <h2>Configuração</h2>
                <p>
                  <strong>Processador:</strong> {product.processador}
                </p>
                <p>
                  <strong>Placa Mãe:</strong> {product.placaMae}
                </p>
                <p>
                  <strong>Armazenamento:</strong> {product.armazenamento}
                </p>
                <p>
                  <strong>Gabinete:</strong> {product.gabinete}
                </p>
                <p>
                  <strong>Fonte:</strong> {product.fonte}
                </p>
                <p>
                  <strong>Placa de Vídeo:</strong> {product.placaDeVideo}
                </p>
                <p>
                  <strong>Quantidade de Cabos:</strong>{' '}
                  {product.quantidadeDeCabos}
                </p>
                <p>
                  <strong>Idade:</strong> {product.idade}
                </p>
                <p>
                  <strong>Link:</strong>{' '}
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.link}
                  </a>
                </p>
                <div className={style.containerImages}>
                  {product.imagens.length > 0 ? (
                    product.imagens.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Produto ${index + 1} - Imagem ${imgIndex + 1}`}
                        className="product-image"
                      />
                    ))
                  ) : (
                    <p>Sem imagens disponíveis.</p>
                  )}
                </div>
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

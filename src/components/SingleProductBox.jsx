import style from './SingleProductBox.module.scss';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleProductBox = () => {
  const [selectedImage, setSelectedImage] = React.useState(
    'https://via.placeholder.com/300'
  );
  const [productSelected, setProductSelected] = React.useState({});
  const [images, setImages] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const storedProduct = localStorage.getItem('products');

    // Verifique se há dados armazenados e se a string não está vazia
    if (storedProduct && storedProduct.length > 0) {
      const products = JSON.parse(storedProduct); // Converta a string em um array

      const { imagens } = products[id];
      setImages(imagens);
      console.log('Products ', products[id]);

      setProductSelected(products[id]); // Atualize o estado com o produto selecionado
    }
  }, [id]); // Certifique-se de adicionar o id como dependência, se ele mudar

  React.useEffect(() => {
    if (productSelected) {
      console.log('Objeto   null', productSelected);
    }
  }, [productSelected]);

  return (
    <div className={style.SingleProductBox}>
      <div className={style.containerSideMenu}>
        <div className={style.imageThumbnails}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className={style.thumbnail}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
        </div>
        <Link to={`/form/${id}`}>Edição administrador</Link>
      </div>
      <div className={style.mainImage}>
        <img src={selectedImage} alt="Selected" />
      </div>
      {productSelected && (
        <div className={style.productDetails}>
          <h2>
            Titulo:<span> {productSelected.title}</span>
          </h2>
          <h2>
            Processador: <span>{productSelected.cpu}</span>
          </h2>
          <h2>
            Placa Mãe:<span>{productSelected.cpu}</span>
          </h2>
          <h2>
            Memória:
            <span>{productSelected.graphicsCard}</span>
          </h2>
          <h2>
            Placa de Video:
            <span>{productSelected.graphicsCard}</span>
          </h2>
          <h2>
            fonte: <span>{productSelected.font}</span>
          </h2>
          <h2>
            armazenamento:<span>{productSelected.storage}</span>
          </h2>
          <h2>
            Preço:<span>{productSelected.price}</span>
          </h2>
          <h2>
            gabinete:<span>{productSelected.tower}</span>
          </h2>

          <h2>
            Refrigeração:<span>{productSelected.graphicsCard}</span>
          </h2>

          <h2>
            Cabos :<span>{productSelected.quantidadeDeCabos}</span>
          </h2>
          <h2>
            Ano :<span>{productSelected.ages}</span>
          </h2>
          <h3>
            Descrição da Placa mãe :
            <span>{productSelected.motherBoardText}</span>
          </h3>
          <h3>
            Descrição do processador :<span>{productSelected.cpuText}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default SingleProductBox;

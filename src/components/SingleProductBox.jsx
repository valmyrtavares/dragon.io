import './SingleProductBox.scss';
import React from 'react';
import { useParams } from 'react-router-dom';

const SingleProductBox = () => {
  const [selectedImage, setSelectedImage] = React.useState(
    'https://via.placeholder.com/300'
  );
  const [productSelected, setProductSelected] = React.useState(null);
  const [images, setImages] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const storedProduct = localStorage.getItem('products');

    // Verifique se há dados armazenados e se a string não está vazia
    if (storedProduct && storedProduct.length > 0) {
      const products = JSON.parse(storedProduct); // Converta a string em um array
      const index = Number(id);

      const { imagens } = products[id];
      setImages(imagens);

      setProductSelected(products[index]); // Atualize o estado com o produto selecionado
    }
  }, [id]); // Certifique-se de adicionar o id como dependência, se ele mudar

  React.useState(() => {
    console.log('Imagens   ', images);
  }, [images]);

  // const images = [
  //   'https://i.pinimg.com/236x/e7/bc/82/e7bc821709e687ad14d35f1bfd820e23.jpg',
  //   'https://i.pinimg.com/736x/f4/4f/1c/f44f1c97ba2ff8b9511e10ac51d19f41.jpg',
  //   'https://i.pinimg.com/736x/b8/28/88/b828881a1417b6a3a259fe221f086ab7.jpg',
  //   'https://i.pinimg.com/736x/a3/f3/63/a3f36303d43684e380b4f213bf380c9f.jpg',
  //   'https://i.pinimg.com/736x/7c/d7/f8/7cd7f85d4ddbbfa6fedba9c2f4007e9a.jpg',
  //   'https://i.pinimg.com/736x/a3/03/23/a30323a2f0e97ae9d61584a1f01d1d90.jpg',
  //   'https://i.pinimg.com/736x/99/f5/41/99f541f703ab95ece2f38da798b9c83b.jpg',
  // ];

  return (
    <div className="single-product-box">
      <div className="image-thumbnails">
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className="thumbnail"
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
      </div>
      <div className="main-image">
        <img src={selectedImage} alt="Selected" />
      </div>
      {productSelected && (
        <div className="product-details">
          <h2>armazenamento: {productSelected.armazenamento}</h2>
          <h2>
            fonte:
            {productSelected.fonte}
          </h2>
          <h2>
            gabinete:
            {productSelected.gabinete}
          </h2>
          <h2>idade :{productSelected.idade}</h2>
          <h2>
            Placa de Video:
            {productSelected.placaDeVideo}
          </h2>
          <h2>
            Placa Mãe:
            {productSelected.placaMae}
          </h2>
          <h2>
            Processador:
            {productSelected.processador}
          </h2>
          <h2>Quantidade de Cabos :{productSelected.quantidadeDeCabos}</h2>
        </div>
      )}
    </div>
  );
};

export default SingleProductBox;

import style from '../assets/style/SingleProductBox.module.scss';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PopupCustomerDetails from './customer/popupCustomerDetails';
import { GlobalContext } from '../GlobalContext'; //
import { useContext } from 'react';

const SingleProductBox = () => {
  const [selectedImage, setSelectedImage] = React.useState(
    'https://via.placeholder.com/300'
  );
  const { login } = useContext(GlobalContext);
  const [productSelected, setProductSelected] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState({});
  const [showclient, setShowClient] = React.useState(false);

  const { id } = useParams();

  React.useEffect(() => {
    const storedProduct = localStorage.getItem('products');
    const customerList = localStorage.getItem('customer');
    const fetcherCustomerList = JSON.parse(customerList);
    setCustomerList(fetcherCustomerList);

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

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const bringCustomer = () => {
    debugger;
    const oneCustomer = customerList.filter(
      (customer) => customer.cpf === productSelected.customerCpf
    );

    setSelectedCustomer(oneCustomer[0]);
    setShowClient(true);
  };

  return (
    <div className={style.SingleProductBox}>
      {showclient && (
        <PopupCustomerDetails
          customer={selectedCustomer}
          setClose={setShowClient}
        />
      )}
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
        {!isMobile && login && (
          <div className={style.adminContainer}>
            {' '}
            <Link to={`/form/${id}`}>Edição administrador</Link>{' '}
            <button onClick={bringCustomer}>Detalhes do Cliente</button>{' '}
          </div>
        )}
      </div>
      <div className={style.mainImage}>
        <img src={selectedImage} alt="Selected" />
        {isMobile && login && (
          <div className={style.adminContainer}>
            {' '}
            <Link to={`/form/${id}`}>Edição administrador</Link>{' '}
            <button onClick={bringCustomer}>Detalhes do Cliente</button>{' '}
          </div>
        )}
      </div>
      {productSelected && (
        <div className={style.productDetails}>
          <h2>
            Processador: <span>{productSelected.cpu}</span>
          </h2>
          <h2>
            Placa Mãe:<span>{productSelected.motherBoard}</span>
          </h2>
          <h2>
            Memória:
            <span>{productSelected.memory}</span>
          </h2>
          <h2>
            Placa de Video:
            <span>{productSelected.graphicsCard}</span>
          </h2>
          <h2>
            fonte: <span>{productSelected.font}</span>
          </h2>

          <h2>
            gabinete:<span>{productSelected.tower}</span>
          </h2>

          <h2>
            Refrigeração:<span>{productSelected.cooling}</span>
          </h2>

          <h2>
            Cabos :<span>{productSelected.amoutCables}</span>
          </h2>
          <h2>
            Ano :<span>{productSelected.ages}</span>
          </h2>
          <h3 className={style.title}>{productSelected.title}</h3>
          <h3 className={style.price}>R$ {productSelected.price},00</h3>
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

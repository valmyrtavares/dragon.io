import style from '../assets/style/SingleProductBox.module.scss';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PopupCustomerDetails from './customer/popupCustomerDetails';
import { GlobalContext } from '../GlobalContext'; //
import { useContext } from 'react';
import { getDataById, getDataByField } from '../api/Api';
import { formatCpf } from '../helper/Helper'; // Importa a função formatDate
import SingleDetailsProduct from './SingleDetailsProduct';

const SingleProductBox = () => {
  const [selectedImage, setSelectedImage] = React.useState('');
  const { login } = useContext(GlobalContext);
  const [productSelected, setProductSelected] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState({});
  const [showclient, setShowClient] = React.useState(false);
  const [zoom, setZoom] = React.useState({ backgroundPosition: '0% 0%' });
  const [singleDetailsProduct, setSingleDetailsProduct] = React.useState(false);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchProducts = async () => {
      const selectedProduct = await getDataById('products', id);
      if (
        selectedProduct &&
        typeof selectedProduct === 'object' &&
        Object.keys(selectedProduct).length > 0
      ) {
        const { images } = selectedProduct;
        setSelectedImage(images[0]);
        setImages(images);

        setProductSelected(selectedProduct); // Atualize o estado com o produto selecionado
      }
    };

    // Verifique se há dados armazenados e se a string não está vazia
    fetchProducts();
  }, [id]); // Certifique-se de adicionar o id como dependência, se ele mudar

  React.useEffect(() => {
    if (productSelected) {
      if (
        productSelected.customerCpf &&
        /^[0-9]{11}$/.test(productSelected.customerCpf)
      ) {
        productSelected.customerCpf = formatCpf(productSelected.customerCpf);
      }
      getDataByField('customer', 'cpf', productSelected.customerCpf)
        .then((customer) => {
          setSelectedCustomer(customer);
        })
        .catch((error) => {
          console.error('Erro ao buscar cliente:', error);
        });
    }
  }, [productSelected]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Functions javascript

  const callSeller = () => {
    const phoneNumber = '551132229446'; // Coloque aqui o número com DDI (55), DDD (11), e o número (999999999)
    const message = `Olá, gostaria de saber mais sobre o produto ${productSelected.title}, com id: ${productSelected.id}.`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank'); // Abre em nova aba
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom({ backgroundPosition: `${x}% ${y}%` });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 650);
  };

  const bringCustomer = () => {
    debugger;
    console.log('cliente selecionado:', selectedCustomer);
    console.log('produto selecionado:', productSelected);
    setShowClient(true);
  };

  if (!isMobile) {
    return (
      <div className={style.container}>
        {showclient && (
          <PopupCustomerDetails
            customer={selectedCustomer}
            setClose={setShowClient}
          />
        )}
        {singleDetailsProduct && (
          <SingleDetailsProduct
            productSelected={productSelected}
            setSingleDetailsProduct={setSingleDetailsProduct}
          />
        )}
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
          </div>
          <div className={style.mainImage}>
            <div
              className={style.zoomContainer}
              onMouseMove={handleMouseMove}
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: zoom.backgroundPosition,
              }}
            >
              <img src={selectedImage} alt="Selected" />
            </div>
          </div>
          {productSelected && (
            <div className={style.productDetails}>
              <div className={style.mainItems}>
                <div className={style.titleContainer}>
                  <h3 className={style.title}>
                    PC{' '}
                    {productSelected.title === 'Edição de Video'
                      ? 'Video'
                      : productSelected.title}
                  </h3>
                </div>
                <div className={style.specialSpecifications}>
                  <h2>
                    <span>{productSelected.cpu}, </span>
                    <span>{productSelected.motherBoard}, </span>
                    <span>{productSelected.memory}, </span>
                    <span>{productSelected.motherBoard}, </span>
                    <span>{productSelected.memory} </span>
                  </h2>
                </div>
                <div className={style.highlightPrice}>
                  <h3 className={style.price}>R$ {productSelected.price},00</h3>
                </div>
                <button
                  className={style.btnMoreDetailsPopup}
                  onClick={() => setSingleDetailsProduct(true)}
                >
                  MAIS DETALHES
                </button>
                <button className={style.btnContact} onClick={callSeller}>
                  FALE CONOSCO
                </button>
                <h2 className={style.productCode} title="Clique para copiar">
                  Código do produto:{' '}
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(productSelected.id);
                      alert('Código copiado para a área de transferência!');
                    }}
                  >
                    {productSelected.id}
                  </span>
                </h2>
              </div>
            </div>
          )}
        </div>
        {!isMobile && login && (
          <div className={style.adminContainer}>
            {' '}
            <button>
              <Link to={`/form/${productSelected.id}`}>
                Edição administrador
              </Link>
            </button>{' '}
            <button onClick={bringCustomer}>Detalhes do Cliente</button>{' '}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={style.container}>
        {showclient && (
          <PopupCustomerDetails
            customer={selectedCustomer}
            setClose={setShowClient}
          />
        )}
        {singleDetailsProduct && (
          <SingleDetailsProduct
            productSelected={productSelected}
            setSingleDetailsProduct={setSingleDetailsProduct}
          />
        )}
        <div className={style.SingleProductBox}>
          <div className={style.productDetails}>
            <div className={style.mainItems}>
              <div className={style.titleContainer}>
                <h3 className={style.title}>PC {productSelected.title}</h3>
              </div>
              <div className={style.specialSpecifications}>
                <h2>
                  <span>{productSelected.cpu}, </span>
                  <span>{productSelected.motherBoard}, </span>
                  <span>{productSelected.memory}, </span>
                  <span>{productSelected.motherBoard}, </span>
                  <span>{productSelected.memory} </span>
                </h2>
              </div>
              <div className={style.highlightPrice}>
                <h3 className={style.price}>R$ {productSelected.price},00</h3>
              </div>
              <button
                className={style.btnMoreDetailsPopup}
                onClick={() => setSingleDetailsProduct(true)}
              >
                MAIS DETALHES
              </button>
              <button className={style.btnContact} onClick={callSeller}>
                FALE CONOSCO
              </button>
              <h2 className={style.productCode} title="Clique para copiar">
                Código do produto:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(productSelected.id);
                    alert('Código copiado para a área de transferência!');
                  }}
                >
                  {productSelected.id}
                </span>
              </h2>
            </div>
          </div>
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
          </div>
        </div>
        {isMobile && login && (
          <div className={style.adminContainer}>
            {' '}
            <button>
              <Link to={`/form/${productSelected.id}`}>
                Edição administrador
              </Link>
            </button>{' '}
            <button onClick={bringCustomer}>Detalhes do Cliente</button>{' '}
          </div>
        )}
      </div>
    );
  }
};

export default SingleProductBox;

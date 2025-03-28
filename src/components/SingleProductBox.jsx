import style from '../assets/style/SingleProductBox.module.scss';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PopupCustomerDetails from './customer/popupCustomerDetails';
import { GlobalContext } from '../GlobalContext'; //
import { useContext } from 'react';
import { getDataById } from '../api/Api';
import { formatDate } from '../helper/Helper'; // Importa a função formatDate

const SingleProductBox = () => {
  const [selectedImage, setSelectedImage] = React.useState('');
  const { login } = useContext(GlobalContext);
  const [productSelected, setProductSelected] = React.useState({});
  const [images, setImages] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState({});
  const [showclient, setShowClient] = React.useState(false);
  const [zoom, setZoom] = React.useState({ backgroundPosition: '0% 0%' });

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

    const customerList = localStorage.getItem('customer');
    const fetcherCustomerList = JSON.parse(customerList);
    setCustomerList(fetcherCustomerList);

    // Verifique se há dados armazenados e se a string não está vazia
    fetchProducts();
  }, [id]); // Certifique-se de adicionar o id como dependência, se ele mudar

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom({ backgroundPosition: `${x}% ${y}%` });
  };

  React.useEffect(() => {
    if (productSelected) {
      console.log('Objeto   null', productSelected);
    }
  }, [productSelected]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 650);
  };

  const bringCustomer = () => {
    const oneCustomer = customerList.filter(
      (customer) => customer.cpf === productSelected.customerCpf
    );

    setSelectedCustomer(oneCustomer[0]);
    setShowClient(true);
  };

  return (
    <div className={style.container}>
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
            <div className={style.priceContainer}>
              <div className={style.mainItems}>
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
              </div>
              <div className={style.highlightPrice}>
                <h3 className={style.title}>{productSelected.title}</h3>
                <h3 className={style.price}>R$ {productSelected.price},00</h3>
              </div>
            </div>
            <h2>
              Código do produto:
              <span>{productSelected.id}</span>
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
              Data de compra :<span>{formatDate(productSelected.ages)}</span>
            </h2>

            <h3>
              Descrição da Placa mãe :
              <div className={style.hugeText}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: productSelected.motherBoardText,
                  }}
                />
              </div>
            </h3>
            <h3>
              Descrição do processador :
              <div className={style.hugeText}>
                <span
                  className={style.hugeText}
                  dangerouslySetInnerHTML={{ __html: productSelected.cpuText }}
                />
              </div>
            </h3>
          </div>
        )}
      </div>
      {!isMobile && login && (
        <div className={style.adminContainer}>
          {' '}
          <button>
            <Link to={`/form/${productSelected.id}`}>Edição administrador</Link>
          </button>{' '}
          <button onClick={bringCustomer}>Detalhes do Cliente</button>{' '}
        </div>
      )}
    </div>
  );
};

export default SingleProductBox;

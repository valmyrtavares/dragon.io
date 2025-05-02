import React from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import style from '../../../assets/style/SingleProductBoxMobilePhone.module.scss';
import PopupCustomerDetails from '../../customer/popupCustomerDetails';
import SingleDetailsProduct from '../SingleDetailsProduct';
import { callSeller } from '../../../helper/Helper';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../GlobalContext';

const SingleProductBoxMobilePhone = ({
  selectedCustomer,
  productSelected,
  images,
  bringCustomer,
}) => {
  const [showclient, setShowClient] = React.useState(false);
  const [singleDetailsProduct, setSingleDetailsProduct] = React.useState(false);
  const { login } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 650);
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 650);
  };
  React.useEffect(() => {
    console.log('Produto selecionado:', images);
    setSelectedImage(images[0]);
  }, []); // Atualiza a imagem selecionada quando as imagens mudam

  return (
    <div className={style.containerMobile}>
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
        <div className={style.containerMobileImages}>
          <div className={style.mainImage}>
            {images && images.length > 0 && (
              <img
                src={selectedImage ? selectedImage : images[0]}
                alt="Selected"
              />
            )}
          </div>
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
        <div className={style.titleContainer}>
          <h3 className={style.title}>
            PC{' '}
            {productSelected.title === 'Edição de Video'
              ? 'Video'
              : productSelected.title}
          </h3>
        </div>
        <h2 className={style.productCode}>
          Cód:{' '}
          <span
            onClick={() => {
              navigator.clipboard.writeText(productSelected.id);
              alert('Código copiado para a área de transferência!');
            }}
          >
            {productSelected.id}
          </span>
        </h2>
        {productSelected && (
          <div className={style.productDetails}>
            <div className={style.mainItems}>
              <div className={style.specialSpecifications}>
                <h2>
                  <span>{productSelected.cpu}</span>/
                  <span>{productSelected.motherBoard}</span>/
                  <span>{productSelected.memory}</span>/
                  <span>{productSelected.motherBoard}</span>/
                  <span>{productSelected.memory}</span>/
                </h2>
              </div>
              <div className={style.highlightPrice}>
                <h3 className={style.price}>R$ {productSelected.price},00</h3>
              </div>
              <div className={style.btnContainer}>
                <button
                  className={style.btnMoreDetailsPopup}
                  onClick={() => setSingleDetailsProduct(true)}
                >
                  <div className={style.whatsappLogo}></div>
                  <span>Mais detalhes</span>
                </button>
                <button className={style.btnContact} onClick={callSeller}>
                  <div className={style.whatsappLogo}></div>
                  <span>Fale conosco</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isMobile && login && (
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

export default SingleProductBoxMobilePhone;

SingleProductBoxMobilePhone.propTypes = {
  selectedCustomer: PropTypes.object.isRequired,
  productSelected: PropTypes.shape({
    title: PropTypes.string,
    cpu: PropTypes.string,
    motherBoard: PropTypes.string,
    memory: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  bringCustomer: PropTypes.func.isRequired,
};

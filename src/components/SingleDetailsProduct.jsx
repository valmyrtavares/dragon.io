import style from '../assets/style/SingleDetailsProduct.module.scss';
import PropTypes from 'prop-types';
import { formatDate } from '../helper/Helper'; // Importa a função formatDate
import React from 'react';
import CloseButton from './CloseButton';

const SingleDetailsProduct = ({ productSelected, setSingleDetailsProduct }) => {
  React.useEffect(() => {
    console.log('Produto selecionado:', productSelected);
  }, []);

  return (
    <div className={style.singleDetailsProductContainer}>
      <CloseButton setOpenClose={setSingleDetailsProduct} />
      {productSelected && (
        <div className={style.productDetails}>
          <div className={style.titleContainer}>
            <h3>PC {productSelected.title}</h3>
          </div>
          <h2>
            Processador:{''} <span>{productSelected.cpu}</span>
          </h2>
          <h2>
            Placa Mãe: {''}
            <span>{productSelected.motherBoard}</span>
          </h2>
          <h2>
            Memória:
            <span> {productSelected.memory}</span>
          </h2>
          <h2>
            Código do produto:
            {''}
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

          <h3 className={style.specificationsTitle}>
            Descrição da Placa mãe :
            <div className={style.hugeText}>
              <span
                dangerouslySetInnerHTML={{
                  __html: productSelected.motherBoardText,
                }}
              />
            </div>
          </h3>
          <h3 className={style.specificationsTitle}>
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
  );
};

SingleDetailsProduct.propTypes = {
  productSelected: PropTypes.shape({
    title: PropTypes.string,
    cpu: PropTypes.string,
    motherBoard: PropTypes.string,
    memory: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    graphicsCard: PropTypes.string,
    font: PropTypes.string,
    tower: PropTypes.string,
    cooling: PropTypes.string,
    amoutCables: PropTypes.string,
    ages: PropTypes.string,
    motherBoardText: PropTypes.string,
    cpuText: PropTypes.string,
  }),
  setSingleDetailsProduct: PropTypes.func.isRequired,
};
export default SingleDetailsProduct;

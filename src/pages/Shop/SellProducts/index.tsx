import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {useToggle} from 'hooks';
import Button from 'components/Button';
import EmptyPage from 'components/EmptyPage';
import EmptyProduct from 'assets/empty_product.svg';
import SellProductModal from 'modals/SellProductModal';
import {getProducts as _getProducts} from 'dispatchers/products';
import {getProducts, getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import Product from './Product';

import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const [SellProductModalIsOpen, setSellProductModalIsOpen] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(getProducts);
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getProducts());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching products');
      }
    })();
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return Object.values(products).filter(({seller}) => seller.id === self.id);
  }, [products, self.id]);

  const handleButtonClick = () => {
    dispatch(updateManager({activeProduct: null}));
    setSellProductModalIsOpen();
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} text="Add Product" />;
  };

  const renderContent = () => {
    if (!!filteredProducts.length) return renderProducts();
    return (
      <S.Div>
        <EmptyPage
          actionText="Click here to add a new product"
          bottomText="Add products to sell."
          graphic={EmptyProduct}
          topText="Sorry! You haven’t add products yet."
          onActionTextClick={setSellProductModalIsOpen}
          size={340}
        />
      </S.Div>
    );
  };

  const renderProducts = () => {
    const orderedProducts = orderBy(filteredProducts, ['modified_date'], ['desc']);
    const _products = orderedProducts.map((product) => (
      <Product key={product.id} product={product} setSellProductModalIsOpen={setSellProductModalIsOpen} />
    ));
    return <S.Products>{_products}</S.Products>;
  };

  return (
    <S.Container className={className}>
      <S.Box>
        <S.Heading>
          Products — <span>{filteredProducts.length}</span>
        </S.Heading>
        {renderButton()}
      </S.Box>

      {renderContent()}
      {SellProductModalIsOpen ? <SellProductModal close={setSellProductModalIsOpen} /> : null}
    </S.Container>
  );
};

export default SellProducts;

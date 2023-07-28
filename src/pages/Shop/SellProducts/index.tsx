import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {getProducts as _getProducts} from 'dispatchers/products';
import {getProducts, getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import Product from './Product';
import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    navigate('/shop/sell/createEditProduct');
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} text="Add" />;
  };

  const renderContent = () => {
    if (!!filteredProducts.length) return renderProducts();
    return <EmptyText>No products to display.</EmptyText>;
  };

  const renderProducts = () => {
    const orderedProducts = orderBy(filteredProducts, ['modified_date'], ['desc']);
    const _products = orderedProducts.map((product) => <Product key={product.id} product={product} />);
    return <S.Products>{_products}</S.Products>;
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Products" rightContent={renderButton()} />
      {renderContent()}
    </S.Container>
  );
};

export default SellProducts;

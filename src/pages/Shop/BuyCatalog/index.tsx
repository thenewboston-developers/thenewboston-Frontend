import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EmptyPage from 'components/EmptyPage';
import ProductCard from 'components/ProductCard';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import ShopIcon from 'assets/shop-icon.svg';
import ProductCardsContainer from 'components/ProductCardsContainer';
import {getProducts as _getProducts} from 'dispatchers/products';
import {ActivationStatus} from 'enums';
import {getProducts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const BuyCatalog: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(getProducts);

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

  const activeProducts = useMemo(() => {
    return Object.values(products).filter(({activation_status}) => activation_status === ActivationStatus.ACTIVE);
  }, [products]);

  const renderPageContent = () => {
    if (!!activeProducts.length) {
      return (
        <>
          <S.Heading>Buy from our marketplace</S.Heading>
          {renderProductCards()}
        </>
      );
    }

    return <EmptyPage bottomText="No products to display" graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  const renderProductCards = () => {
    return (
      <ProductCardsContainer>
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductCardsContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Banner
        heading={'Shop'}
        icon={ShopIcon}
        subHeading={'Your one-stop destination for breathtaking images that inspire and captivate'}
      />
      {renderPageContent()}
    </S.Container>
  );
};

export default BuyCatalog;

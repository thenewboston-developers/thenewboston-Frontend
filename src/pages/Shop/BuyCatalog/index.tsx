import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import ProductCard from 'components/ProductCard';
import ProductCardsContainer from 'components/ProductCardsContainer';
import {ActivationStatus} from 'enums';
import {getProducts} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const BuyCatalog: SFC = ({className}) => {
  const products = useSelector(getProducts);

  const activeProducts = useMemo(() => {
    return Object.values(products).filter(({activation_status}) => activation_status === ActivationStatus.ACTIVE);
  }, [products]);

  const renderPageContent = () => {
    if (!!activeProducts.length) {
      return <ProductCardsContainer>{renderProductCards()}</ProductCardsContainer>;
    }

    return <EmptyPage bottomText="No products to display" graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  const renderProductCards = () => {
    return activeProducts.map((product) => <ProductCard key={product.id} product={product} />);
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default BuyCatalog;

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiCartOutline} from '@mdi/js';

import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {getCartProducts} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const BuyMenuItems: SFC = () => {
  const cartProducts = useSelector(getCartProducts);
  const navigate = useNavigate();

  const cartProductCount = useMemo(() => {
    return Object.values(cartProducts).length;
  }, [cartProducts]);

  const handleCartClick = () => {
    navigate('/shop/buy/checkout');
  };

  const renderCartProductCount = () => {
    if (!cartProductCount) return null;
    return <S.CartProductCount>{cartProductCount}</S.CartProductCount>;
  };

  return (
    <>
      <ToolbarMenuLink text="Home" to="/shop/buy/catalog" />
      <ToolbarMenuLink text="My Addresses" to="/shop/buy/addresses" />
      <ToolbarMenuLink text="Orders" to="/shop/buy/orders" />
      <S.IconContainer onClick={handleCartClick}>
        <S.Icon path={mdiCartOutline} size="32px" />
        {renderCartProductCount()}
      </S.IconContainer>
    </>
  );
};

export default BuyMenuItems;

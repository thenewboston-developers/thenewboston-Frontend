import {mdiCartOutline} from '@mdi/js';

import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const BuyMenuItems: SFC = () => {
  const handleCartClick = () => {
    console.log('cart');
  };

  return (
    <>
      <ToolbarMenuLink text="Home" to="/shop/buyer/catalog" />
      <ToolbarMenuLink text="My Addresses" to="/shop/buyer/addresses" />
      <ToolbarMenuLink text="Orders" to="/shop/buyer/orders" />
      <S.IconContainer onClick={handleCartClick}>
        <S.Icon path={mdiCartOutline} size="32px" />
        <S.ProductCount>12</S.ProductCount>
      </S.IconContainer>
    </>
  );
};

export default BuyMenuItems;

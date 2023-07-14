import {useNavigate} from 'react-router-dom';
import {mdiCartOutline} from '@mdi/js';

import ToolbarMenuLink from 'components/ToolbarMenuLink';
import {SFC} from 'types';
import * as S from './Styles';

const BuyMenuItems: SFC = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/shop/buy/checkout');
  };

  return (
    <>
      <ToolbarMenuLink text="Home" to="/shop/buy/catalog" />
      <ToolbarMenuLink text="My Addresses" to="/shop/buy/addresses" />
      <ToolbarMenuLink text="Orders" to="/shop/buy/orders" />
      <S.IconContainer onClick={handleCartClick}>
        <S.Icon path={mdiCartOutline} size="32px" />
        <S.ProductCount>12</S.ProductCount>
      </S.IconContainer>
    </>
  );
};

export default BuyMenuItems;

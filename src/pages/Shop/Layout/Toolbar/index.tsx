import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiCartOutline} from '@mdi/js';

import {ShopToolbarType} from 'enums';
import {getCartProducts} from 'selectors/state';
import {SFC} from 'types';
import BuyMenuItems from './BuyMenuItems';
import SellMenuItems from './SellMenuItems';
import Switcher from './Switcher';
import * as S from './Styles';

export interface ToolbarProps {
  toolbarType: ShopToolbarType;
}

const Toolbar: SFC<ToolbarProps> = ({className, toolbarType}) => {
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

  const renderIconContainer = () => {
    if (toolbarType === ShopToolbarType.SELL) return null;
    return (
      <S.IconContainer onClick={handleCartClick}>
        <S.Icon path={mdiCartOutline} size="20px" />
        {renderCartProductCount()}
      </S.IconContainer>
    );
  };

  const renderMenuItems = () => {
    return toolbarType === ShopToolbarType.BUY ? <BuyMenuItems /> : <SellMenuItems />;
  };

  return (
    <S.Container className={className}>
      <S.Left>
        <Switcher />
      </S.Left>
      <S.Center>{renderMenuItems()}</S.Center>
      <S.Right>{renderIconContainer()}</S.Right>
    </S.Container>
  );
};

export default Toolbar;

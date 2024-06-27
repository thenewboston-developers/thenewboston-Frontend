import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {mdiCartOutline} from '@mdi/js';

import {useResizeObserver} from 'hooks';
import {ShopToolbarType} from 'enums';
import {getCartProducts} from 'selectors/state';
import {SFC} from 'types';
import BuyMenuItems from './BuyMenuItems';
import SellMenuItems from './SellMenuItems';
import Switcher from './Switcher';
import {breakpoints} from 'styles';
import * as S from './Styles';

export interface ToolbarProps {
  toolbarType: ShopToolbarType;
}

const Toolbar: SFC<ToolbarProps> = ({className, toolbarType}) => {
  const isMobileDevice = useResizeObserver(breakpoints.mini);
  const cartProducts = useSelector(getCartProducts);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === '/shop/buy/checkout';
  const cartProductCount = useMemo(() => {
    return Object.values(cartProducts).length;
  }, [cartProducts]);

  const handleCartClick = () => {
    navigate('/shop/buy/checkout');
  };

  const renderCartProductCount = () => {
    if (!cartProductCount) return null;
    return <S.CartProductCount $isActive={isActive}>{cartProductCount}</S.CartProductCount>;
  };

  const renderIconContainer = () => {
    if (toolbarType === ShopToolbarType.SELL) return null;
    return (
      <S.IconContainer onClick={handleCartClick} $isActive={isActive}>
        <S.Icon path={mdiCartOutline} size="20px" $isActive={isActive} />
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
      {isMobileDevice ? (
        <S.Wrapper>
          <S.Center>{renderMenuItems()} </S.Center>
          <S.Right>{renderIconContainer()}</S.Right>
        </S.Wrapper>
      ) : (
        <>
          <S.Center>{renderMenuItems()} </S.Center>
          <S.Right>{renderIconContainer()}</S.Right>
        </>
      )}
    </S.Container>
  );
};

export default Toolbar;

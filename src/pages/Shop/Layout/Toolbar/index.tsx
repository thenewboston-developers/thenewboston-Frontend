import {useNavigate} from 'react-router-dom';

import ShopDropdownMenu from 'components/ShopDropdownMenu';
import {ShopToolbarType} from 'enums';
import {SFC} from 'types';
import BuyLogo from './assets/buy-logo.png';
import SellLogo from './assets/sell-logo.png';
import BuyMenuItems from './BuyMenuItems';
import SellMenuItems from './SellMenuItems';
import * as S from './Styles';

export interface ToolbarProps {
  toolbarType: ShopToolbarType;
}

const Toolbar: SFC<ToolbarProps> = ({className, toolbarType}) => {
  const navigate = useNavigate();

  const handleBuyLogoClick = () => {
    navigate('/shop/buy/catalog');
  };

  const handleSellLogoClick = () => {
    navigate('/shop/sell/products');
  };

  const renderLogo = () => {
    const clickHandler = toolbarType === ShopToolbarType.BUY ? handleBuyLogoClick : handleSellLogoClick;
    const src = toolbarType === ShopToolbarType.BUY ? BuyLogo : SellLogo;
    return <S.Logo alt="Shop Logo" onClick={clickHandler} src={src} />;
  };

  const renderMenuItems = () => {
    return toolbarType === ShopToolbarType.BUY ? <BuyMenuItems /> : <SellMenuItems />;
  };

  return (
    <S.Container className={className}>
      <S.Left>{renderLogo()}</S.Left>
      <S.Center>{renderMenuItems()}</S.Center>
      <S.Right>
        <ShopDropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Toolbar;

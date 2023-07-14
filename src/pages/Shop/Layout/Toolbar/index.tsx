import {useNavigate} from 'react-router-dom';

import ShopDropdownMenu from 'components/ShopDropdownMenu';
import {SFC} from 'types';
import BuyLogo from './assets/buy-logo.png';
import SellLogo from './assets/sell-logo.png';
import BuyMenuItems from './BuyMenuItems';
import * as S from './Styles';

export interface ToolbarProps {
  toolbarType: string;
}

const Toolbar: SFC<ToolbarProps> = ({className, toolbarType}) => {
  const navigate = useNavigate();

  const handleBuyLogoClick = () => {
    navigate('/shop/buyer/catalog');
  };

  const handleSellLogoClick = () => {
    navigate('/shop/seller/orders');
  };

  const renderLogo = () => {
    const clickHandler = toolbarType === 'buyer' ? handleBuyLogoClick : handleSellLogoClick;
    const src = toolbarType === 'buyer' ? BuyLogo : SellLogo;
    return <S.Logo alt="Shop Logo" onClick={clickHandler} src={src} />;
  };

  const renderMenuItems = () => {
    if (toolbarType === 'buyer') return <BuyMenuItems />;
    return null;
  };

  return (
    <S.Container className={className}>
      <S.Left>{renderLogo()}</S.Left>
      <S.Right>
        {renderMenuItems()}
        <ShopDropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Toolbar;

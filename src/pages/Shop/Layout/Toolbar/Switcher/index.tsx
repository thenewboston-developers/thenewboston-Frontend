import {useLocation, useNavigate} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

const Switcher: SFC = ({className}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/shop/buy/catalog');
  };

  const handleSellClick = () => {
    navigate('/shop/sell/products');
  };

  return (
    <S.Container className={className}>
      <S.Item $isActive={location.pathname.includes('/shop/buy')} onClick={handleBuyClick}>
        Buy
      </S.Item>
      <S.Item $isActive={location.pathname.includes('/shop/sell')} onClick={handleSellClick}>
        Sell
      </S.Item>
    </S.Container>
  );
};

export default Switcher;

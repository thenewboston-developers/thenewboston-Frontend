import {useLocation, useNavigate} from 'react-router-dom';
import {mdiArrowLeftBoldBoxOutline, mdiArrowRightBoldBoxOutline} from '@mdi/js';

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

  const isBuyActive = location.pathname.includes('/shop/buy');
  const isSellActive = location.pathname.includes('/shop/sell');

  return (
    <S.Container className={className}>
      <S.Item $isActive={isBuyActive} onClick={handleBuyClick}>
        <S.Icon $isActive={isBuyActive} path={mdiArrowLeftBoldBoxOutline} size="14px" />
        Buy
      </S.Item>
      <S.Item $isActive={isSellActive} onClick={handleSellClick}>
        <S.Icon $isActive={isSellActive} path={mdiArrowRightBoldBoxOutline} size="14px" />
        Sell
      </S.Item>
    </S.Container>
  );
};

export default Switcher;

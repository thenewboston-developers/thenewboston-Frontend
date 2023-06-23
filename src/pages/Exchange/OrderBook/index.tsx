import {OrderType} from 'enums';
import {SFC} from 'types';
import * as S from './Styles';

const OrderBook: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <h3>Order Book</h3>
      <S.Table>
        <thead>
          <S.Tr>
            <th>Quantity (VTX)</th>
            <th>Price (TNB)</th>
          </S.Tr>
        </thead>
        <tbody>
          <S.Tr>
            <S.Td>500</S.Td>
            <S.Td $orderType={OrderType.SELL}>6</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>120</S.Td>
            <S.Td $orderType={OrderType.SELL}>5</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>100</S.Td>
            <S.Td $orderType={OrderType.SELL}>5</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>200</S.Td>
            <S.Td $orderType={OrderType.BUY}>4</S.Td>
          </S.Tr>
          <S.Tr>
            <S.Td>280</S.Td>
            <S.Td $orderType={OrderType.BUY}>3</S.Td>
          </S.Tr>
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default OrderBook;

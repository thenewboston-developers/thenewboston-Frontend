import {Order, SFC} from 'types';
import * as S from './Styles';

export interface TradesModalProps {
  close(): void;
  order: Order | null;
}

const TradesModal: SFC<TradesModalProps> = ({className, close, order}) => {
  if (!order) return null;

  return (
    <S.Modal className={className} close={close} header="Trades">
      <h1>{order.id}</h1>
    </S.Modal>
  );
};

export default TradesModal;

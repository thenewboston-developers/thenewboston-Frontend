import {GenericVoidFunction, SFC} from 'types';
import {truncate} from 'utils/strings';
import * as S from './Styles';

export interface ShopProductListDetailsProps {
  coreId: number;
  description: string;
  name: string;
  onClick?: GenericVoidFunction;
  price: number;
}

const ShopProductListDetails: SFC<ShopProductListDetailsProps> = ({
  className,
  coreId,
  description,
  name,
  onClick,
  price,
}) => {
  return (
    <S.Container className={className}>
      <S.Name onClick={onClick}>{name}</S.Name>
      <S.Description>{truncate(description, 200)}</S.Description>
      <S.PriceMini coreId={coreId} price={price} />
    </S.Container>
  );
};

export default ShopProductListDetails;

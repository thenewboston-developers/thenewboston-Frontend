import {GenericVoidFunction, SFC} from 'types';
import {longDate} from 'utils/dates';
import {truncate} from 'utils/strings';
import * as S from './Styles';

export interface ShopProductListDetailsProps {
  coreId: number;
  createDate?: Date;
  description: string;
  isOrderProduct?: boolean;
  name: string;
  onClick?: GenericVoidFunction;
  price: number;
}

const ShopProductListDetails: SFC<ShopProductListDetailsProps> = ({
  className,
  coreId,
  createDate,
  description,
  isOrderProduct,
  name,
  onClick,
  price,
}) => {
  return (
    <S.Container className={className}>
      <S.Name onClick={onClick}>{name}</S.Name>
      <S.Description>{truncate(description, 200)}</S.Description>
      {createDate && <S.Date>{longDate(createDate)}</S.Date>}
      {isOrderProduct && <S.PriceMini coreId={coreId} price={price} />}
    </S.Container>
  );
};

export default ShopProductListDetails;

import {ReactNode} from 'react';
import {Address, SFC} from 'types';
import * as S from './Styles';

export interface AddressCardProps {
  address: Address;
  rightContent?: ReactNode;
}

const AddressCard: SFC<AddressCardProps> = ({address, className, rightContent}) => {
  const {address_1, address_2, city, country, state, zip_code} = address;

  return (
    <S.Container className={className}>
      <S.Left>
        <S.Text>{address_1}</S.Text>
        {address_2 && <S.Div>{`${address_2} #2`}</S.Div>}
        <S.Div> {`${state}, ${city}, ${country}`} </S.Div>
        {zip_code}
      </S.Left>
      <S.Right>{rightContent}</S.Right>
    </S.Container>
  );
};
export default AddressCard;

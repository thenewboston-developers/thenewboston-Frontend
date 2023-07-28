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
        <div>{address_1}</div>
        {address_2 ? <div>{address_2}</div> : null}
        <div>
          {city}, {state}
        </div>
        <div>{zip_code}</div>
        <div>{country}</div>
      </S.Left>
      <S.Right>{rightContent}</S.Right>
    </S.Container>
  );
};

export default AddressCard;

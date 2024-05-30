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
        <div>
          <S.Title>Address 1</S.Title>
          <S.Dot>:</S.Dot>
          {address_1}
        </div>
        {address_2 && (
          <div>
            <S.Title>Address 2</S.Title>
            <S.Dot>:</S.Dot>
            {address_2}
          </div>
        )}
        <div>
          <S.Title>State/City</S.Title>
          <S.Dot>:</S.Dot>
          {state}/ {city}
        </div>
        <div>
          <S.Title>Country</S.Title>
          <S.Dot $marginLeft={'21px'}>:</S.Dot>
          {country}
        </div>
        <div>
          <S.Title>Zip code</S.Title>
          <S.Dot $marginLeft={'20px'}>:</S.Dot>
          {zip_code}
        </div>
      </S.Left>
      <S.Right>{rightContent}</S.Right>
    </S.Container>
  );
};
export default AddressCard;

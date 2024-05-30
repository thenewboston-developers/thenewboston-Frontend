import {useDispatch, useSelector} from 'react-redux';

import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {Address, AppDispatch, SFC} from 'types';
import * as S from './Styles';

export interface AddressSelectCardProps {
  address: Address;
}

const AddressSelectCard: SFC<AddressSelectCardProps> = ({address, className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const {address_1, address_2, city, country, id, state, zip_code} = address;

  const isSelected = id === manager.activeOrderAddressId;

  const handleClick = () => {
    const value = isSelected ? null : id;
    dispatch(updateManager({activeOrderAddressId: value}));
  };

  return (
    <S.Container $isSelected={isSelected} className={className} onClick={handleClick}>
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
        <S.Title>Zip code</S.Title>
        <S.Dot $marginLeft={'20px'}>:</S.Dot>
        {zip_code}
      </div>
      <div>
        <S.Title>Country</S.Title>
        <S.Dot $marginLeft={'21px'}>:</S.Dot>
        {country}
      </div>
    </S.Container>
  );
};

export default AddressSelectCard;

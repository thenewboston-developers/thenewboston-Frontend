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
      <div>{address_1}</div>
      {address_2 ? <div>{address_2}</div> : null}
      <div>
        {city}, {state}
      </div>
      <div>{zip_code}</div>
      <div>{country}</div>
    </S.Container>
  );
};

export default AddressSelectCard;

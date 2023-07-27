import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAddresses} from 'selectors/state';
import {SFC} from 'types';
import AddressSelectCard from './AddressSelectCard';
import * as S from './Styles';

interface AddressSelectModalProps {
  close(): void;
}

const AddressSelectModal: SFC<AddressSelectModalProps> = ({className, close}) => {
  const addresses = useSelector(getAddresses);

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const renderAddressSelectCards = () => {
    const _addresses = addressList.map((address) => <AddressSelectCard address={address} key={address.id} />);
    return <S.AddressSelectCards>{_addresses}</S.AddressSelectCards>;
  };

  const renderContent = () => {
    if (!!addressList.length) return renderAddressSelectCards();
    return <S.EmptyText>No addresses to display.</S.EmptyText>;
  };

  return (
    <S.Modal className={className} close={close} header="Select Address">
      {renderContent()}
    </S.Modal>
  );
};

export default AddressSelectModal;

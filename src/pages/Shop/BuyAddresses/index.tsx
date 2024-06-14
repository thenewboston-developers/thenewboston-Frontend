import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useToggle} from 'hooks';
import Button from 'components/Button';
import EmptyPage from 'components/EmptyPage';
import BuyAddressDetailsModal from 'modals/BuyAddressDetailsModal';
import Address from './Address';
import EmptyAddress from 'assets/empty-address.svg';
import {getAddresses} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const BuyAddresses: SFC = ({className}) => {
  const [addressModalIsOpen, setAddressModalIsOpen] = useToggle(false);
  const addresses = useSelector(getAddresses);
  const dispatch = useDispatch<AppDispatch>();

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const handleButtonClick = () => {
    dispatch(updateManager({activeAddress: null}));
    setAddressModalIsOpen();
  };

  const renderAddresses = () => {
    const _addresses = addressList.map((address) => (
      <S.AddressCard key={address.id}>
        <Address address={address} />
      </S.AddressCard>
    ));
    return <S.Addresses>{_addresses}</S.Addresses>;
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} text="Add Address" />;
  };

  const renderContent = () => {
    if (!!addressList.length) return renderAddresses();
    return (
      <S.Div>
        <EmptyPage
          bottomText="Add your address to display."
          graphic={EmptyAddress}
          topText="Sorry! You haven’t add your address yet."
          size={340}
        />
      </S.Div>
    );
  };

  return (
    <S.Container className={className}>
      <S.Box>
        <S.Heading>
          My Address — <span>{addressList.length}</span>
        </S.Heading>
        {renderButton()}
      </S.Box>
      {renderContent()}
      {addressModalIsOpen ? <BuyAddressDetailsModal close={setAddressModalIsOpen} /> : null}
    </S.Container>
  );
};

export default BuyAddresses;

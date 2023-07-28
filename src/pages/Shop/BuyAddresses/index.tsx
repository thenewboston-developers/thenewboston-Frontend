import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {getAddresses} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import Address from './Address';
import * as S from './Styles';

const BuyAddresses: SFC = ({className}) => {
  const addresses = useSelector(getAddresses);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const handleButtonClick = () => {
    dispatch(updateManager({activeAddress: null}));
    navigate('/shop/buy/createEditAddress');
  };

  const renderAddresses = () => {
    const _addresses = addressList.map((address) => <Address address={address} key={address.id} />);
    return <S.Addresses>{_addresses}</S.Addresses>;
  };

  const renderButton = () => {
    return <Button onClick={handleButtonClick} text="Add" />;
  };

  const renderContent = () => {
    if (!!addressList.length) return renderAddresses();
    return <EmptyText>No addresses to display.</EmptyText>;
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="My Addresses" rightContent={renderButton()} />
      {renderContent()}
    </S.Container>
  );
};

export default BuyAddresses;

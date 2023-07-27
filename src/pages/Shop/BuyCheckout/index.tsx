import {mdiDotsVertical} from '@mdi/js';

import AddressCard from 'components/AddressCard';
import Button from 'components/Button';
import DropdownMenu from 'components/DropdownMenu';
import {useActiveOrderAddress, useToggle} from 'hooks';
import AddressSelectModal from 'modals/AddressSelectModal';
import {SFC} from 'types';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const activeOrderAddress = useActiveOrderAddress();

  const renderAddress = () => {
    let content = <Button onClick={toggleAddressSelectModal} text="Select Address" />;

    if (activeOrderAddress) {
      content = <AddressCard address={activeOrderAddress} rightContent={renderAddressDropdownMenu()} />;
    }

    return (
      <S.Address>
        <S.Heading>Address</S.Heading>
        <S.Line />
        {content}
      </S.Address>
    );
  };

  const renderAddressDropdownMenu = () => {
    const menuOptions = [{label: 'Edit', onClick: toggleAddressSelectModal}];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.LeftTop>
          {renderAddress()}
          {renderParticipants()}
        </S.LeftTop>
        {renderProducts()}
      </S.Left>
    );
  };

  const renderParticipants = () => {
    return (
      <S.Participants>
        <S.Heading>Participants</S.Heading>
        <S.Line />
      </S.Participants>
    );
  };

  const renderProducts = () => {
    return (
      <>
        <S.Heading>Products</S.Heading>
        <S.Line />
      </>
    );
  };

  const renderRight = () => {
    return (
      <S.Right>
        <S.Heading>Total</S.Heading>
        <S.Line />
      </S.Right>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderLeft()}
        {renderRight()}
      </S.Container>
      {addressSelectModalIsOpen ? <AddressSelectModal close={toggleAddressSelectModal} /> : null}
    </>
  );
};

export default BuyCheckout;

import {useDispatch} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';
import {useToggle} from 'hooks';
import AddressCard from 'components/AddressCard';
import DropdownMenu from 'components/DropdownMenu';
import BuyAddressDetailsModal from 'modals/BuyAddressDetailsModal';
import {deleteAddress} from 'dispatchers/addresses';
import {ToastType} from 'enums';
import {updateManager} from 'store/manager';
import {Address as TAddress, AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

export interface AddressProps {
  address: TAddress;
}

const Address: SFC<AddressProps> = ({address, className}) => {
  const [addressEditModalIsOpen, setAddressEditModalIsOpen] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteAddress(address.id));
      displayToast('Address deleted', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting address');
    }
  };

  const handleEditClick = () => {
    dispatch(updateManager({activeAddress: address}));
    setAddressEditModalIsOpen();
  };

  const renderDropdownMenu = () => {
    const menuOptions = [
      {label: 'Edit', menuIcon: mdiSquareEditOutline, onClick: handleEditClick},
      {label: 'Delete', menuIcon: mdiDeleteOutline, onClick: handleDeleteClick},
    ];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <>
      <AddressCard address={address} className={className} rightContent={renderDropdownMenu()} />
      {addressEditModalIsOpen ? <BuyAddressDetailsModal close={setAddressEditModalIsOpen} /> : null}
    </>
  );
};

export default Address;

import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import AddressCard from 'components/AddressCard';
import DropdownMenu from 'components/DropdownMenu';
import {deleteAddress} from 'dispatchers/addresses';
import {ToastType} from 'enums';
import {updateManager} from 'store/manager';
import {Address as TAddress, AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';

export interface AddressProps {
  address: TAddress;
}

const Address: SFC<AddressProps> = ({address, className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
    navigate('/shop/buy/createEditAddress');
  };

  const renderDropdownMenu = () => {
    const menuOptions = [
      {label: 'Edit', onClick: handleEditClick},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return <AddressCard address={address} className={className} rightContent={renderDropdownMenu()} />;
};

export default Address;

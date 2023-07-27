import {useSelector} from 'react-redux';

import {getAddresses, getManager} from 'selectors/state';
import {Address} from 'types';

const useActiveOrderAddress = (): Address | null => {
  const addresses = useSelector(getAddresses);
  const manager = useSelector(getManager);

  return manager.activeOrderAddressId && addresses[manager.activeOrderAddressId]
    ? addresses[manager.activeOrderAddressId]
    : null;
};

export default useActiveOrderAddress;

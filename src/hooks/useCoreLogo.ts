import {useSelector} from 'react-redux';

import UnknownCore from 'assets/unknown-core.png';
import {getCores} from 'selectors/state';

const useCoreLogo = (coreId: number) => {
  const cores = useSelector(getCores);

  const core = cores[coreId];
  return core?.logo || UnknownCore;
};

export default useCoreLogo;

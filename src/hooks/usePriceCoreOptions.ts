import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCores} from 'selectors/state';

type Option = {
  displayName: string;
  value: number;
};

const usePriceCoreOptions = (): Option[] => {
  const cores = useSelector(getCores);

  const options = useMemo(() => {
    return Object.values(cores).map(({id, ticker}) => ({
      displayName: ticker,
      value: id,
    }));
  }, [cores]);

  return [{displayName: '-', value: 0}, ...options];
};

export default usePriceCoreOptions;

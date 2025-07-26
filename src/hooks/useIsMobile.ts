import {breakpoints} from 'styles';

import useWindowSize from './useWindowSize';

const useIsMobile = (): boolean => {
  const {width} = useWindowSize();
  return width < parseInt(breakpoints.mobile);
};

export default useIsMobile;

import {useWindowSize} from 'hooks';
import {breakpoints} from 'styles';

// Mirrors the CSS breakpoint at which the left navigation collapses into an icon-only rail
const useIsRail = (): boolean => {
  const {width} = useWindowSize();
  return width <= parseInt(breakpoints.tablet);
};

export default useIsRail;

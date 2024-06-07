import {useEffect, useState} from 'react';

const useResizeObserver = (width: string) => {
  const [isResizeDevice, setIsResizeDevice] = useState<boolean>(window.innerWidth <= parseInt(width));

  useEffect(() => {
    const handleResize = () => {
      setIsResizeDevice(window.innerWidth <= parseInt(width));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);
  return isResizeDevice;
};
export default useResizeObserver;

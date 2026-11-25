import {useEffect, useState} from 'react';

const query = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

// Cards are dealt one at a time only where the player has not asked for reduced motion; otherwise they just appear.
const useMotion = () => {
  const [animate, setAnimate] = useState(() => {
    const media = query();
    return !!media && !media.matches;
  });

  useEffect(() => {
    const media = query();
    if (!media || typeof media.addEventListener !== 'function') return undefined;
    const handleChange = () => setAnimate(!media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return animate;
};

export default useMotion;

import {useEffect, useState} from 'react';

const query = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

// Full reel animation only where the browser can run it and the player has not asked for reduced motion.
const useMotion = () => {
  const [animate, setAnimate] = useState(() => {
    const media = query();
    return !!media && !media.matches && typeof requestAnimationFrame === 'function';
  });

  useEffect(() => {
    const media = query();
    if (!media || typeof media.addEventListener !== 'function') return undefined;
    const handleChange = () => setAnimate(!media.matches && typeof requestAnimationFrame === 'function');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return animate;
};

export default useMotion;

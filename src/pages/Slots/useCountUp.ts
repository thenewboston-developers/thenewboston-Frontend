import {useEffect, useRef, useState} from 'react';

const canAnimate = () => typeof requestAnimationFrame === 'function';

// Counts from the number on screen to the new value, so a change mid-count never jumps.
const useCountUp = (target: number, duration: number, animate: boolean, initial = target) => {
  const [value, setValue] = useState(animate ? initial : target);
  const shown = useRef(animate ? initial : target);

  useEffect(() => {
    const from = shown.current;
    if (!animate || from === target || !canAnimate() || duration <= 0) {
      shown.current = target;
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      const next = Math.round(from + (target - from) * eased);
      shown.current = next;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [animate, duration, target]);

  return value;
};

export default useCountUp;

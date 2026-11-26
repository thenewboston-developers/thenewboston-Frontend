import {useEffect, useRef, useState} from 'react';

const DURATION = 700;

// Counts from the previous value to the new one. The first value is shown as is, so nothing counts up on page load.
const AnimatedNumber = ({value}: {value: number}) => {
  const [shown, setShown] = useState(value);
  const latest = useRef(value);

  useEffect(() => {
    const from = latest.current;
    if (from === value) return undefined;
    const still =
      typeof window.requestAnimationFrame !== 'function' ||
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      latest.current = value;
      setShown(value);
      return undefined;
    }
    let frame = 0;
    let start: number | undefined;
    const step = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / DURATION);
      const next = Math.round(from + (value - from) * (1 - (1 - progress) ** 3));
      latest.current = next;
      setShown(next);
      if (progress < 1) frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown.toLocaleString()}</>;
};

export default AnimatedNumber;

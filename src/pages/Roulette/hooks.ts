import {useEffect, useRef, useState} from 'react';

// Browsers without the media query API get the calm version of every animation
export const prefersReducedMotion = (): boolean =>
  typeof window === 'undefined' ||
  typeof window.matchMedia !== 'function' ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rolls a displayed number toward its new value, like a counter on the table rail. While `animate` is false the number
// simply follows the value, for a figure that is still loading.
export const useCountUp = (value: number, duration = 700, animate = true): number => {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return undefined;
    if (!animate || prefersReducedMotion() || duration <= 0) {
      current.current = value;
      setShown(value);
      return undefined;
    }
    let request = 0;
    let start: number | null = null;
    const step = (now: number) => {
      // Timed from the first frame: a frame's timestamp can be earlier than the moment the effect ran
      start ??= now;
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      const next = Math.round(from + (value - from) * (1 - (1 - progress) ** 3));
      current.current = next;
      setShown(next);
      if (progress < 1) request = requestAnimationFrame(step);
    };
    request = requestAnimationFrame(step);
    return () => cancelAnimationFrame(request);
  }, [animate, duration, value]);

  return shown;
};

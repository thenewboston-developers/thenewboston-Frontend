import {useEffect, useRef} from 'react';

/** Records a real viewport exposure, once per key while mounted, instead of counting every poll/render. */
const useAnalyticsExposure = <T extends HTMLElement>(key: string | null, onViewed: () => void) => {
  const element = useRef<T>(null);
  const latestOnViewed = useRef(onViewed);
  const seen = useRef(new Set<string>());
  latestOnViewed.current = onViewed;

  useEffect(() => {
    if (!key || !element.current || seen.current.has(key) || typeof IntersectionObserver === 'undefined')
      return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
        if (seen.current.has(key)) return;
        seen.current.add(key);
        latestOnViewed.current();
        observer.disconnect();
      },
      {threshold: 0.5},
    );
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [key]);

  return element;
};

export default useAnalyticsExposure;

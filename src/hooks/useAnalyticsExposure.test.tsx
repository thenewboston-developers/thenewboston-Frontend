import {act, StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';

import useAnalyticsExposure from './useAnalyticsExposure';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let callback: IntersectionObserverCallback;
let container: HTMLDivElement;
let root: Root;
const disconnect = jest.fn();
const viewed = jest.fn();
const originalObserver = window.IntersectionObserver;

const Offer = ({offerKey}: {offerKey: string | null}) => {
  const ref = useAnalyticsExposure<HTMLDivElement>(offerKey, viewed);
  return <div ref={ref}>Reward promise</div>;
};

beforeEach(() => {
  window.IntersectionObserver = jest.fn((onIntersect) => {
    callback = onIntersect;
    return {disconnect, observe: jest.fn()};
  }) as unknown as typeof IntersectionObserver;
  container = document.createElement('div');
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  window.IntersectionObserver = originalObserver;
});

it('records visibility once after the threshold and ignores rerenders and duplicate callbacks', () => {
  act(() =>
    root.render(
      <StrictMode>
        <Offer offerKey="checkers:27" />
      </StrictMode>,
    ),
  );
  expect(viewed).not.toHaveBeenCalled();
  act(() =>
    callback([{isIntersecting: false, intersectionRatio: 0} as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  expect(viewed).not.toHaveBeenCalled();
  act(() =>
    callback([{isIntersecting: true, intersectionRatio: 0.1} as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  expect(viewed).not.toHaveBeenCalled();
  act(() =>
    callback([{isIntersecting: true, intersectionRatio: 0.5} as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  act(() =>
    root.render(
      <StrictMode>
        <Offer offerKey="checkers:27" />
      </StrictMode>,
    ),
  );
  act(() =>
    callback([{isIntersecting: true, intersectionRatio: 1} as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  expect(viewed).toHaveBeenCalledTimes(1);
  act(() =>
    root.render(
      <StrictMode>
        <Offer offerKey="checkers:28" />
      </StrictMode>,
    ),
  );
  expect(viewed).toHaveBeenCalledTimes(1);
  act(() =>
    callback([{isIntersecting: true, intersectionRatio: 1} as IntersectionObserverEntry], {} as IntersectionObserver),
  );
  expect(viewed).toHaveBeenCalledTimes(2);
});

it('does not claim exposure before content is ready or when visibility cannot be measured', () => {
  act(() => root.render(<Offer offerKey={null} />));
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
  window.IntersectionObserver = undefined as unknown as typeof IntersectionObserver;
  act(() => root.render(<Offer offerKey="checkers:27" />));
  expect(viewed).not.toHaveBeenCalled();
});

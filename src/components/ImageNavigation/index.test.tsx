import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import ImageNavigation from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let onBackdropClick: jest.Mock;
let onIndexChange: jest.Mock;
let root: Root;

const getButton = (label: string) => container.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);

const pressKey = (key: string, target: EventTarget = window) => {
  act(() => {
    target.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key}));
  });
};

const renderNavigation = (index: number, count = 3) => {
  act(() => {
    root.render(
      <div onClick={onBackdropClick} role="presentation">
        <ImageNavigation count={count} index={index} onIndexChange={onIndexChange} />
      </div>,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  onBackdropClick = jest.fn();
  onIndexChange = jest.fn();
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('ImageNavigation', () => {
  it('renders nothing for a single image and ignores the arrow keys', () => {
    renderNavigation(0, 1);
    pressKey('ArrowRight');

    expect(container.textContent).toBe('');
    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('offers only the directions that have an image', () => {
    renderNavigation(0);
    expect(getButton('Previous image')).toBeNull();
    expect(getButton('Next image')).not.toBeNull();
    expect(container.textContent).toBe('1 / 3');

    renderNavigation(2);
    expect(getButton('Previous image')).not.toBeNull();
    expect(getButton('Next image')).toBeNull();
    expect(container.textContent).toBe('3 / 3');
  });

  it('moves with the buttons without letting the click reach the backdrop', () => {
    renderNavigation(1);

    act(() => getButton('Next image')?.click());
    act(() => getButton('Previous image')?.click());

    expect(onIndexChange.mock.calls).toEqual([[2], [0]]);
    expect(onBackdropClick).not.toHaveBeenCalled();
  });

  it('moves with the arrow keys, except while the visitor is typing', () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    renderNavigation(1);

    pressKey('ArrowRight');
    pressKey('ArrowLeft');
    pressKey('ArrowRight', textarea);
    textarea.remove();

    expect(onIndexChange.mock.calls).toEqual([[2], [0]]);
  });

  it('stops at the first and the last image', () => {
    renderNavigation(0);
    pressKey('ArrowLeft');
    renderNavigation(2);
    pressKey('ArrowRight');

    expect(onIndexChange).not.toHaveBeenCalled();
  });
});

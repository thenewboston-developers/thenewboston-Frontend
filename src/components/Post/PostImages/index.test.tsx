import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {PostImage} from 'types';

import PostImages from './index';

const mockFullScreenImageModal = jest.fn();

jest.mock('modals/FullScreenImageModal', () => ({
  __esModule: true,
  default: (props: {images: string[]; initialIndex?: number}) => {
    mockFullScreenImageModal(props);
    return null;
  },
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const makeImages = (count: number): PostImage[] => {
  return Array.from({length: count}, (_, index) => ({id: index + 1, image: `https://example.test/${index + 1}.png`}));
};

const renderImages = (count: number) => {
  act(() => {
    root.render(<PostImages images={makeImages(count)} />);
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('PostImages', () => {
  it('renders nothing for a post without images', () => {
    renderImages(0);

    expect(container.innerHTML).toBe('');
  });

  it('shows a single image at its own size', () => {
    renderImages(1);

    expect(container.querySelectorAll('button')).toHaveLength(0);
    expect(container.querySelector('img[role="button"]')?.getAttribute('src')).toBe('https://example.test/1.png');
  });

  it('shows up to four images as tiles and counts the rest on the last tile', () => {
    renderImages(3);
    expect(container.querySelectorAll('button')).toHaveLength(3);
    expect(container.textContent).toBe('');

    renderImages(6);
    const tiles = Array.from(container.querySelectorAll('button'));
    expect(tiles.map((tile) => tile.querySelector('img')?.getAttribute('src'))).toEqual(
      [1, 2, 3, 4].map((id) => `https://example.test/${id}.png`),
    );
    expect(tiles.map((tile) => tile.textContent)).toEqual(['', '', '', '+2']);
    expect(tiles[3].getAttribute('aria-label')).toBe('View image 4 of 6');
  });

  it('opens the viewer with every image at the image that was clicked', () => {
    renderImages(6);
    expect(mockFullScreenImageModal).not.toHaveBeenCalled();

    act(() => {
      container.querySelectorAll('button')[1].click();
    });

    expect(mockFullScreenImageModal).toHaveBeenLastCalledWith(
      expect.objectContaining({images: makeImages(6).map(({image}) => image), initialIndex: 1}),
    );
  });
});

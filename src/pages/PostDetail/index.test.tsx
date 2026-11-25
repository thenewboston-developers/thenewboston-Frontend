import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter, NavigateFunction, Route, Routes, useNavigate} from 'react-router-dom';

import {displayErrorToast} from 'utils/toasts';

import PostDetail from '.';

jest.mock('axios', () => ({}));
jest.mock('components/Post', () => () => <div>Post content</div>);
jest.mock('dispatchers/posts', () => ({getPost: jest.fn()}));
jest.mock('hooks', () => ({...jest.requireActual('hooks'), useIsAuthenticated: () => true}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const POST_ID = 2121;
const DELETED_MESSAGE = 'This post was deleted';

let container: HTMLDivElement;
let dispatch: jest.Mock;
let navigate: NavigateFunction;
let posts: {id: number}[];
let root: Root;

const NavigateCapture = () => {
  navigate = useNavigate();
  return null;
};

const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter
        future={{v7_relativeSplatPath: true, v7_startTransition: true}}
        initialEntries={[`/posts/${POST_ID}?comment=3710`]}
      >
        <NavigateCapture />
        <Routes>
          <Route element={<PostDetail />} path="/posts/:postId" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  dispatch = jest.fn();
  posts = [];
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useSelector as unknown as jest.Mock).mockImplementation(() => posts);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('PostDetail', () => {
  it('says that the post was deleted when the API no longer has it', async () => {
    dispatch.mockRejectedValue({response: {status: 404}});

    await render();

    expect(container.textContent).toContain(DELETED_MESSAGE);
    expect(displayErrorToast).not.toHaveBeenCalled();
  });

  it('reports other failures without saying that the post was deleted', async () => {
    dispatch.mockRejectedValue({response: {status: 500}});

    await render();

    expect(container.textContent).not.toContain(DELETED_MESSAGE);
    expect(displayErrorToast).toHaveBeenCalledWith('Failed to load post');
  });

  it('shows the post, and says that it was deleted once it is deleted while open', async () => {
    posts = [{id: POST_ID}];
    dispatch.mockResolvedValue({id: POST_ID});

    await render();

    expect(container.textContent).toContain('Post content');
    expect(container.textContent).not.toContain(DELETED_MESSAGE);

    posts = [];
    await render();

    expect(container.textContent).not.toContain('Post content');
    expect(container.textContent).toContain(DELETED_MESSAGE);
  });

  it('never says that the next post was deleted while it loads', async () => {
    posts = [{id: POST_ID}];
    dispatch.mockResolvedValue({id: POST_ID});
    await render();
    const insertedText: string[] = [];
    const collect = (records: MutationRecord[]) =>
      records.forEach(({addedNodes}) => addedNodes.forEach((node) => insertedText.push(node.textContent || '')));
    const observer = new MutationObserver(collect);
    observer.observe(container, {childList: true, subtree: true});
    dispatch.mockReturnValue(new Promise(() => {}));

    await act(async () => navigate('/posts/2163'));
    collect(observer.takeRecords());
    observer.disconnect();

    expect(insertedText.join(' ')).not.toContain(DELETED_MESSAGE);
    expect(container.textContent).not.toContain('Post content');
  });
});

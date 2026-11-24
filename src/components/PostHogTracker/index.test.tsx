import {act, StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {
  captureAnalyticsEvent,
  getAnalyticsPath,
  initializeAnalytics,
  isAnalyticsRedirectPath,
  syncAnalyticsIdentity,
} from 'utils/analytics';
import {captureGamePage} from 'utils/gameAnalytics';

import PostHogTracker from './index';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));
jest.mock('utils/gameAnalytics', () => ({captureGamePage: jest.fn()}));
jest.mock('react-router-dom', () => ({useLocation: jest.fn()}));
jest.mock('utils/analytics', () => ({
  captureAnalyticsEvent: jest.fn(),
  getAnalyticsPath: jest.fn(),
  initializeAnalytics: jest.fn(),
  isAnalyticsRedirectPath: jest.fn(),
  syncAnalyticsIdentity: jest.fn(),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

interface TrackerState {
  authentication: {accessToken: string | null};
  self: {id: number | null; is_staff?: boolean};
}

let container: HTMLDivElement;
let location: {hash: string; pathname: string; search: string};
let root: Root;
let state: TrackerState;

const renderTracker = (strict = false) => {
  act(() => {
    root.render(
      strict ? (
        <StrictMode>
          <PostHogTracker />
        </StrictMode>
      ) : (
        <PostHogTracker />
      ),
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  location = {hash: '', pathname: '/', search: ''};
  state = {authentication: {accessToken: null}, self: {id: null}};
  (useLocation as jest.Mock).mockImplementation(() => location);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector(state));
  (getAnalyticsPath as jest.Mock).mockImplementation((path: string) => path.replace(/\/\d+(?=\/|$)/g, '/:id'));
  (isAnalyticsRedirectPath as jest.Mock).mockImplementation((path: string) => path === '/exchange');
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('PostHogTracker', () => {
  it('records game navigation once without repeating it when identity resolves', () => {
    location.pathname = '/checkers/home';
    renderTracker(true);
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42}};
    renderTracker(true);
    expect(captureGamePage).toHaveBeenCalledTimes(1);
    expect(captureGamePage).toHaveBeenCalledWith('/checkers/home', false);
  });
  it('initializes and synchronizes identity before the first pageview', () => {
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42}};
    renderTracker();

    expect(initializeAnalytics).toHaveBeenCalledTimes(1);
    expect(syncAnalyticsIdentity).toHaveBeenCalledWith('42', false);
    expect(captureAnalyticsEvent).toHaveBeenCalledWith('$pageview', {
      $current_url: `${window.location.origin}/`,
      $pathname: '/',
      page_path: '/',
    });
    expect((initializeAnalytics as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
      (syncAnalyticsIdentity as jest.Mock).mock.invocationCallOrder[0],
    );
    expect((syncAnalyticsIdentity as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
      (captureAnalyticsEvent as jest.Mock).mock.invocationCallOrder[0],
    );
  });

  it('captures each pathname transition once and ignores query/hash-only changes and rerenders', () => {
    renderTracker();
    renderTracker();
    location = {hash: '#private', pathname: '/', search: '?token=private'};
    renderTracker();
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);

    location = {hash: '#private', pathname: '/posts/123', search: '?query=private'};
    renderTracker();
    renderTracker();
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(2);
    expect(getAnalyticsPath).toHaveBeenLastCalledWith('/posts/123');
    expect(captureAnalyticsEvent).toHaveBeenLastCalledWith('$pageview', {
      $current_url: `${window.location.origin}/posts/:id`,
      $pathname: '/posts/:id',
      page_path: '/posts/:id',
    });

    location = {...location, pathname: '/posts/456'};
    renderTracker();
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(3);
  });

  it('skips a path that only redirects and counts the page it leads to', () => {
    location = {hash: '', pathname: '/exchange', search: ''};
    renderTracker();
    expect(captureAnalyticsEvent).not.toHaveBeenCalled();

    location = {hash: '', pathname: '/exchange/home', search: ''};
    renderTracker();
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(captureAnalyticsEvent).toHaveBeenLastCalledWith('$pageview', {
      $current_url: `${window.location.origin}/exchange/home`,
      $pathname: '/exchange/home',
      page_path: '/exchange/home',
    });
  });

  it('does not double-count the initial pageview when React replays effects in StrictMode', () => {
    renderTracker(true);

    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);
  });

  it.each([
    {authentication: {accessToken: null}, self: {id: 42}},
    {authentication: {accessToken: 'private-token'}, self: {id: null}},
  ])('remains anonymous with incomplete authentication state %#', (incompleteState) => {
    state = incompleteState;
    renderTracker();

    expect(syncAnalyticsIdentity).toHaveBeenCalledWith(null, false);
  });

  it('marks a signed-in staff member, and nobody else, as internal', () => {
    state = {authentication: {accessToken: null}, self: {id: 42, is_staff: true}};
    renderTracker();
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42, is_staff: true}};
    renderTracker();

    expect((syncAnalyticsIdentity as jest.Mock).mock.calls).toEqual([
      [null, false],
      ['42', true],
    ]);
  });

  it('synchronizes sign-in, account changes, and sign-out without duplicate pageviews', () => {
    renderTracker();
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42}};
    renderTracker();
    state = {authentication: {accessToken: 'different-private-token'}, self: {id: 43}};
    renderTracker();
    state = {authentication: {accessToken: null}, self: {id: null}};
    renderTracker();

    expect((syncAnalyticsIdentity as jest.Mock).mock.calls).toEqual([
      [null, false],
      ['42', false],
      ['43', false],
      [null, false],
    ]);
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);
  });
});

import {act, StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {captureAnalyticsEvent, getAnalyticsPath, initializeAnalytics, syncAnalyticsIdentity} from 'utils/analytics';

import PostHogTracker from './index';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({useLocation: jest.fn()}));
jest.mock('utils/analytics', () => ({
  captureAnalyticsEvent: jest.fn(),
  getAnalyticsPath: jest.fn(),
  initializeAnalytics: jest.fn(),
  syncAnalyticsIdentity: jest.fn(),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

interface TrackerState {
  authentication: {accessToken: string | null};
  self: {id: number | null};
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
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('PostHogTracker', () => {
  it('initializes and synchronizes identity before the first pageview', () => {
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42}};
    renderTracker();

    expect(initializeAnalytics).toHaveBeenCalledTimes(1);
    expect(syncAnalyticsIdentity).toHaveBeenCalledWith('42');
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

    expect(syncAnalyticsIdentity).toHaveBeenCalledWith(null);
  });

  it('synchronizes sign-in, account changes, and sign-out without duplicate pageviews', () => {
    renderTracker();
    state = {authentication: {accessToken: 'private-token'}, self: {id: 42}};
    renderTracker();
    state = {authentication: {accessToken: 'different-private-token'}, self: {id: 43}};
    renderTracker();
    state = {authentication: {accessToken: null}, self: {id: null}};
    renderTracker();

    expect((syncAnalyticsIdentity as jest.Mock).mock.calls).toEqual([[null], ['42'], ['43'], [null]]);
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);
  });
});

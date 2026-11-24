import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import ComputerRewardNotice from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

it('distinguishes a paid award from a fund that could not pay at completion', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<ComputerRewardNotice reward={{status: 'paid', amount: 10, currency: 'TNB'}} />));
  expect(container).toHaveTextContent('+10 TNB game reward');
  expect(container).toHaveTextContent('Payment confirmed');
  expect(container).toHaveTextContent('Paid to your wallet from the community game fund.');
  act(() => root.render(<ComputerRewardNotice reward={{status: 'fund_empty', amount: 0, currency: 'TNB'}} />));
  expect(container).toHaveTextContent('No reward was available when this match ended');
  expect(container).not.toHaveTextContent('+10');
  expect(container).not.toHaveTextContent('Payment confirmed');
  act(() => root.render(<ComputerRewardNotice reward={null} />));
  expect(container.textContent).toBe('');
  act(() => root.unmount());
});

it('invites a guest winner to create an account without implying past coins can be claimed', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerRewardNotice guest reward={{status: 'guest', amount: 10, currency: 'TNB'}} />
      </MemoryRouter>,
    ),
  );
  expect(container).toHaveTextContent('this win would have earned you 10 coins');
  expect(container).toHaveTextContent('No coins were earned or reserved');
  expect(container.querySelector('a')).toHaveAttribute('href', '/create-account?next=%2Fgames');
  expect(container).not.toHaveTextContent('Paid to your wallet');
  expect(container).not.toHaveTextContent('Payment confirmed');
  act(() => root.unmount());
});

it('uses the actual paid amount and keeps deposit graphics out of the accessible announcement', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<ComputerRewardNotice reward={{status: 'paid', amount: 1250, currency: 'TNB'}} />));
  expect(container.querySelector('h3')).toHaveTextContent(`+${(1250).toLocaleString()} TNB game reward`);
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Payment confirmed');
  const graphics = container.querySelectorAll('svg');
  expect(graphics.length).toBeGreaterThan(0);
  graphics.forEach((graphic) => {
    expect(graphic).toHaveAttribute('aria-hidden', 'true');
    expect(graphic).toHaveAttribute('focusable', 'false');
  });
  expect(container.querySelector('a')).toBeNull();
  act(() => root.unmount());
});

it('keeps an ineligible result factual and does not show a deposit confirmation', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<ComputerRewardNotice reward={{status: 'not_eligible', amount: 0, currency: 'TNB'}} />));
  expect(container).toHaveTextContent('This result did not qualify for a computer-win reward.');
  expect(container).not.toHaveTextContent('Payment confirmed');
  expect(container).not.toHaveTextContent('Paid to your wallet');
  expect(container.querySelector('svg')).toBeNull();
  act(() => root.unmount());
});

it('keeps embedded reward notices factual and preserves paid rewards', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(<ComputerRewardNotice reward={{status: 'not_eligible', amount: 0, currency: 'TNB'}} subdued />),
  );
  expect(container).toHaveTextContent('No reward this round');
  expect(container).toHaveTextContent('This result did not qualify for a computer-win reward.');
  expect(container).not.toHaveTextContent('Payment confirmed');
  act(() => root.render(<ComputerRewardNotice reward={{status: 'paid', amount: 10, currency: 'TNB'}} subdued />));
  expect(container).toHaveTextContent('Payment confirmed');
  expect(container).toHaveTextContent('+10 TNB game reward');
  expect(container).not.toHaveTextContent('No reward this round');
  act(() => root.unmount());
});

it('offers a guest future rewards when the fund is empty without claiming this game earned coins', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerRewardNotice guest reward={{status: 'fund_empty', amount: 0, currency: 'TNB'}} />
      </MemoryRouter>,
    ),
  );
  expect(container).toHaveTextContent('No reward was available when this match ended.');
  expect(container.querySelector('a')).toHaveTextContent('Create an account for future rewards');
  expect(container).not.toHaveTextContent('Payment confirmed');
  expect(container).not.toHaveTextContent('Paid to your wallet');
  act(() => root.unmount());
});

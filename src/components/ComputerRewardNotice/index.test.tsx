import {act} from 'react';
import {createRoot} from 'react-dom/client';

import ComputerRewardNotice from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

it('distinguishes a paid award from a fund that could not pay at completion', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() => root.render(<ComputerRewardNotice reward={{status: 'paid', amount: 10, currency: 'TNB'}} />));
  expect(container).toHaveTextContent('+10 TNB game reward');
  act(() => root.render(<ComputerRewardNotice reward={{status: 'fund_empty', amount: 0, currency: 'TNB'}} />));
  expect(container).toHaveTextContent('No reward was available when this match ended');
  expect(container).not.toHaveTextContent('+10');
  act(() => root.render(<ComputerRewardNotice reward={null} />));
  expect(container.textContent).toBe('');
  act(() => root.unmount());
});

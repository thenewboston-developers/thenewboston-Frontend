import {casinoErrorMessage} from './casino';

const failure = (data: unknown, status = 400) => ({response: {data, status}});

describe('casinoErrorMessage', () => {
  it('reads the reason the casino gave', () => {
    expect(
      casinoErrorMessage(failure({code: 'bet_limit', detail: 'The wager is over the table limit.'}), 'Fallback'),
    ).toBe('The wager is over the table limit.');
    expect(casinoErrorMessage(failure({message: 'Finish the existing casino game first.'}), 'Fallback')).toBe(
      'Finish the existing casino game first.',
    );
    expect(casinoErrorMessage(failure({amount: ['Enter an even amount.'], code: 'invalid'}), 'Fallback')).toBe(
      'Enter an even amount.',
    );
  });

  it('never shows a page of HTML from a failing server or gateway', () => {
    expect(
      casinoErrorMessage(failure('<!DOCTYPE html><html><body>Server Error (500)</body></html>', 500), 'Fallback'),
    ).toBe('Fallback');
    expect(casinoErrorMessage(failure(['unexpected'], 502), 'Fallback')).toBe('Fallback');
  });

  it('falls back when there is no response at all', () => {
    expect(casinoErrorMessage(new Error('Network Error'), 'Fallback')).toBe('Fallback');
    expect(casinoErrorMessage(failure({code: 'unknown'}), 'Fallback')).toBe('Fallback');
  });
});

import {getWinningLineLinks, isInWinningLine} from './utils';

const linked = (ranks: number[]) =>
  getWinningLineLinks(ranks).map(({above, below}) => `${above ? '|' : ' '}${below ? '|' : ' '}`);

it('joins the top five ranks of a page into one line', () => {
  expect(linked([1, 2, 3, 4, 5, 6, 7])).toEqual([' |', '||', '||', '||', '| ', '  ', '  ']);
});

it('keeps the line unbroken through ranks that share a place', () => {
  expect(linked([1, 1, 3, 3, 5, 5, 7])).toEqual([' |', '||', '||', '||', '||', '| ', '  ']);
});

it('draws no line for a lone top rank or for later pages', () => {
  expect(linked([1])).toEqual(['  ']);
  expect(linked([26, 27, 28])).toEqual(['  ', '  ', '  ']);
  expect(linked([])).toEqual([]);
});

it('only counts the first five ranks', () => {
  expect([0, 1, 5, 6].map(isInWinningLine)).toEqual([false, true, true, false]);
});

import {ballPosition, CENTER, MULTIPLIERS, pathPoints, POCKET_WEIGHTS, POCKET_Y, SPACING} from './utils';

it('lands every possible twelve-step path above its recorded pocket', () => {
  for (let draw = 0; draw < 4096; draw += 1) {
    const path = Array.from({length: 12}, (_, index) => Math.floor(draw / 2 ** (11 - index)) % 2);
    const slot = path.reduce((sum, direction) => sum + direction, 0);
    const points = pathPoints(path);
    expect(ballPosition(points, 1)).toEqual({x: CENTER + (slot - 6) * SPACING, y: POCKET_Y - 9});
    expect(ballPosition(points, 0)).toEqual(points[0]);
  }
});

it('discloses the exact binomial probabilities and expected whole-TNB payout', () => {
  expect(POCKET_WEIGHTS.reduce((sum, weight) => sum + weight, 0)).toBe(4096);
  expect(MULTIPLIERS.reduce((sum, multiplier, slot) => sum + multiplier * POCKET_WEIGHTS[slot], 0)).toBe(3898);
});

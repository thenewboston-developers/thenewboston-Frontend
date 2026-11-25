import {POCKET_ANGLE, POCKET_COUNT} from '../utils';

import {
  DROP_START,
  getBallRadius,
  getProgress,
  getRelativeAngle,
  getRelativeSpeed,
  planFlight,
  POCKET_RADIUS,
  TRACK_RADIUS,
} from './motion';

const modulo = (value: number, base: number) => ((value % base) + base) % base;

it('brings the ball to rest in the center of the winning pocket, wherever the rotor is', () => {
  for (let pocket = 0; pocket < POCKET_COUNT; pocket += 1) {
    [0, 37.5, 181.2, 359.9].forEach((rotorAngle) => {
      const flight = planFlight(pocket, rotorAngle, 6400, 1000);
      const offset = modulo(getRelativeAngle(flight, 1) - pocket * POCKET_ANGLE, 360);
      expect(Math.min(offset, 360 - offset)).toBeLessThan(1e-6);
    });
  }
});

it('sends the ball against the rotor for several turns, more for a longer spin', () => {
  const quick = planFlight(5, 20, 2800, 0);
  const full = planFlight(5, 20, 6400, 0);
  expect(quick.delta).toBeLessThanOrEqual(-720);
  expect(full.delta).toBeLessThan(quick.delta);
});

it('slows the ball all the way to a stop relative to the rotor', () => {
  const flight = planFlight(12, 90, 6400, 0);
  const speeds = [0, 0.25, 0.5, 0.75, 1].map((progress) => getRelativeSpeed(flight, progress));
  speeds.slice(1).forEach((speed, index) => expect(speed).toBeLessThan(speeds[index]));
  expect(speeds[4]).toBe(0);
});

it('keeps the ball on the track, drops it once, and settles it on the pocket floor', () => {
  const flight = planFlight(30, 300, 6400, 0);
  for (let step = 0; step <= 200; step += 1) {
    const progress = step / 200;
    const radius = getBallRadius(progress, getRelativeAngle(flight, progress));
    expect(radius).toBeLessThanOrEqual(TRACK_RADIUS);
    expect(radius).toBeGreaterThanOrEqual(progress <= DROP_START ? TRACK_RADIUS : POCKET_RADIUS - 1e-9);
  }
  expect(getBallRadius(1, getRelativeAngle(flight, 1))).toBeCloseTo(POCKET_RADIUS, 6);
});

it('measures progress from the start of the throw and never past its end', () => {
  const flight = planFlight(1, 0, 4000, 500);
  expect(getProgress(flight, 100)).toBe(0);
  expect(getProgress(flight, 2500)).toBe(0.5);
  expect(getProgress(flight, 99999)).toBe(1);
});

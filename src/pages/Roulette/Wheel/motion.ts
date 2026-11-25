import {POCKET_ANGLE} from '../utils';

// All radii are in the wheel's own 400-unit drawing space, measured from its center.
export const BALL_RADIUS = 6.6;
export const POCKET_RADIUS = 107;
export const TRACK_RADIUS = 169;

// Fractions of a throw: the ball leaves the track, rattles down the slope, then hops the last few frets
export const DROP_START = 0.5;
export const DROP_END = 0.74;

export const IDLE_SPEED = 9;
export const SPIN_SPEED = 135;

const EASE = 3;
const HOP_HEIGHT = 6;
const LAUNCH_ANGLE = 318;

export interface Flight {
  delta: number;
  duration: number;
  start: number;
  startAngle: number;
}

const bounceOut = (value: number): number => {
  const strength = 7.5625;
  const span = 2.75;
  if (value < 1 / span) return strength * value * value;
  if (value < 2 / span) return strength * (value - 1.5 / span) ** 2 + 0.75;
  if (value < 2.5 / span) return strength * (value - 2.25 / span) ** 2 + 0.9375;
  return strength * (value - 2.625 / span) ** 2 + 0.984375;
};

const modulo = (value: number, base: number) => ((value % base) + base) % base;

/**
 * The ball is animated in the rotor's own frame of reference: its angle relative to the spinning numbers eases from
 * where it is thrown to the center of the winning pocket. Whatever the rotor does meanwhile, the ball therefore comes
 * to rest in exactly that pocket, and as its relative speed fades it is carried along by the rotor like a real ball.
 */
export const planFlight = (pocketIndex: number, rotorAngle: number, duration: number, start: number): Flight => {
  const startAngle = LAUNCH_ANGLE - rotorAngle;
  const turns = Math.max(2, Math.round(duration / 1100));
  // Counterclockwise, against the rotor
  const delta = -(turns * 360 + modulo(startAngle - pocketIndex * POCKET_ANGLE, 360));
  return {delta, duration, start, startAngle};
};

export const getProgress = (flight: Flight, now: number): number =>
  Math.max(0, Math.min(1, (now - flight.start) / flight.duration));

// Degrees clockwise from the rotor's zero pocket
export const getRelativeAngle = (flight: Flight, progress: number): number =>
  flight.startAngle + flight.delta * (1 - (1 - progress) ** EASE);

// Degrees per second relative to the rotor, always positive
export const getRelativeSpeed = (flight: Flight, progress: number): number =>
  (Math.abs(flight.delta) * EASE * (1 - progress) ** (EASE - 1)) / (flight.duration / 1000);

export const getBallRadius = (progress: number, relativeAngle: number): number => {
  if (progress <= DROP_START) return TRACK_RADIUS;
  if (progress < DROP_END) {
    const fall = bounceOut((progress - DROP_START) / (DROP_END - DROP_START));
    return TRACK_RADIUS - (TRACK_RADIUS - POCKET_RADIUS) * fall;
  }
  // Hop over each remaining fret, lower every time, and settle on the pocket floor
  const settle = (progress - DROP_END) / (1 - DROP_END);
  const hop = Math.min(1, settle / 0.12) * (1 - settle) ** 2;
  return POCKET_RADIUS + HOP_HEIGHT * hop * Math.abs(Math.sin((Math.PI * relativeAngle) / POCKET_ANGLE));
};

// Which fret gap the ball is over: changes each time it crosses into the next pocket
export const getPocketSlot = (relativeAngle: number): number => Math.round(relativeAngle / POCKET_ANGLE);

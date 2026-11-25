import {forwardRef, memo, useEffect, useImperativeHandle, useRef} from 'react';

import {prefersReducedMotion} from '../hooks';
import {getPocketColor, getPocketIndex, POCKET_ANGLE, WHEEL_ORDER} from '../utils';

import {
  BALL_RADIUS,
  DROP_START,
  Flight,
  getBallRadius,
  getPocketSlot,
  getProgress,
  getRelativeAngle,
  getRelativeSpeed,
  IDLE_SPEED,
  planFlight,
  POCKET_RADIUS,
  SPIN_SPEED,
  TRACK_RADIUS,
} from './motion';
import * as S from './Styles';

export interface WheelHandle {
  // Puts the ball in a pocket without a spin
  rest(number: number): void;
  // Lets the rotor coast back to its idle turn
  spinDown(): void;
  // Brings the rotor up to speed
  spinUp(): void;
  // Throws the ball; resolves when it has come to rest in the pocket of `number`
  throwBall(number: number, duration: number): Promise<void>;
}

interface WheelProps {
  // The ball clicked over a fret; strength runs from 0 to 1
  onFret?(strength: number): void;
  // How loudly the ball is running around the track, 0 to 1, reported every frame of a throw
  onRoll?(level: number): void;
  winning: number | null;
}

interface Motion {
  angle: number;
  ballIndex: number;
  flight: Flight | null;
  landingIndex: number;
  last: number;
  resolve: (() => void) | null;
  response: number;
  slot: number | null;
  speed: number;
  target: number;
}

const CENTER = 200;
const DIAMONDS = Array.from({length: 8}, (_, index) => index);
const FILLS = {black: '#1a1e22', green: '#17935a', red: '#c22c3c'};
const POCKET_FILLS = {black: '#0d1012', green: '#0e6a40', red: '#8c1b29'};
const SPOKES = [45, 135, 225, 315];
const TRAIL = [
  {length: 1, opacity: 0.07, width: 9},
  {length: 0.62, opacity: 0.1, width: 8},
  {length: 0.3, opacity: 0.16, width: 6.6},
];
const TRAIL_CIRCUMFERENCE = 2 * Math.PI * TRACK_RADIUS;

// The rotor keeps turning lazily between spins, unless the player has asked for less motion
const getIdleSpeed = () => (prefersReducedMotion() ? 0 : IDLE_SPEED);

const round = (value: number) => Math.round(value * 100) / 100;

// A point on the wheel: degrees run clockwise from the top
const polar = (radius: number, degrees: number): [number, number] => {
  const radians = ((degrees - 90) * Math.PI) / 180;
  return [round(CENTER + radius * Math.cos(radians)), round(CENTER + radius * Math.sin(radians))];
};

const wedge = (inner: number, outer: number, start: number, end: number): string => {
  const [x1, y1] = polar(outer, start);
  const [x2, y2] = polar(outer, end);
  const [x3, y3] = polar(inner, end);
  const [x4, y4] = polar(inner, start);
  return `M${x1} ${y1}A${outer} ${outer} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${inner} ${inner} 0 0 0 ${x4} ${y4}Z`;
};

const Bowl = memo(() => (
  <S.Bowl aria-hidden="true" viewBox="0 0 400 400">
    <defs>
      <radialGradient cx="200" cy="200" gradientUnits="userSpaceOnUse" id="roulette-bowl" r="200">
        <stop offset="0.755" stopColor="#1d0e07" />
        <stop offset="0.79" stopColor="#4f2b19" />
        <stop offset="0.85" stopColor="#7d4c30" />
        <stop offset="0.893" stopColor="#8f5a3a" />
        <stop offset="0.905" stopColor="#3a1e11" />
        <stop offset="0.912" stopColor="#190b05" />
        <stop offset="0.922" stopColor="#7a4a2e" />
        <stop offset="0.952" stopColor="#a36a44" />
        <stop offset="0.982" stopColor="#613720" />
        <stop offset="1" stopColor="#1d0e07" />
      </radialGradient>
      <linearGradient id="roulette-diamond" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fff4c8" />
        <stop offset="0.5" stopColor="#d2aa55" />
        <stop offset="1" stopColor="#7d5a22" />
      </linearGradient>
      <filter height="100%" id="roulette-grain" width="100%" x="0" y="0">
        <feTurbulence baseFrequency="0.006 0.1" numOctaves="4" seed="11" type="fractalNoise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 -1.7 1" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
    <circle cx={CENTER} cy={CENTER} fill="url(#roulette-bowl)" r="199.5" />
    <circle cx={CENTER} cy={CENTER} filter="url(#roulette-grain)" opacity="0.55" r="199.5" />
    <circle cx={CENTER} cy={CENTER} fill="none" r="199" stroke="#120703" strokeWidth="1.6" />
    <circle cx={CENTER} cy={CENTER} fill="none" opacity="0.9" r="190.5" stroke="#d9b25f" strokeWidth="1.5" />
    <circle cx={CENTER} cy={CENTER} fill="none" opacity="0.35" r="192" stroke="#1a0c05" strokeWidth="1" />
    {DIAMONDS.map((index) => {
      const points = index % 2 ? '-10.5,0 0,-4 10.5,0 0,4' : '0,-10.5 4,0 0,10.5 -4,0';
      return (
        <g key={index} transform={`rotate(${index * 45 + 22.5} ${CENTER} ${CENTER}) translate(${CENTER} 35.5)`}>
          <polygon fill="#000000" opacity="0.45" points={points} transform="translate(1.2 1.8)" />
          <polygon fill="url(#roulette-diamond)" points={points} stroke="#6b4c1b" strokeWidth="0.6" />
          <polygon fill="#fffbe6" opacity="0.55" points={index % 2 ? '-8,0 0,-2.6 0,0' : '0,-8 2.6,0 0,0'} />
        </g>
      );
    })}
    <circle cx={CENTER} cy={CENTER} fill="none" opacity="0.5" r="154.5" stroke="#000000" strokeWidth="6" />
    <circle cx={CENTER} cy={CENTER} fill="#0b0603" r="152" />
  </S.Bowl>
));

const Rotor = memo(() => (
  <svg aria-hidden="true" viewBox="0 0 400 400">
    <defs>
      <radialGradient cx="200" cy="200" gradientUnits="userSpaceOnUse" id="roulette-cone" r="93">
        <stop offset="0" stopColor="#fdeeb9" />
        <stop offset="0.28" stopColor="#e8c873" />
        <stop offset="0.62" stopColor="#c99d48" />
        <stop offset="0.86" stopColor="#a47a32" />
        <stop offset="1" stopColor="#765420" />
      </radialGradient>
      <radialGradient cx="0.36" cy="0.3" id="roulette-knob" r="0.75">
        <stop offset="0" stopColor="#fff7d6" />
        <stop offset="0.45" stopColor="#dcb65f" />
        <stop offset="1" stopColor="#80591f" />
      </radialGradient>
      <radialGradient cx="200" cy="200" gradientUnits="userSpaceOnUse" id="roulette-pocket-shade" r="122">
        <stop offset="0.76" stopColor="#000000" stopOpacity="0.05" />
        <stop offset="0.9" stopColor="#000000" stopOpacity="0.22" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.62" />
      </radialGradient>
      <radialGradient cx="200" cy="200" gradientUnits="userSpaceOnUse" id="roulette-ring-shade" r="150">
        <stop offset="0.81" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="0.9" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    {WHEEL_ORDER.map((number, index) => {
      const color = getPocketColor(number);
      const start = (index - 0.5) * POCKET_ANGLE;
      const end = (index + 0.5) * POCKET_ANGLE;
      return (
        <g key={number}>
          <path d={wedge(121, 150.5, start, end)} fill={FILLS[color]} />
          <path d={wedge(92, 122, start, end)} fill={POCKET_FILLS[color]} />
        </g>
      );
    })}
    <path d={`${wedge(92, 122, 0, 180)}${wedge(92, 122, 180, 360)}`} fill="url(#roulette-pocket-shade)" />
    <path d={`${wedge(122, 150, 0, 180)}${wedge(122, 150, 180, 360)}`} fill="url(#roulette-ring-shade)" />
    {WHEEL_ORDER.map((number, index) => {
      const angle = (index + 0.5) * POCKET_ANGLE;
      const [x1, y1] = polar(92, angle);
      const [x2, y2] = polar(122, angle);
      const [x3, y3] = polar(150, angle);
      return (
        <g key={number}>
          <line stroke="#e8c873" strokeLinecap="round" strokeWidth="1.7" x1={x1} x2={x2} y1={y1} y2={y2} />
          <line opacity="0.55" stroke="#d9b25f" strokeWidth="0.8" x1={x2} x2={x3} y1={y2} y2={y3} />
        </g>
      );
    })}
    {WHEEL_ORDER.map((number, index) => (
      <text
        fill="#f6f0df"
        fontSize="13.5"
        fontWeight="700"
        key={number}
        textAnchor="middle"
        transform={`rotate(${round(index * POCKET_ANGLE)} ${CENTER} ${CENTER})`}
        x={CENTER}
        y={CENTER - 131.5}
      >
        {number}
      </text>
    ))}
    <circle cx={CENTER} cy={CENTER} fill="none" r="150" stroke="#d9b25f" strokeWidth="2.4" />
    <circle cx={CENTER} cy={CENTER} fill="none" r="122" stroke="#d9b25f" strokeWidth="1.5" />
    <circle cx={CENTER} cy={CENTER} fill="url(#roulette-cone)" r="92.5" stroke="#f0d589" strokeWidth="1.6" />
    {[78, 62, 44].map((radius) => (
      <g key={radius}>
        <circle cx={CENTER} cy={CENTER} fill="none" opacity="0.26" r={radius} stroke="#5b3d10" strokeWidth="0.9" />
        <circle cx={CENTER} cy={CENTER} fill="none" opacity="0.2" r={radius - 1.1} stroke="#fff8dc" strokeWidth="0.7" />
      </g>
    ))}
    {SPOKES.map((angle) => {
      const [x1, y1] = polar(12, angle);
      const [x2, y2] = polar(57, angle);
      const [knobX, knobY] = polar(60, angle);
      return (
        <g key={angle}>
          <line
            opacity="0.28"
            stroke="#3b2608"
            strokeLinecap="round"
            strokeWidth="10"
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
          />
          <line stroke="#c79c47" strokeLinecap="round" strokeWidth="6.4" x1={x1} x2={x2} y1={y1} y2={y2} />
          <line
            opacity="0.75"
            stroke="#fbe9ad"
            strokeLinecap="round"
            strokeWidth="1.8"
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
          />
          <circle cx={knobX} cy={knobY} fill="url(#roulette-knob)" r="7.6" stroke="#6b4c1b" strokeWidth="0.6" />
        </g>
      );
    })}
    <circle cx={CENTER} cy={CENTER} fill="#3b2608" opacity="0.3" r="28" />
    <circle cx={CENTER} cy={CENTER} fill="url(#roulette-knob)" r="25" stroke="#6b4c1b" strokeWidth="0.8" />
    <circle cx={CENTER} cy={CENTER} fill="url(#roulette-knob)" r="15.5" stroke="#8a6427" strokeWidth="0.8" />
    <circle cx={CENTER} cy={CENTER} fill="url(#roulette-knob)" r="7.5" stroke="#8a6427" strokeWidth="0.6" />
  </svg>
));

/**
 * The wheel is drawn once and then only transformed: the rotor layer turns, an arm layer carries the ball around, and
 * the ball slides along that arm. A frame loop writes those transforms straight to the elements, so a spin never
 * re-renders React.
 */
const Wheel = forwardRef<WheelHandle, WheelProps>(({onFret, onRoll, winning}, ref) => {
  const arm = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLElement>(null);
  const callbacks = useRef({onFret, onRoll});
  const motion = useRef<Motion>({
    angle: 0,
    ballIndex: 0,
    flight: null,
    landingIndex: 0,
    last: 0,
    resolve: null,
    response: 1.5,
    slot: null,
    speed: getIdleSpeed(),
    target: getIdleSpeed(),
  });
  const rotor = useRef<HTMLDivElement>(null);
  const timers = useRef<{land?: ReturnType<typeof setTimeout>; pickup?: ReturnType<typeof setTimeout>}>({});
  const trail = useRef<SVGSVGElement>(null);
  callbacks.current = {onFret, onRoll};

  const finishFlight = () => {
    const state = motion.current;
    clearTimeout(timers.current.land);
    clearTimeout(timers.current.pickup);
    if (ball.current) ball.current.style.opacity = '1';
    if (state.flight || state.resolve) {
      state.ballIndex = state.landingIndex;
      state.response = 3.4;
      state.target = getIdleSpeed();
      callbacks.current.onRoll?.(0);
    }
    state.flight = null;
    const {resolve} = state;
    state.resolve = null;
    resolve?.();
  };

  useImperativeHandle(ref, () => ({
    rest: (number) => {
      finishFlight();
      motion.current.ballIndex = Math.max(0, getPocketIndex(number));
    },
    spinDown: () => {
      motion.current.response = 1.8;
      motion.current.target = getIdleSpeed();
    },
    spinUp: () => {
      motion.current.response = 0.5;
      motion.current.target = SPIN_SPEED;
    },
    throwBall: (number, duration) =>
      new Promise<void>((resolve) => {
        finishFlight();
        const state = motion.current;
        state.landingIndex = Math.max(0, getPocketIndex(number));
        state.resolve = resolve;
        // The croupier lifts the ball out of its pocket, then sends it around the track
        if (ball.current) ball.current.style.opacity = '0';
        timers.current.pickup = setTimeout(() => {
          state.flight = planFlight(state.landingIndex, state.angle, duration, performance.now());
          state.response = 2.8;
          state.slot = null;
          state.target = SPIN_SPEED * 0.6;
          if (ball.current) ball.current.style.opacity = '1';
          // A hidden tab pauses the frame loop; the result still has to arrive on time
          timers.current.land = setTimeout(finishFlight, duration + 80);
        }, 130);
      }),
  }));

  useEffect(() => {
    let request = 0;
    const step = (now: number) => {
      const state = motion.current;
      const elapsed = Math.min(0.05, (now - (state.last || now)) / 1000);
      state.last = now;
      state.speed += (state.target - state.speed) * (1 - Math.exp(-elapsed / state.response));
      state.angle = (state.angle + state.speed * elapsed) % 360;
      let radius = POCKET_RADIUS;
      let relativeAngle = state.ballIndex * POCKET_ANGLE;
      let trailStrength = 0;
      let trailLength = 0;
      if (state.flight) {
        const progress = getProgress(state.flight, now);
        relativeAngle = getRelativeAngle(state.flight, progress);
        radius = getBallRadius(progress, relativeAngle);
        const relativeSpeed = getRelativeSpeed(state.flight, progress);
        const trackSpeed = Math.max(0, relativeSpeed - state.speed);
        if (progress < DROP_START) {
          trailStrength = Math.max(0, Math.min(1, (trackSpeed - 200) / 500));
          trailLength = (trackSpeed * 0.045 * Math.PI * TRACK_RADIUS) / 180;
          callbacks.current.onRoll?.(Math.min(1, trackSpeed / 900));
        } else {
          callbacks.current.onRoll?.(0);
          const slot = getPocketSlot(relativeAngle);
          if (state.slot !== null && slot !== state.slot) {
            callbacks.current.onFret?.(Math.max(0, Math.min(1, relativeSpeed / 280)));
          }
          state.slot = slot;
        }
        if (progress >= 1) finishFlight();
      }
      const angle = state.angle + relativeAngle;
      // Percentages of the ball's own size, so the wheel can be any width
      const offset = (radius * 100) / (BALL_RADIUS * 2);
      if (rotor.current) rotor.current.style.transform = `rotate(${state.angle.toFixed(2)}deg)`;
      if (arm.current) arm.current.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      // Counter-rotating keeps the ball's highlight and shadow under the same lamp all the way around
      if (ball.current) {
        ball.current.style.transform = `translate(-50%, -50%) translateY(${(-offset).toFixed(1)}%) rotate(${(-angle).toFixed(2)}deg)`;
      }
      if (trail.current) {
        trail.current.style.opacity = trailStrength.toFixed(2);
        if (trailStrength > 0) {
          trail.current.style.transform = `rotate(${(angle - 90).toFixed(2)}deg)`;
          Array.from(trail.current.children).forEach((circle, index) => {
            (circle as SVGCircleElement).style.strokeDasharray =
              `${(trailLength * TRAIL[index].length).toFixed(1)} ${TRAIL_CIRCUMFERENCE.toFixed(1)}`;
          });
        }
      }
      request = requestAnimationFrame(step);
    };
    request = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(request);
      finishFlight();
    };
  }, []);

  const winningIndex = winning === null ? -1 : getPocketIndex(winning);

  return (
    <S.Wheel>
      <Bowl />
      <S.Rotor ref={rotor}>
        <Rotor />
        {winningIndex >= 0 && (
          <svg aria-hidden="true" viewBox="0 0 400 400">
            <S.WinningPocket
              d={wedge(93, 149.5, (winningIndex - 0.5) * POCKET_ANGLE, (winningIndex + 0.5) * POCKET_ANGLE)}
            />
          </svg>
        )}
      </S.Rotor>
      <S.Light />
      <S.Trail aria-hidden="true" ref={trail} style={{opacity: 0}} viewBox="0 0 400 400">
        {TRAIL.map(({opacity, width}) => (
          <circle cx={CENTER} cy={CENTER} key={width} opacity={opacity} r={TRACK_RADIUS} strokeWidth={width} />
        ))}
      </S.Trail>
      <S.Arm ref={arm}>
        <S.Ball
          ref={ball}
          style={{
            transform: `translate(-50%, -50%) translateY(-${((POCKET_RADIUS * 100) / (BALL_RADIUS * 2)).toFixed(1)}%)`,
          }}
        />
      </S.Arm>
    </S.Wheel>
  );
});

export default Wheel;

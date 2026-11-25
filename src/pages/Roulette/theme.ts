import {css} from 'styled-components';

// The roulette room: emerald felt, a walnut wheel, brass fittings and ivory lettering, taken from the game's artwork
export const room = {
  black: '#15191c',
  blackSoft: '#262c31',
  brass: '#d9b25f',
  brassDeep: '#9c7430',
  brassLight: '#f6e0a0',
  brassSoft: 'rgba(217, 178, 95, 0.16)',
  ember: '#ff8f7d',
  felt: '#0d4533',
  feltDeep: '#093326',
  green: '#17935a',
  greenDeep: '#0f6d42',
  ink: '#1c1405',
  ivory: '#f6f0df',
  line: 'rgba(246, 240, 223, 0.2)',
  lineStrong: 'rgba(246, 240, 223, 0.38)',
  mint: '#7fe3b0',
  mist: '#a9c4b6',
  night: '#051b14',
  nightSoft: '#082a1f',
  red: '#c9303f',
  redDeep: '#971f2d',
  rim: '#1c5a45',
  rimBright: '#2b7d61',
  walnut: '#4a2a1a',
};

export const roomMono = `'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace`;

// Small engraved-plate labels
export const plate = css`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

// A dark emerald panel with a soft overhead lamp and a brass hairline along its top edge
export const roomPanel = css`
  background:
    radial-gradient(120% 80% at 50% -10%, #1f7a5a2e, transparent 62%), linear-gradient(180deg, #0a3024, ${room.night});
  border: 1px solid ${room.rim};
  border-radius: 20px;
  box-shadow:
    0 18px 42px #051b1424,
    inset 0 1px 0 #ffffff0d;
  color: ${room.ivory};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      ${room.brass}99 22%,
      ${room.brassLight} 50%,
      ${room.brass}99 78%,
      transparent
    );
    content: '';
    height: 1px;
    left: 24px;
    opacity: 0.7;
    pointer-events: none;
    position: absolute;
    right: 24px;
    top: -1px;
  }
`;

// The site keeps controls reachable for keyboard players: one consistent brass focus ring on the dark panels
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${room.brassLight};
    outline-offset: 3px;
  }
`;

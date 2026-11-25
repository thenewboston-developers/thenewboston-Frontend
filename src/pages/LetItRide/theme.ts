import {css} from 'styled-components';

// The Let It Ride table: midnight-blue felt, gold lettering and ivory cards
export const table = {
  felt: '#17377c',
  feltBright: '#2250a8',
  feltDeep: '#0d2251',
  gold: '#e0b459',
  goldDeep: '#a57a2c',
  goldLight: '#f8e2a4',
  goldSoft: 'rgba(224, 180, 89, 0.16)',
  ink: '#1b1405',
  ivory: '#f7f2e4',
  line: 'rgba(247, 242, 228, 0.2)',
  lineStrong: 'rgba(247, 242, 228, 0.38)',
  loss: '#ffa193',
  mist: '#aebcdc',
  night: '#081430',
  nightSoft: '#0c1c42',
  red: '#c6323f',
  rim: '#27488f',
  rimBright: '#3d65bb',
  spade: '#17203a',
  win: '#7fe3b0',
};

export const tableMono = `'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace`;

// Small engraved-plate labels
export const plate = css`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

// A midnight panel with a soft overhead lamp and a gold hairline along its top edge
export const tablePanel = css`
  background:
    radial-gradient(120% 80% at 50% -10%, #2f5fc02e, transparent 62%),
    linear-gradient(180deg, ${table.nightSoft}, ${table.night});
  border: 1px solid ${table.rim};
  border-radius: 20px;
  box-shadow:
    0 18px 42px #08143024,
    inset 0 1px 0 #ffffff0d;
  color: ${table.ivory};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      ${table.gold}99 22%,
      ${table.goldLight} 50%,
      ${table.gold}99 78%,
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

// One consistent gold focus ring for keyboard players on the dark panels
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${table.goldLight};
    outline-offset: 3px;
  }
`;

import {css} from 'styled-components';

// The blackjack room: classic casino green felt inside a walnut and leather rail, gold print, ivory cards with red
// backs, and the hit, stand and double colors players know from other tables
export const room = {
  amber: '#f0b445',
  cardBack: '#bb2433',
  cardBackDeep: '#7f1321',
  cardFace: '#fdfcf7',
  cardInk: '#15171c',
  cardRed: '#d0202f',
  ember: '#ff9285',
  felt: '#0c6a45',
  feltBright: '#18905f',
  feltDeep: '#07442e',
  feltEdge: '#04281b',
  gold: '#e4bf62',
  goldDeep: '#a97b27',
  goldLight: '#f9e5a6',
  goldSoft: 'rgba(228, 191, 98, 0.14)',
  green: '#21ad66',
  greenDeep: '#11794b',
  ink: '#1b1404',
  ivory: '#f5f1e4',
  line: 'rgba(245, 241, 228, 0.13)',
  lineStrong: 'rgba(245, 241, 228, 0.3)',
  mint: '#83e6b3',
  mist: '#a8bcb2',
  night: '#08110e',
  nightRaised: '#15231e',
  nightSoft: '#0f1b17',
  red: '#dc3d47',
  redDeep: '#a3202d',
  rim: '#22372e',
  walnut: '#3b2517',
  walnutDeep: '#1c110a',
};

export const roomMono = `'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace`;

// The lettering printed on the felt and on the cards
export const roomSerif = `Georgia, 'Times New Roman', Times, serif`;

// Small engraved-plate labels
export const plate = css`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

// A dark panel under a soft overhead lamp, with a gold hairline along its top edge
export const roomPanel = css`
  background:
    radial-gradient(120% 80% at 50% -10%, #1f7a5a24, transparent 62%),
    linear-gradient(180deg, ${room.nightSoft}, ${room.night});
  border: 1px solid ${room.rim};
  border-radius: 20px;
  box-shadow:
    0 18px 42px #06120e24,
    inset 0 1px 0 #ffffff0d;
  color: ${room.ivory};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      ${room.gold}99 22%,
      ${room.goldLight} 50%,
      ${room.gold}99 78%,
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

// One consistent gold focus ring on the dark panels, for keyboard players
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${room.goldLight};
    outline-offset: 3px;
  }
`;

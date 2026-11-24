import styled, {css, keyframes} from 'styled-components';

const countArrival = keyframes`
  0% { transform: scale(1); }
  45% { transform: scale(1.18); }
  100% { transform: scale(1); }
`;

const stoneFlight = keyframes`
  0% { opacity: 0; transform: translate(var(--from-x), var(--from-y)) translate(-50%, -50%) scale(0.8); }
  12% { opacity: 1; }
  50% { opacity: 1; transform: translate(var(--arc-x), var(--arc-y)) translate(-50%, -50%) scale(1.2); }
  94% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--to-x), var(--to-y)) translate(-50%, -50%) scale(0.85); }
`;

const stoneLanding = keyframes`
  0%, 65% { opacity: 0; transform: translate(-50%, -100%) scale(0.65); }
  85% { opacity: 1; transform: translate(-50%, -45%) scale(1.08, 0.92); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const hollow = css`
  background: radial-gradient(ellipse at 50% 70%, #513b28 0%, #332519 63%, #241a13 100%);
  border: 1px solid #d6ae7440;
  box-shadow:
    inset 0 6px 12px #110c0aa6,
    inset 0 -2px 3px #e7c38a26,
    0 1px 0 #fce0a73b;
`;

export const Board = styled.div`
  background:
    repeating-linear-gradient(4deg, transparent 0 7px, #deb27f08 8px, transparent 9px 16px),
    linear-gradient(155deg, #a27b50, #785637 48%, #8a6642 100%);
  border: 1px solid #e2bd814f;
  border-radius: clamp(22px, 4vw, 44px);
  box-shadow:
    inset 0 2px 1px #ffe0aa66,
    inset 0 -5px 2px #34241666,
    0 8px 0 #131f1c,
    0 18px 26px #00000040;
  display: grid;
  gap: clamp(6px, 1.2vw, 14px);
  grid-template-columns: minmax(0, 1fr) minmax(0, 6.9fr) minmax(0, 1fr);
  padding: clamp(10px, 1.8vw, 23px);
  position: relative;
  user-select: none;
`;

export const Clock = styled.span`
  color: #d6e3de;
  font-size: clamp(12px, 1.6vw, 17px);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  letter-spacing: 0.035em;
  margin-left: auto;
  white-space: nowrap;
`;

export const Count = styled.span<{$changed: boolean}>`
  background: #33251957;
  border: 1px solid #edcc9730;
  border-radius: 999px;
  color: #fff1d3;
  display: inline-grid;
  font-size: clamp(11px, 1.6vw, 16px);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1;
  min-width: 24px;
  padding: 4px 7px;
  place-items: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$changed}) => ($changed ? countArrival : 'none')} 300ms ease-out;
  }

  @media (max-width: 480px) {
    min-width: 20px;
    padding: 3px 5px;
  }
`;

export const DirectionLane = styled.div`
  align-items: center;
  color: #f4d9af6b;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  min-height: 22px;

  > span:first-child,
  > span:last-child {
    flex: 1;
    font-size: 17px;
    line-height: 1;
  }

  > span:last-child {
    text-align: right;
  }
`;

export const EmptyPit = styled.span`
  background: #d1b28c30;
  border-radius: 50%;
  height: 4px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
`;

export const FlyingStone = styled.span`
  animation: ${stoneFlight} 240ms cubic-bezier(0.35, 0, 0.55, 1) both;
  aspect-ratio: 1;
  background:
    radial-gradient(circle at 30% 24%, #f1fff5 0%, #e1fff280 12%, transparent 35%),
    radial-gradient(circle at 65% 80%, #125d4e, transparent 70%), #80dec0;
  border: 1px solid #d5ffec80;
  border-radius: 47% 53% 49% 51%;
  box-shadow:
    0 3px 7px #00000070,
    0 0 8px #adf5d43b;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 5;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Hollow = styled.span<{$marked: boolean; $playable: boolean; $source: boolean}>`
  ${hollow};
  aspect-ratio: 1;
  border-radius: 50%;
  display: block;
  outline: ${({$source}) => ($source ? '1px dashed #f5d6a0b3' : '1px solid transparent')};
  outline-offset: 3px;
  position: relative;
  transition:
    box-shadow 160ms,
    outline-color 160ms;
  width: 100%;

  ${({$playable}) =>
    $playable &&
    css`
      border-color: #a2ead2c2;
      box-shadow:
        inset 0 6px 12px #110c0aa6,
        inset 0 -3px 6px #b2f0d52b,
        0 0 0 1px #a2ead259,
        0 0 14px #92e9c41a;
    `}

  ${({$marked}) =>
    $marked &&
    css`
      border-color: #ffe2a3;
      box-shadow:
        inset 0 6px 12px #110c0aa6,
        0 0 0 2px #f0d49bb3,
        0 0 18px #f4c7793d;
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MovementLabel = styled.span<{$moving: boolean}>`
  color: ${({$moving}) => ($moving ? '#fff4d9' : '#e9cda375')};
  font-size: clamp(8px, 1.15vw, 11px);
  font-weight: 700;
  letter-spacing: ${({$moving}) => ($moving ? '0.03em' : '0.24em')};
  line-height: 1.2;
  text-align: center;
`;

const pit = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(7px, 1.2vw, 12px);
  min-width: 0;
`;

export const Pit = styled.div`
  ${pit};
`;

export const PitButton = styled.button`
  ${pit};
  background: none;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  font: inherit;
  padding: 0;
  touch-action: manipulation;

  &:disabled {
    cursor: default;
  }

  &[aria-busy='true'] {
    opacity: 0.65;
  }

  &:focus-visible {
    outline: 3px solid #c3ffe8;
    outline-offset: 4px;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) ${Hollow} {
      border-color: #c5ffe8;
      box-shadow:
        inset 0 6px 12px #110c0aa6,
        0 0 0 3px #a5efd18c,
        0 0 20px #a5efd140;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 160ms;

    &:active:not(:disabled) {
      transform: translateY(2px);
    }
  }
`;

export const PlayerAvatar = styled.span`
  align-items: center;
  background: linear-gradient(145deg, #b9d8bd, #528979);
  border: 1px solid #c5e5d54d;
  border-radius: 12px;
  color: #123f32;
  display: flex;
  flex: 0 0 36px;
  font-size: 16px;
  font-weight: 800;
  height: 36px;
  justify-content: center;

  @media (max-width: 480px) {
    border-radius: 9px;
    flex-basis: 28px;
    font-size: 13px;
    height: 28px;
  }
`;

export const PlayerIdentity = styled.div`
  min-width: 0;
`;

export const PlayerMeta = styled.span`
  color: #9bb8ad;
  display: block;
  font-size: 10px;
  letter-spacing: 0.025em;
  margin-top: 3px;
`;

export const PlayerName = styled.strong`
  color: #f4f6ed;
  display: block;
  font-size: clamp(12px, 1.5vw, 15px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PlayerRail = styled.div<{$active: boolean}>`
  align-items: center;
  border-left: 2px solid ${({$active}) => ($active ? '#a5e6c5' : '#ffffff14')};
  display: flex;
  gap: 12px;
  margin: 0 4px;
  padding: 1px 0 1px 12px;

  @media (max-width: 480px) {
    gap: 8px;
    margin: 0;
    padding-left: 8px;
  }
`;

export const RailScore = styled.strong`
  color: #f5ddb1;
  display: grid;
  font-size: clamp(20px, 2.4vw, 27px);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  margin-left: auto;
  min-width: 42px;
  text-align: right;

  small {
    color: #9bb8ad;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.04em;
    margin-top: 4px;
  }
`;

export const Row = styled.div`
  display: grid;
  gap: clamp(5px, 1vw, 12px);
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

export const Rows = styled.div`
  display: grid;
  gap: 4px;
  grid-template-rows: 1fr auto 1fr;
`;

export const Stone = styled.span<{$color: string; $landing: number; $store: boolean}>`
  aspect-ratio: 1;
  background:
    radial-gradient(circle at 32% 25%, #ffffffe6 0 4%, #ffffff3d 13%, transparent 40%),
    radial-gradient(circle at 65% 78%, #142e2470, transparent 66%), ${({$color}) => $color};
  border: 1px solid #ffffff35;
  border-radius: 46% 54% 49% 51%;
  box-shadow:
    inset 0 -2px 2px #163b3a33,
    1px 3px 3px #100c0b8c;
  position: absolute;
  transform: translate(-50%, -50%);
  width: ${({$store}) => ($store ? '24%' : '22%')};

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$landing}) => ($landing ? stoneLanding : 'none')} ${({$landing}) => $landing}ms ease-out both;
  }
`;

export const Store = styled.div<{$marked: boolean; $near: boolean}>`
  ${hollow};
  border-color: ${({$near}) => ($near ? '#a6e2c65c' : '#e2c39140')};
  border-radius: 999px;
  min-width: 0;
  position: relative;

  ${({$marked}) =>
    $marked &&
    css`
      border-color: #ffe2a3;
      box-shadow:
        inset 0 6px 12px #110c0aa6,
        0 0 0 2px #f0d49bb3,
        0 0 22px #f4c7794d;
    `}
`;

export const StoreCount = styled.span<{$changed: boolean}>`
  color: #fff1d3;
  font-size: clamp(18px, 3vw, 32px);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  left: 0;
  line-height: 1;
  position: absolute;
  right: 0;
  text-align: center;
  top: 9%;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${({$changed}) => ($changed ? countArrival : 'none')} 380ms ease-out;
  }
`;

export const StoreLabel = styled.span`
  color: #d4b994;
  font-size: clamp(6px, 0.8vw, 8px);
  left: 0;
  letter-spacing: 0.1em;
  position: absolute;
  right: 0;
  text-align: center;
  top: 24%;
`;

export const Table = styled.div`
  background: radial-gradient(ellipse at 15% 0, #53877724, transparent 60%), linear-gradient(135deg, #163a34, #102924);
  border: 1px solid #c9b98b33;
  border-radius: 24px;
  box-shadow:
    0 16px 36px #18352d1f,
    inset 0 1px 0 #ffffff12;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
  padding: clamp(14px, 2.3vw, 28px);

  @media (max-width: 480px) {
    border-radius: 18px;
    gap: 18px;
    padding: 12px 8px;
  }
`;

export const TableHint = styled.p`
  color: #a8c7b9;
  font-size: 11px;
  line-height: 1.5;
  margin: -8px 0 0;
  text-align: center;
`;

export const TurnPill = styled.span`
  background: #9ee1c31a;
  border: 1px solid #a5e6c529;
  border-radius: 999px;
  color: #b2e9d1;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 5px 9px;

  @media (max-width: 480px) {
    font-size: 9px;
    padding: 4px 6px;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;

import styled, {keyframes} from 'styled-components';

const crestArrival = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const sparkleArrival = keyframes`
  0%, 100% { opacity: 0.45; }
  45% { opacity: 1; }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 6px;

  > a,
  > button {
    align-items: center;
    background: #ffffff06;
    border: 1px solid #ffffff20;
    border-radius: 12px;
    color: #d7e3f6;
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    gap: 18px;
    justify-content: center;
    line-height: 1.4;
    min-height: 50px;
    padding: 14px 22px;
    text-decoration: none;
    transition:
      background 160ms ease,
      transform 160ms ease;

    &:first-child {
      background: linear-gradient(120deg, #ffe7ae, #f5cc79);
      border-color: #ffe8b3;
      box-shadow:
        0 3px 0 #a87b36,
        0 6px 24px #ffc9681a,
        inset 0 1px 0 #fff5d1;
      color: #253046;
    }

    &:first-child::after {
      border-right: 2px solid currentColor;
      border-top: 2px solid currentColor;
      content: '';
      height: 6px;
      transform: rotate(45deg);
      width: 6px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    &:focus-visible {
      outline: 3px solid #a7d5ff;
      outline-offset: 4px;
    }

    &:hover:not(:disabled) {
      filter: brightness(1.08);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      &:hover:not(:disabled),
      &:active:not(:disabled) {
        transform: none;
      }
    }
  }

  @container (max-width: 480px) {
    > a,
    > button {
      flex: 1 1 auto;
    }
  }
`;

export const Artwork = styled.div`
  align-self: center;
  animation: ${crestArrival} 650ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  flex: 0 0 270px;
  margin: -22px -10px -22px 0;
  pointer-events: none;
  width: 270px;

  svg {
    display: block;
    overflow: visible;
    width: 100%;
  }

  .result-sparkle {
    animation: ${sparkleArrival} 1.4s ease-in-out 2;
  }

  @container (max-width: 700px) {
    flex-basis: 190px;
    width: 190px;
  }

  @container (max-width: 480px) {
    flex-basis: auto;
    margin: -16px 0 -4px;
    order: -1;
    width: 180px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    .result-sparkle {
      animation: none;
    }
  }
`;

export const Content = styled.div`
  border-top: 1px solid #ffffff0d;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding-top: 22px;
  position: relative;

  > p,
  > small {
    color: inherit;
    margin: 0;
  }
`;

export const Description = styled.div`
  color: #b3c3da;
  font-size: 15px;
  line-height: 1.7;
  margin-top: 12px;

  p {
    color: inherit;
    margin: 0;
  }
`;

export const Eyebrow = styled.div`
  align-items: center;
  color: #ffe0a0;
  display: flex;
  flex-wrap: wrap;
  font-size: 10px;
  font-weight: 700;
  gap: 12px;
  letter-spacing: 0.16em;
  line-height: 1.5;
  margin-bottom: 18px;
  text-transform: uppercase;

  span {
    color: #b0c2dd;
  }

  strong {
    align-items: center;
    background: #ffffff08;
    border: 1px solid #ffffff21;
    border-radius: 100px;
    color: #ffdda0;
    display: inline-flex;
    font-size: 9px;
    gap: 6px;
    letter-spacing: 0.09em;
    padding: 6px 10px;
  }

  strong::before {
    background: currentColor;
    border-radius: 50%;
    content: '';
    height: 4px;
    width: 4px;
  }

  @container (max-width: 480px) {
    justify-content: center;
    margin-bottom: 12px;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 28px;
  min-height: 156px;
  position: relative;

  @container (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
    text-align: center;
  }
`;

export const HeadingGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Note = styled.p`
  color: #a9bad4;
  font-size: 12px;
  line-height: 1.7;
  margin: 0;
`;

export const Panel = styled.section<{$victory: boolean}>`
  background:
    radial-gradient(ellipse at 90% 0, ${({$victory}) => ($victory ? '#d6a64724' : '#708cf32b')}, transparent 48%),
    radial-gradient(ellipse at 0 70%, #2c8aaf18, transparent 55%),
    linear-gradient(120deg, #131f35, #17243d 65%, #1c2944);
  border: 1px solid ${({$victory}) => ($victory ? '#c7a75f65' : '#91abd137')};
  border-radius: 28px;
  box-shadow:
    0 20px 50px #101b301a,
    inset 0 1px 0 #ffffff0d;
  color: #f2f7ff;
  container-type: inline-size;
  isolation: isolate;
  margin: 24px 0;
  min-width: 0;
  overflow: hidden;
  padding: clamp(24px, 3vw, 36px);
  position: relative;

  &::before {
    background: linear-gradient(90deg, transparent, #a8c9ff8c, #f3d3938c, transparent);
    content: '';
    height: 1px;
    left: 8%;
    position: absolute;
    right: 8%;
    top: 0;
  }

  &::after {
    background-image:
      linear-gradient(#a6bde50a 1px, transparent 1px), linear-gradient(90deg, #a6bde50a 1px, transparent 1px);
    background-size: 32px 32px;
    content: '';
    height: 320px;
    mask-image: linear-gradient(90deg, transparent, #000000);
    pointer-events: none;
    position: absolute;
    right: -3%;
    top: -40px;
    transform: rotate(-12deg);
    width: 60%;
    z-index: -1;
  }

  @media (max-width: 640px) {
    border-radius: 22px;
    padding: 24px 18px;
  }
`;

export const PlayerMarker = styled.span`
  background: currentColor;
  border-radius: 4px;
  box-shadow: 0 0 12px currentColor;
  flex-shrink: 0;
  height: 8px;
  transform: rotate(-10deg);
  width: 8px;
`;

export const Scoreboard = styled.div`
  margin: 0 0 24px;
  position: relative;
`;

export const ScoreLabel = styled.p`
  align-items: center;
  color: #9bafcc;
  display: flex;
  font-size: 9px;
  font-weight: 700;
  gap: 14px;
  justify-content: center;
  letter-spacing: 0.18em;
  margin: 0 0 16px;
  text-transform: uppercase;

  &::after,
  &::before {
    background: #ffffff0f;
    content: '';
    flex: 1;
    height: 1px;
  }
`;

export const ScoreName = styled.div`
  align-items: center;
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 600;
  gap: 7px 9px;
  justify-content: center;
  line-height: 1.5;
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const ScorePlayer = styled.div<{$opponent: boolean; $winner: boolean}>`
  align-items: center;
  background: ${({$opponent, $winner}) =>
    $winner
      ? 'radial-gradient(ellipse at 50% 100%, #d7a54825, transparent 75%), #ffffff03'
      : `radial-gradient(ellipse at 50% 100%, ${$opponent ? '#e9897520' : '#60b8f925'}, transparent 75%), #ffffff03`};
  border: 1px solid
    ${({$opponent, $winner}) => {
      if ($winner) return '#e1bd6d50';
      return $opponent ? '#e7a29435' : '#80c6ef35';
    }};
  border-radius: 18px;
  box-shadow: inset 0 1px 0 #ffffff05;
  color: ${({$opponent, $winner}) => {
    if ($winner) return '#ffe1a0';
    return $opponent ? '#f5b4a5' : '#a6d9ff';
  }};
  display: grid;
  gap: 18px;
  grid-template-rows: minmax(20px, 1fr) auto;
  justify-items: center;
  min-width: 0;
  padding: 22px 30px 24px;
  position: relative;
  text-align: center;

  &::before {
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    content: '';
    height: 1px;
    left: 20%;
    opacity: 0.55;
    position: absolute;
    right: 20%;
    top: -1px;
  }

  @container (max-width: 480px) {
    border-radius: 14px;
    gap: 14px;
    padding: 20px 14px;
  }
`;

export const ScorePlayers = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  position: relative;

  @container (max-width: 480px) {
    gap: 12px;
  }
`;

export const ScoreShare = styled.div`
  background: linear-gradient(90deg, #638bd9, #a6dcff);
  border-radius: inherit;
  box-shadow: 2px 0 8px #b9dfff55;
  height: 100%;
`;

export const ScoreTrack = styled.div`
  background: linear-gradient(90deg, #c77f83, #f4b49e);
  border-radius: 100px;
  height: 4px;
  margin: 18px 8px 0;
  overflow: hidden;
`;

export const ScoreValue = styled.strong`
  font-size: clamp(48px, 6vw, 76px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-shadow: 0 3px 22px #00000020;

  @container (max-width: 480px) {
    font-size: 52px;
  }
`;

export const ScoreVersus = styled.span`
  align-items: center;
  background: #1b2942;
  border: 1px solid #52627d;
  border-radius: 50%;
  box-shadow: 0 0 0 6px #16233a;
  color: #b2c2db;
  display: flex;
  font-size: 10px;
  font-weight: 700;
  height: 32px;
  justify-content: center;
  left: 50%;
  letter-spacing: 0.02em;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;

  @container (max-width: 480px) {
    font-size: 8px;
    height: 24px;
    width: 24px;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: clamp(32px, 4vw, 50px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.1;
  margin: 0;
  overflow-wrap: anywhere;

  @container (max-width: 700px) {
    font-size: 36px;
  }

  @container (max-width: 480px) {
    font-size: 32px;
  }
`;

export const WinnerBadge = styled.span`
  background: #f7d58a12;
  border: 1px solid #efd18645;
  border-radius: 100px;
  color: #ffe4a7;
  flex-shrink: 0;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.4;
  padding: 4px 7px;
  text-transform: uppercase;
  white-space: nowrap;
`;

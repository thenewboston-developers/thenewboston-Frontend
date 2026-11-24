import styled, {keyframes} from 'styled-components';

const crestArrival = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const sparkleArrival = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(0.8); }
  45% { opacity: 1; transform: scale(1.15); }
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 4px;

  > a,
  > button {
    align-items: center;
    background: #ffffff06;
    border: 1px solid #ffffff30;
    border-radius: 12px;
    color: #edf7f7;
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    justify-content: center;
    line-height: 1.4;
    min-height: 48px;
    padding: 12px 20px;
    text-decoration: none;
    transition:
      background 160ms ease,
      transform 160ms ease;

    &:first-child {
      background: linear-gradient(135deg, #ffe6ab, #efc568);
      border-color: #ffe6ab;
      box-shadow:
        0 4px 0 #9c722f,
        0 8px 20px #00000024;
      color: #26302c;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    &:focus-visible {
      outline: 3px solid #a1e9df;
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

  @media (max-width: 480px) {
    > a,
    > button {
      flex: 1 1 auto;
    }
  }
`;

export const Artwork = styled.div`
  align-self: center;
  animation: ${crestArrival} 650ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  flex: 0 0 clamp(100px, 15vw, 160px);
  pointer-events: none;
  width: clamp(100px, 15vw, 160px);

  svg {
    display: block;
    overflow: visible;
    width: 100%;
  }

  .result-sparkle {
    animation: ${sparkleArrival} 1.1s ease-in-out 2;
    transform-box: fill-box;
    transform-origin: center;
  }

  @media (max-width: 640px) {
    flex-basis: auto;
    margin: -12px 0 -8px;
    order: -1;
    width: 112px;
  }

  @container (max-width: 560px) {
    flex-basis: auto;
    margin: -12px 0 -8px;
    order: -1;
    width: 112px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    .result-sparkle {
      animation: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  position: relative;

  > p,
  > small {
    color: inherit;
    margin: 0;
  }
`;

export const Description = styled.div`
  color: #bbced2;
  font-size: 15px;
  line-height: 1.65;
  margin-top: 10px;

  p {
    color: inherit;
    margin: 0;
  }
`;

export const Eyebrow = styled.div`
  align-items: center;
  color: #ffe2a0;
  display: flex;
  flex-wrap: wrap;
  font-size: 11px;
  font-weight: 700;
  gap: 12px;
  letter-spacing: 0.12em;
  line-height: 1.5;
  margin-bottom: 18px;
  text-transform: uppercase;

  span {
    color: #a9c7ce;
  }

  strong {
    background: #ffffff0a;
    border: 1px solid #e9cd8b30;
    border-radius: 100px;
    font-size: 9px;
    letter-spacing: 0.1em;
    padding: 5px 9px;
  }

  @media (max-width: 640px) {
    justify-content: center;
    margin-bottom: 12px;
  }

  @container (max-width: 560px) {
    justify-content: center;
    margin-bottom: 12px;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 16px 24px;
  justify-content: space-between;
  margin-bottom: 22px;
  position: relative;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  @container (max-width: 560px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

export const HeadingGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Note = styled.p`
  color: #b9cbd3;
  font-size: 13px;
  line-height: 1.7;
  margin: 0;
`;

export const Panel = styled.section<{$victory: boolean}>`
  background:
    radial-gradient(ellipse at 95% 0, ${({$victory}) => ($victory ? '#b88c3b35' : '#73a7be28')}, transparent 48%),
    radial-gradient(ellipse at 0 100%, #1d706b38, transparent 55%), linear-gradient(120deg, #101e2c, #143b41);
  border: 1px solid ${({$victory}) => ($victory ? '#bda26470' : '#739aab55')};
  border-radius: 24px;
  box-shadow:
    0 12px 35px #0a243518,
    inset 0 1px 0 #ffffff0d;
  color: #f2f7f8;
  container-type: inline-size;
  isolation: isolate;
  margin: 24px 0;
  min-width: 0;
  overflow: hidden;
  padding: clamp(24px, 3vw, 32px);
  position: relative;

  &::before {
    background: linear-gradient(90deg, transparent, #f2d48a8c, transparent);
    content: '';
    height: 1px;
    left: 8%;
    position: absolute;
    right: 8%;
    top: 0;
  }

  &::after {
    background-image: radial-gradient(#9ac8cb2b 1px, transparent 1px);
    background-size: 20px 20px;
    content: '';
    height: 260px;
    mask-image: linear-gradient(90deg, transparent, #000000);
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    z-index: -1;
  }

  @media (max-width: 640px) {
    border-radius: 20px;
    padding: 24px 20px;
  }
`;

export const Scoreboard = styled.div`
  background: #0718245c;
  border: 1px solid #b2d3d520;
  border-radius: 16px;
  margin: 0 0 20px;
  padding: 18px 20px;
  position: relative;

  @container (max-width: 560px) {
    padding: 16px;
  }
`;

export const ScoreLabel = styled.p`
  color: #9eb9c0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const ScoreName = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 600;
  gap: 6px 8px;
  min-width: 0;
  overflow-wrap: anywhere;

  @container (max-width: 380px) {
    align-content: flex-start;
    flex: 1;
  }
`;

export const ScorePlayer = styled.div<{$winner: boolean}>`
  align-items: center;
  color: ${({$winner}) => ($winner ? '#fff0c7' : '#d0e0e5')};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;

  @container (max-width: 380px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
  }
`;

export const ScorePlayers = styled.div`
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @container (max-width: 560px) {
    gap: 18px;
  }
`;

export const ScoreShare = styled.div`
  background: linear-gradient(90deg, #78bee8, #a0d8f0);
  border-radius: inherit;
  height: 100%;
`;

export const ScoreTrack = styled.div`
  background: linear-gradient(90deg, #d48680, #f1b3a2);
  border-radius: 100px;
  height: 5px;
  margin-top: 14px;
  overflow: hidden;
`;

export const ScoreValue = styled.strong`
  font-size: clamp(28px, 4vw, 40px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
  margin: 0;
  overflow-wrap: anywhere;

  @container (max-width: 560px) {
    font-size: 28px;
  }
`;

export const WinnerBadge = styled.span`
  border: 1px solid #efd18645;
  border-radius: 5px;
  color: #eed296;
  flex-shrink: 0;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.4;
  padding: 3px 6px;
  text-transform: uppercase;
  white-space: nowrap;
`;

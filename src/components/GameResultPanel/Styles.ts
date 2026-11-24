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

  > a,
  > button {
    align-items: center;
    background: #ffffff0a;
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
    }
  }

  @media (max-width: 480px) {
    > a,
    > button {
      flex: 1 1 auto;
    }
  }
`;

export const Artwork = styled.div<{$victory: boolean}>`
  align-self: center;
  animation: ${({$victory}) => ($victory ? crestArrival : 'none')} 650ms ease-out both;
  flex: 0 0 clamp(140px, 18vw, 210px);
  pointer-events: none;
  width: clamp(140px, 18vw, 210px);

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
    margin: -8px 0 -4px;
    order: -1;
    width: 132px;
  }

  @container (max-width: 560px) {
    flex-basis: auto;
    margin: -8px 0 -4px;
    order: -1;
    width: 132px;
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
  gap: 24px;
  min-width: 0;
  position: relative;

  > p,
  > small {
    color: inherit;
    margin: 0;
  }
`;

export const Description = styled.div`
  color: #b9cbd3;
  font-size: 15px;
  line-height: 1.65;
  margin-top: 12px;

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
  gap: 10px;
  letter-spacing: 0.16em;
  line-height: 1.5;
  margin-bottom: 16px;
  text-transform: uppercase;

  span {
    color: #a9c7ce;

    &::after {
      color: #6b929b;
      content: '/';
      margin-left: 10px;
    }
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
  gap: 16px 32px;
  justify-content: space-between;
  margin-bottom: 28px;
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
    radial-gradient(ellipse at 95% 0, ${({$victory}) => ($victory ? '#b88c3b24' : '#73a7be18')}, transparent 48%),
    radial-gradient(ellipse at 0 100%, #1d706b38, transparent 55%), linear-gradient(120deg, #0c1c2b, #123c43);
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
  padding: clamp(24px, 4vw, 40px);
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

  @media (max-width: 640px) {
    border-radius: 20px;
    padding: 24px 20px;
  }
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

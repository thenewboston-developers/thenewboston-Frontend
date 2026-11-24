import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

const coinArrival = keyframes`
  from { opacity: 0; transform: translateY(-16px) rotate(-8deg); }
  to { opacity: 1; transform: translateY(0) rotate(0); }
`;

export const Artwork = styled.div`
  align-self: center;
  max-width: 300px;
  pointer-events: none;
  width: 100%;

  svg {
    display: block;
    width: 100%;
  }
  .reward-coin {
    animation: ${coinArrival} 800ms ease-out both;
    transform-origin: 164px 72px;
  }

  @media (prefers-reduced-motion: reduce) {
    .reward-coin {
      animation: none;
    }
  }
  @media (max-width: 640px) {
    grid-row: 1;
    justify-self: center;
    margin: -12px 0 -24px;
    max-width: 200px;
  }
`;

export const ArtworkCaption = styled.p`
  color: #d5bf89;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin: 6px 0 0;
  text-align: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const CreateAccount = styled(Link)`
  align-self: flex-start;
  align-items: center;
  background: #ffdb82;
  border-radius: 10px;
  box-shadow:
    0 4px 0 #ac782f,
    0 8px 24px #00000024;
  color: #30240c;
  display: inline-flex;
  font-size: 14px;
  font-weight: 700;
  gap: 18px;
  margin: 18px 0 12px;
  padding: 13px 20px;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid #8ab8f7;
    outline-offset: 3px;
  }

  &:hover {
    background: #ffe7a9;
    color: #30240c;
    text-decoration: none;
  }
`;

export const Eyebrow = styled.p`
  color: #f5d58b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  margin: 0 0 12px;
`;

export const FinePrint = styled.span`
  color: inherit;
  display: block;
  font-size: 12px;
  opacity: 0.8;
`;

export const GuestContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const GuestDescription = styled.p`
  color: #cad7e5;
  font-size: 14px;
  line-height: 1.8;
  margin: 10px 0 0;
  max-width: 570px;
`;

export const GuestTitle = styled.h3`
  color: #ffffff;
  font-size: clamp(18px, 2vw, 24px);
  letter-spacing: -0.025em;
  line-height: 1.3;
  margin: 10px 0 0;
`;

export const Notice = styled.div<{$guest?: boolean; $paid?: boolean}>`
  background: ${({$guest, $paid}) => {
    if ($guest) return 'linear-gradient(135deg, #172944, #243c4c)';
    return $paid ? '#edf6ef' : '#f3f5f8';
  }};
  border: 1px solid ${({$paid}) => ($paid ? '#bbd8c3' : '#dce2eb')};
  border-radius: 12px;
  color: ${({$guest, $paid}) => {
    if ($guest) return '#f5f9ff';
    return $paid ? '#285438' : '#465063';
  }};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 6px;
  line-height: 1.6;
  margin: 14px 0;
  padding: 16px;

  ${({$guest}) =>
    $guest &&
    css`
      background:
        radial-gradient(ellipse at 90% 35%, #32596780, transparent 60%), linear-gradient(120deg, #14273e, #1c3549);
      border: 1px solid #7b9ca44d;
      border-radius: 20px;
      display: grid;
      gap: 12px 32px;
      grid-template-columns: minmax(0, 1fr) minmax(160px, 280px);
      overflow: hidden;
      padding: 30px;

      @media (max-width: 640px) {
        grid-template-columns: minmax(0, 1fr);
        padding: 24px;
      }
    `}
`;

export const RewardAmount = styled.span`
  color: #ffe09a;
  font-size: clamp(42px, 5vw, 58px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.2;

  span {
    font-size: 0.5em;
    letter-spacing: 0;
  }
`;

import {Link} from 'react-router-dom';
import styled, {css, keyframes} from 'styled-components';

const coinArrival = keyframes`
  from { opacity: 0; transform: translateY(-16px) rotate(-8deg); }
  to { opacity: 1; transform: translateY(0) rotate(0); }
`;

const depositConfirmed = keyframes`
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
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

  @container computer-reward (max-width: 600px) {
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

  @container computer-reward (max-width: 600px) {
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

  @container computer-reward (max-width: 600px) {
    align-self: center;
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

  @container computer-reward (max-width: 600px) {
    align-items: center;
    text-align: center;
  }
`;

export const GuestDescription = styled.p`
  color: #cad7e5;
  font-size: 14px;
  line-height: 1.8;
  margin: 10px 0 0;
  max-width: 570px;
`;

export const GuestLayout = styled.div`
  display: grid;
  gap: 12px 32px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  padding: 30px;

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 24px;
  }

  @container computer-reward (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 24px;
  }
`;

export const GuestTitle = styled.h3`
  color: #ffffff;
  font-size: clamp(18px, 2vw, 24px);
  letter-spacing: -0.025em;
  line-height: 1.3;
  margin: 10px 0 0;
`;

export const Notice = styled.div<{$guest?: boolean; $paid?: boolean; $subdued?: boolean}>`
  background: #f3f5f8;
  border: 1px solid #dce2eb;
  border-radius: 12px;
  color: #465063;
  container-name: computer-reward;
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 6px;
  line-height: 1.6;
  margin: 14px 0;
  min-width: 0;
  padding: 16px;

  ${({$subdued}) =>
    $subdued &&
    css`
      background: #ffffff05;
      border: 1px solid #a8c5cd26;
      color: #afc6ce;
      font-size: 12px;
      gap: 3px;
      margin: 0;
      padding: 13px 16px;
    `}

  ${({$paid}) =>
    $paid &&
    css`
      background:
        radial-gradient(ellipse at 78% 24%, #fffdf0 0%, #fffdf000 61%),
        linear-gradient(115deg, #fffbef 0%, #fff3d3 57%, #efd393 100%);
      border: 1px solid #ebcd8c;
      border-radius: 20px;
      box-shadow:
        inset 0 1px 0 #ffffff,
        0 14px 32px #0715231a;
      color: #18313e;
      margin: 0;
      overflow: hidden;
      padding: 0;
    `}

  ${({$guest}) =>
    $guest &&
    css`
      background:
        radial-gradient(ellipse at 90% 35%, #32596780, transparent 60%), linear-gradient(120deg, #14273e, #1c3549);
      border: 1px solid #7b9ca44d;
      border-radius: 20px;
      color: #f5f9ff;
      overflow: hidden;
      padding: 0;
    `}
`;

export const PaidAmount = styled.h3`
  color: #18313e;
  font-size: clamp(48px, 7vw, 72px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 1.08;
  margin: 20px 0 0;
  overflow-wrap: anywhere;
`;

export const PaidArtwork = styled.div`
  align-self: center;
  justify-self: center;
  max-width: 280px;
  pointer-events: none;
  width: 100%;

  svg {
    display: block;
    height: auto;
    width: 100%;
  }

  .paid-reward-coin {
    animation: ${coinArrival} 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    transform-origin: 127px 81px;
  }

  .paid-reward-check {
    animation: ${depositConfirmed} 400ms 260ms ease-out both;
    transform-origin: 255px 136px;
  }

  @media (max-width: 480px) {
    grid-row: 1;
    margin: -8px 0 -18px;
    max-width: 180px;
  }

  @container computer-reward (max-width: 560px) {
    grid-row: 1;
    margin: -8px 0 -18px;
    max-width: 180px;
  }

  @media (prefers-reduced-motion: reduce) {
    .paid-reward-check,
    .paid-reward-coin {
      animation: none;
    }
  }
`;

export const PaidContent = styled.div`
  align-self: center;
  min-width: 0;

  @media (max-width: 480px) {
    text-align: center;
  }

  @container computer-reward (max-width: 560px) {
    text-align: center;
  }
`;

export const PaidCurrency = styled.span`
  color: #7c5b27;
  font-size: 0.38em;
  font-weight: 700;
  letter-spacing: -0.035em;
`;

export const PaidDescription = styled.p`
  color: #6d664f;
  font-size: 13px;
  line-height: 1.65;
  margin: 7px 0 0;
  max-width: 340px;

  @container computer-reward (max-width: 560px) {
    margin-inline: auto;
  }
`;

export const PaidLayout = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  padding: 26px 30px;

  @media (max-width: 480px) {
    gap: 12px;
    grid-template-columns: minmax(0, 1fr);
    padding: 20px 22px 26px;
  }

  @container computer-reward (max-width: 560px) {
    gap: 12px;
    grid-template-columns: minmax(0, 1fr);
    padding: 20px 22px 26px;
  }
`;

export const PaidRewardLabel = styled.span`
  color: #9a7434;
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.17em;
  line-height: 1.4;
  margin-top: 7px;
  text-transform: uppercase;
`;

export const PaidTitle = styled.p`
  color: #18313e;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.4;
  margin: 20px 0 0;
`;

export const PaymentBadge = styled.span`
  align-items: center;
  background: #ffffffa6;
  border: 1px solid #c8d7ba;
  border-radius: 100px;
  color: #35634b;
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  gap: 7px;
  line-height: 1.4;
  padding: 7px 11px;

  svg {
    flex-shrink: 0;
    height: 14px;
    width: 14px;
  }
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

export const RewardLabel = styled.strong`
  color: #d5e4e8;
  font-size: 12px;
  font-weight: 600;
`;

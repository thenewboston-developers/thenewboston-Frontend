import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts, pagePadding} from 'styles';

import {plate, room, roomPanel} from './theme';

export const Badge = styled.span`
  ${plate};
  align-items: center;
  background: ${room.nightSoft};
  border: 1px solid ${room.rim};
  border-radius: 999px;
  color: ${room.mist};
  display: inline-flex;
  font-size: 10px;
  gap: 6px;
  padding: 7px 12px;
`;

export const Container = styled.div`
  ${pagePadding};
  margin: 0 auto;
  max-width: 1500px;
  padding-bottom: 48px;
  padding-top: 16px;
`;

export const Eyebrow = styled.p`
  ${plate};
  color: ${colors.secondary};
  margin: 0 0 2px;
`;

// The two cards every player hopes for, fanned beside the title
export const Fan = styled.div`
  --card-w: 40px;
  flex: 0 0 auto;
  height: 60px;
  position: relative;
  width: 72px;
`;

export const FanCard = styled.span`
  aspect-ratio: 5 / 7;
  background: linear-gradient(150deg, #ffffff, ${room.cardFace} 55%, #ece7da);
  border: 1px solid #d9d4c6;
  border-radius: 5px;
  box-shadow: 0 6px 14px #0a1c1433;
  left: 5px;
  overflow: hidden;
  position: absolute;
  top: 3px;
  transform: rotate(-10deg);
  transform-origin: 50% 110%;
  width: var(--card-w);

  &:last-child {
    left: 25px;
    transform: rotate(9deg);
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export const Heading = styled.h1`
  color: ${colors.primary};
  font-size: clamp(1.85rem, 3vw, 2.4rem);
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: -0.045em;
  line-height: 1.05;
  margin: 0;
`;

export const Masthead = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-bottom: 14px;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Panel = styled.section`
  ${roomPanel};
  min-width: 0;
  padding: 24px 28px 26px;

  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 20px 18px;
  }
`;

export const PanelEyebrow = styled.p`
  ${plate};
  color: ${room.gold};
  margin: 0 0 6px;
`;

export const PanelHeading = styled.h2`
  color: ${room.ivory};
  font-size: 21px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin: 0;
`;

export const PanelLead = styled.p`
  color: ${room.mist};
  font-size: 13.5px;
  line-height: 1.65;
  margin: 10px 0 0;
`;

export const Tagline = styled.p`
  color: ${colors.secondary};
  flex: 1 1 240px;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 0 auto;
  max-width: 360px;
  text-align: right;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const TextLink = styled(Link)`
  color: #1d6a4f;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

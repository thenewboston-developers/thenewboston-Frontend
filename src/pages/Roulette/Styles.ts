import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {fonts, pagePadding} from 'styles';

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
  padding-top: 28px;
`;

export const Navigation = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
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
  color: ${room.brass};
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

export const TextLink = styled(Link)`
  color: #1d6a4f;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
`;

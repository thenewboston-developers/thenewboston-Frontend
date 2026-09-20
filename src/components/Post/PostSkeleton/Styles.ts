import styled from 'styled-components';

import {breakpoints, cardStyle, colors} from 'styles';

export const ActionBar = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 16px;
`;

export const Composer = styled.div`
  margin-top: 12px;
`;

// line-height: 1 keeps every skeleton block exactly as tall as requested (no inline baseline gap)
export const Container = styled.div`
  ${cardStyle};
  line-height: 1;
  overflow: hidden;
  padding: 20px 24px;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
    border-bottom: 1px solid ${colors.borderSubtle};
    border-radius: 0;
    box-shadow: none;
    padding: 16px;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

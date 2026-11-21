import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts} from 'styles';

/* On the smallest screens the feed runs edge to edge, so the card drops its frame the same way the posts do */
export const Container = styled.div`
  ${cardStyle};
  padding: 20px 24px;

  @media (max-width: ${breakpoints.mini}) {
    border: none;
    border-bottom: 1px solid ${colors.borderSubtle};
    border-radius: 0;
    box-shadow: none;
    padding: 16px;
  }
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
`;

export const Text = styled.p`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.5;
  margin: 8px 0 16px;
`;

import styled from 'styled-components';

import {breakpoints, cardStyle, markdownStyle} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyPanel = styled.div`
  ${cardStyle};
  padding: 56px 24px;
`;

export const MarkdownContainer = styled.div`
  ${markdownStyle};
  font-size: 15px;
  margin: 0 auto;
  max-width: 760px;
  min-width: 0;
  overflow-wrap: anywhere;
  width: 100%;

  > :last-child {
    margin-bottom: 0;
  }
`;

export const Panel = styled.div`
  ${cardStyle};
  padding: 32px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

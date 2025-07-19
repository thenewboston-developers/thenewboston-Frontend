import styled from 'styled-components';

import {markdownStyle} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MarkdownContainer = styled.div`
  ${markdownStyle};
`;

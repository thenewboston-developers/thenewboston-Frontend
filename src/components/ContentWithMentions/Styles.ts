import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MentionLink = styled(ULink)`
  color: ${colors.secondary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

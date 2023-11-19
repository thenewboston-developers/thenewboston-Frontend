import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  gap: 16px;
  padding: 16px 0;
`;

export const Link = styled(ULink)`
  font-weight: ${fonts.weight.semiBold};

  &:hover {
    cursor: pointer;
  }
`;

export const TextContainer = styled.div`
  margin-top: 12px;
`;

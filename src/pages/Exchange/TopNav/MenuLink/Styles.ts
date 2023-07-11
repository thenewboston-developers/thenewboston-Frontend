import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(ULink)<{$isActive: boolean}>`
  color: #fff;
  font-weight: 600;
  padding: 12px 8px;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    text-decoration: none;
  }
`;

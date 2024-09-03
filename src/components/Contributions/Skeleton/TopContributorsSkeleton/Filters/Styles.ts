import UIcon from 'components/Icon';
import styled from 'styled-components';
import {colors} from 'styles';

export const Icon = styled(UIcon)`
  margin-right: 0.3rem;
`;

export const FilterButton = styled.div`
  background: 'none';
  color: 'none';
  &:hover {
    color: ${colors.lightBlue};
    cursor: pointer;
  }
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 24px;
  padding: 0.2rem 0.6rem;
  font-size: small;
`;

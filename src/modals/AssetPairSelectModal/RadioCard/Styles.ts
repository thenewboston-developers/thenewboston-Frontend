import styled from 'styled-components';
import {radioCardStyle} from 'styles';

export const Container = styled.div<{$isActive: boolean}>`
  ${radioCardStyle};
`;

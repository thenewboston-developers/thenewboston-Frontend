import styled from 'styled-components';

export const Dot = styled.div<{$color: string}>`
  background: ${({$color}) => $color};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`;

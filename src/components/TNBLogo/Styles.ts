import styled from 'styled-components';

export const TNBLogo = styled.img<{$size: string}>`
  border-radius: 50%;
  margin: 0 3px 0 3px;
  width: ${({$size}) => $size};
`;

import styled from 'styled-components';

export const TNBLogo = styled.img<{$size: string}>`
  border-radius: 50%;
  width: ${({$size}) => $size};
  margin: 0px 3px 0px 3px;
`;

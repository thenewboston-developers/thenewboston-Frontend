import styled from 'styled-components';

export const Dot = styled.div<{$color: string}>`
  background: ${({$color}) => $color};
  border-radius: 50%;
  height: 5px;
  width: 5px;
  position: absolute;
  top: -1.5px;
  right: -4px;
`;

export const Container = styled.div`
  position: relative;
  display: inline-flex;
`;

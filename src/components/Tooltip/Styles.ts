import styled from 'styled-components';

import {colors} from 'styles';

export const Arrow = styled.div`
  border-color: ${colors.secondary} transparent transparent transparent;
  border-style: solid;
  border-width: 5px;
  content: '';
  left: 50%;
  margin-left: -5px;
  position: absolute;
  top: 100%;
`;

export const TooltipContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const TooltipBox = styled.div<{$isVisible: boolean}>`
  background-color: ${colors.secondary};
  border-radius: 4px;
  bottom: 100%;
  color: ${colors.white};
  left: 50%;
  margin-bottom: 10px;
  opacity: ${({$isVisible}) => ($isVisible ? 1 : 0)};
  padding: 5px;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  transition: opacity 0.3s, visibility 0.3s;
  visibility: ${({$isVisible}) => ($isVisible ? 'visible' : 'hidden')};
  width: 150px;
  z-index: 1000;
`;

import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';
import {colors, fonts, TOOLBAR_HEIGHT} from 'styles';

export const Container = styled(ULink)<{$isActive: boolean; $isMobileDevice: boolean}>`
  align-items: center;
  background: ${({$isActive, $isMobileDevice}) => ($isActive && $isMobileDevice ? `${colors.border}` : 'transparent')};
  border-bottom: 2px solid
    ${({$isActive, $isMobileDevice}) => ($isActive && !$isMobileDevice ? `${colors.black}` : 'transparent')};
  color: ${colors.black};
  display: flex;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.bold : fonts.weight.regular)};
  height: ${({$isMobileDevice}) => ($isMobileDevice ? '40px' : `${TOOLBAR_HEIGHT}px`)};
  padding: 0 8px;

  &:hover {
    background: rgba(144, 157, 171, 0.1);
    cursor: pointer;
    text-decoration: none;
  }
`;

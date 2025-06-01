import styled from 'styled-components';

import Icon from 'components/Icon';
import {ToastType} from 'enums';
import {colors, fonts} from 'styles';

const getIconColor = (type: ToastType) => {
  if (type === ToastType.SUCCESS) return colors.palette.green['500'];
  if (type === ToastType.WARNING) return colors.palette.orange['500'];
  return colors.palette.red['400'];
};

export const AlertCircleOutlineIcon = styled(Icon)<{type?: ToastType}>`
  color: ${({type = ToastType.ERROR}) => getIconColor(type)};
  margin-right: 12px;
  flex-shrink: 0;
`;

export const CheckCircleIcon = styled(Icon)<{type?: ToastType}>`
  color: ${({type = ToastType.SUCCESS}) => getIconColor(type)};
  margin-right: 12px;
  flex-shrink: 0;
`;

export const Container = styled.div<{type: ToastType}>`
  align-items: center;
  background: transparent;
  display: flex;
  padding: 16px 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${({type}) => getIconColor(type)};
    border-radius: 16px 0 0 16px;
  }
`;

export const Text = styled.span`
  align-items: center;
  color: ${colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
`;

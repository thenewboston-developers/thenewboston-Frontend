import styled from 'styled-components';

import Icon from 'components/Icon';
import {ToastType} from 'enums';
import {colors, fonts} from 'styles';

const getIconColor = (type: ToastType) => {
  if (type === ToastType.SUCCESS) return colors.palette.green[500];
  if (type === ToastType.WARNING) return colors.palette.orange[500];
  return colors.palette.red[400];
};

export const AlertCircleOutlineIcon = styled(Icon)<{type?: ToastType}>`
  color: ${({type = ToastType.ERROR}) => getIconColor(type)};
  flex-shrink: 0;
  margin-right: 12px;
`;

export const CheckCircleIcon = styled(Icon)<{type?: ToastType}>`
  color: ${({type = ToastType.SUCCESS}) => getIconColor(type)};
  flex-shrink: 0;
  margin-right: 12px;
`;

export const Container = styled.div<{type: ToastType}>`
  align-items: center;
  background: transparent;
  box-sizing: border-box;
  display: flex;
  padding: 16px 20px;
  position: relative;
  width: 100%;

  &::before {
    background-color: ${({type}) => getIconColor(type)};
    border-radius: 16px 0 0 16px;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    width: 4px;
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

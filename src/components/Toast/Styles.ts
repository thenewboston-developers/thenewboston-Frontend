import styled from 'styled-components';

import Icon from 'components/Icon';
import {ToastType} from 'enums';
import {colors} from 'styles';

const iconProps = `
  color: #fff;
  margin-right: 12px;
`;

export const AlertCircleOutlineIcon = styled(Icon)`
  ${iconProps}
`;

export const CheckCircleIcon = styled(Icon)`
  ${iconProps}
`;

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    if (type === ToastType.SUCCESS) return colors.palette.green['500'];
    if (type === ToastType.WARNING) return colors.palette.orange['500'];
    return colors.palette.red['400'];
  }};
  display: flex;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const Text = styled.span`
  align-items: center;
  color: #fff;
  display: flex;
`;

import styled from 'styled-components';
import {mdiAlertCircleOutline, mdiCheckCircle} from '@mdi/js';

import Icon from 'components/Icon';
import {ToastType} from 'enums';
import {colors} from 'styles';

const iconProps = `
  color: #fff;
  margin-right: 12px;
`;

export const AlertCircleOutlineIcon = styled(Icon).attrs(() => ({icon: mdiAlertCircleOutline}))`
  ${iconProps}
`;

export const CheckCircleIcon = styled(Icon).attrs(() => ({icon: mdiCheckCircle}))`
  ${iconProps}
`;

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    if (type === ToastType.success) return colors.palette.green['500'];
    if (type === ToastType.warning) return colors.palette.orange['500'];
    return colors.palette.red['400'];
  }};
  display: flex;
  padding: 12px;
`;

export const Text = styled.span`
  align-items: center;
  color: #fff;
  display: flex;
`;

import styled from 'styled-components';

import UButton from 'components/Button';
import UCallout from 'components/Callout';
import {LogoInput as ULogoInput} from 'components/FormElements';
import {colors, radii} from 'styles';

import {logoInputStyle, orderFormStyle, submitButtonStyle} from '../mixins';

export const Button = styled(UButton)`
  ${submitButtonStyle};

  &:not(:disabled) {
    background: ${colors.palette.green[800]};
  }

  &:hover:not(:disabled) {
    background: ${colors.palette.green[900]};
  }
`;

export const Container = styled.div`
  ${orderFormStyle};
`;

export const InsufficientFundsCallout = styled(UCallout)`
  border-radius: ${radii.small};
  margin-bottom: 16px;
`;

export const LogoInput = styled(ULogoInput)`
  ${logoInputStyle};
`;

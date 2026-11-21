import styled from 'styled-components';

import UButton from 'components/Button';
import {LogoInput as ULogoInput} from 'components/FormElements';
import {colors} from 'styles';

import {logoInputStyle, orderFormStyle, submitButtonStyle} from '../mixins';

export const Button = styled(UButton)`
  ${submitButtonStyle};

  &:not(:disabled) {
    background: ${colors.palette.red[600]};
  }

  &:hover:not(:disabled) {
    background: ${colors.palette.red[800]};
  }
`;

export const Container = styled.div`
  ${orderFormStyle};
`;

export const LogoInput = styled(ULogoInput)`
  ${logoInputStyle};
`;

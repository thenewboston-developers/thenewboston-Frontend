import styled from 'styled-components';

import UButton from 'components/Button';
import {LogoInput as ULogoInput} from 'components/FormElements';

import {logoInputStyle, orderFormStyle, submitButtonStyle} from '../mixins';

export const Button = styled(UButton)`
  ${submitButtonStyle};
`;

export const Container = styled.div`
  ${orderFormStyle};
`;

export const LogoInput = styled(ULogoInput)`
  ${logoInputStyle};
`;

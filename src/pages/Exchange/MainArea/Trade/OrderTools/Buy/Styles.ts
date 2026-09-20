import styled from 'styled-components';

import UButton from 'components/Button';
import UCallout from 'components/Callout';
import {LogoInput as ULogoInput} from 'components/FormElements';
import {radii} from 'styles';

import {logoInputStyle, orderFormStyle, submitButtonStyle} from '../mixins';

export const Button = styled(UButton)`
  ${submitButtonStyle};
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

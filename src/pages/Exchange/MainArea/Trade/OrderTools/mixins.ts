import {css} from 'styled-components';

import {
  AvailableRow,
  Container as AvailableTotalContainer,
  Text as AvailableTotalText,
  TotalRow,
} from 'components/AvailableTotal/Styles';
import {Container as FormFieldContainer} from 'components/FormElements/FormField/Styles';
import {LogoInputProps} from 'components/FormElements/LogoInput';
import {
  CurrencyLogo as LogoInputCurrencyLogo,
  ErrorMessage as LogoInputErrorMessage,
  Label as LogoInputLabel,
} from 'components/FormElements/LogoInput/Styles';
import {colors, controlStyle, fonts, radii, shadows} from 'styles';

const CONTROL_HEIGHT = 44;
// LogoInput renders its currency logo 28px wide
const LOGO_OFFSET = (CONTROL_HEIGHT - 28) / 2;

const fieldErrorMixin = css`
  border-color: ${colors.palette.red[500]};

  &:hover:not(:focus) {
    border-color: ${colors.palette.red[500]};
  }
`;

// For styled(ULogoInput): the className of a LogoInput lands on its input. The doubled specificity replaces the legacy
// field look of the shared component, and the error border it would lose is rebuilt from the props of the input
export const logoInputStyle = css<LogoInputProps>`
  && {
    ${controlStyle};
    appearance: textfield;
    display: block;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.medium};
    height: ${`${CONTROL_HEIGHT}px`};
    padding: 0 48px 0 14px;
    width: 100%;
    ${({errors, name, touched}) => errors[name] && touched[name] && fieldErrorMixin};
  }
`;

// For the container of an order form: restyles the parts of the shared form components that do not accept a className
export const orderFormStyle = css`
  ${AvailableRow},
  ${TotalRow} {
    align-items: baseline;
    font-size: 13px;
    font-weight: ${fonts.weight.regular};
    line-height: 1.5;
    padding: 0;

    > span:first-child {
      color: ${colors.secondary};
    }
  }

  ${AvailableRow} {
    border-bottom: none;
  }

  ${AvailableTotalContainer} {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 4px 0 20px;
  }

  ${AvailableTotalText} {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.semiBold};
    text-align: right;
  }

  ${FormFieldContainer} {
    margin-bottom: 16px;
  }

  ${LogoInputCurrencyLogo} {
    margin-left: 0;
    pointer-events: none;
    right: ${`${LOGO_OFFSET}px`};
  }

  ${LogoInputErrorMessage} {
    color: ${colors.palette.red[600]};
    line-height: 1.4;
  }

  ${LogoInputLabel} {
    color: ${colors.secondary};
    font-size: 13px;
    font-weight: ${fonts.weight.medium};
    margin-bottom: 6px;
  }
`;

// For styled(UButton): the shared (black, pill shaped) Button stretched to the width and the height of the fields
export const submitButtonStyle = css`
  border-radius: ${radii.pill};
  height: ${`${CONTROL_HEIGHT}px`};
  width: 100%;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

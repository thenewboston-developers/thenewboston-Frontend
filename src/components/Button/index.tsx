import React, {useMemo} from 'react';

import Loader from 'components/Loader';
import {SFC} from 'types';
import * as S from './Styles';
import {ButtonColor, ButtonType} from './types';

export interface ButtonProps {
  color?: ButtonColor;
  dirty?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: string;
  isSubmitting?: boolean;
  isValid?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  text: string;
  type?: ButtonType;
}

const Button: SFC<ButtonProps> = ({
  color = ButtonColor.primary,
  className,
  dirty = true,
  disabled = false,
  iconLeft,
  iconRight,
  isSubmitting = false,
  isValid = false,
  onClick,
  text,
  type = ButtonType.button,
}) => {
  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case ButtonType.submit:
        return !dirty || disabled || isSubmitting || !isValid;
      default:
        return disabled || isSubmitting;
    }
  }, [dirty, disabled, isSubmitting, isValid, type]);

  const renderButtonContent = () => {
    if (iconLeft || iconRight)
      return (
        <S.Container>
          {iconLeft ? iconLeft : null}
          {text}
          {iconRight ? <S.IconRight color="white" path={iconRight} size="18px" /> : null}
        </S.Container>
      );

    return text;
  };

  return (
    <S.Button
      $color={color}
      $hasIcon={!!iconLeft || !!iconRight}
      className={className}
      disabled={buttonIsDisabled}
      onClick={onClick}
      type={type}
    >
      {type === ButtonType.submit && isSubmitting ? <Loader size={12} /> : renderButtonContent()}
    </S.Button>
  );
};

export {ButtonColor, ButtonType};
export default Button;

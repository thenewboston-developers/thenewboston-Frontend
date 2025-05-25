import React, {useMemo} from 'react';

import Loader from 'components/Loader';
import {SFC} from 'types';

import * as S from './Styles';
import {ButtonColor, ButtonType, IconColor} from './types';

export interface ButtonProps {
  color?: ButtonColor;
  dirty?: boolean;
  disabled?: boolean;
  iconColor?: IconColor;
  iconLeft?: string;
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
  iconColor = IconColor.white,
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

  const renderButtonContent = () => (
    <>
      {iconLeft ? <S.IconLeft color={iconColor} path={iconLeft} size="18px" /> : null}
      {text}
      {iconRight ? <S.IconRight color={iconColor} path={iconRight} size="18px" /> : null}
    </>
  );

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

export {ButtonColor, ButtonType, IconColor};
export default Button;

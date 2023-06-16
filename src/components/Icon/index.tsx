import React, {forwardRef, HTMLAttributes} from 'react';
import MdiIcon from '@mdi/react';

import * as S from './Styles';

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  disabled?: boolean;
  icon: string;
  onClick?(e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onKeyDown?(e?: React.KeyboardEvent<HTMLDivElement>): void;
  size?: number;
  totalSize?: number | 'unset';
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({className, disabled = false, icon, onClick, onKeyDown, size = 24, totalSize}, ref) => {
    const handleClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      if (disabled || !onClick) return;
      onClick(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!onClick) return;
      if (e.key === 'Enter' && !disabled) handleClick();
      onKeyDown?.(e);
    };

    return (
      <S.Wrapper
        $hasOnClickHandler={!!onClick}
        $totalSize={totalSize}
        className={className}
        disabled={disabled}
        onClick={onClick ? handleClick : undefined}
        onKeyDown={onKeyDown ? handleKeyDown : undefined}
        ref={ref}
        role={onClick ? 'button' : 'img'}
        size={size}
      >
        <MdiIcon path={icon} size={`${size}px`} />
      </S.Wrapper>
    );
  },
);

export default Icon;

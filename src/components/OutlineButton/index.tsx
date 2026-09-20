import {MouseEvent, ReactNode} from 'react';
import Icon from '@mdi/react';

import {SFC} from 'types';

import * as S from './Styles';

export interface OutlineButtonProps {
  children?: ReactNode;
  iconLeft?: string;
  iconSize?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text?: string;
}

const OutlineButton: SFC<OutlineButtonProps> = ({children, className, iconLeft, iconSize = '18px', onClick, text}) => {
  return (
    <S.Button className={className} onClick={onClick} type="button">
      {iconLeft && <Icon path={iconLeft} size={iconSize} />}
      {text && <S.ButtonText>{text}</S.ButtonText>}
      {children}
    </S.Button>
  );
};

export default OutlineButton;

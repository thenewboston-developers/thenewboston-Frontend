import {MouseEvent, ReactNode} from 'react';
import Icon from '@mdi/react';

import {SFC} from 'types';

import * as S from './Styles';

export interface OutlineButtonProps {
  iconLeft?: string;
  iconSize?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  children?: ReactNode;
}

const OutlineButton: SFC<OutlineButtonProps> = ({className, iconLeft, iconSize = '18px', onClick, text, children}) => {
  return (
    <S.Button className={className} onClick={onClick} type="button">
      {iconLeft && <Icon path={iconLeft} size={iconSize} />}
      {text && <S.ButtonText>{text}</S.ButtonText>}
      {children}
    </S.Button>
  );
};

export default OutlineButton;

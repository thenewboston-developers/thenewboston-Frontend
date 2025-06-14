import {ReactNode} from 'react';

import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface TabProps {
  children: ReactNode;
  isActive: boolean;
  onClick: GenericVoidFunction;
}

const Tab: SFC<TabProps> = ({children, className, isActive, onClick}) => {
  return (
    <S.Container $isActive={isActive} className={className} onClick={onClick}>
      {children}
    </S.Container>
  );
};

export default Tab;

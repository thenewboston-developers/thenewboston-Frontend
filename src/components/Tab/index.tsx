import {KeyboardEvent, ReactNode} from 'react';

import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface TabProps {
  children: ReactNode;
  isActive: boolean;
  onClick: GenericVoidFunction;
}

const Tab: SFC<TabProps> = ({children, className, isActive, onClick}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onClick();
  };

  return (
    <S.Container
      $isActive={isActive}
      aria-selected={isActive}
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="tab"
      tabIndex={0}
    >
      {children}
    </S.Container>
  );
};

export default Tab;

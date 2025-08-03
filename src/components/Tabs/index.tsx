import {ReactNode} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

export interface TabsProps {
  children: ReactNode;
  stackOnMobile?: boolean;
}

const Tabs: SFC<TabsProps> = ({children, className, stackOnMobile = false}) => {
  return (
    <S.Container $stackOnMobile={stackOnMobile} className={className}>
      {children}
    </S.Container>
  );
};

export default Tabs;

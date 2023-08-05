import {ReactNode} from 'react';

import {SFC} from 'types';
import * as S from './Styles';

export interface TabsProps {
  children: ReactNode;
}

const Tabs: SFC<TabsProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default Tabs;

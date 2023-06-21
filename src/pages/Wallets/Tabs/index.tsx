import {ReactNode} from 'react';

import {SFC} from 'types';
import * as S from './Styles';

export interface TabsProps {
  children: ReactNode;
}

const Tabs: SFC<TabsProps> = ({children, className}) => {
  return <S.Tabs className={className}>{children}</S.Tabs>;
};

export default Tabs;

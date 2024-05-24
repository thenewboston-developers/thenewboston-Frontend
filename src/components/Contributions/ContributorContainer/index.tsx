import * as S from './Styles';
import {SFC} from '../../../types';
import {ReactNode} from 'react';

export interface ContributorContainerProps {
  children: ReactNode;
  className?: string;
}

const ContributorContainer: SFC<ContributorContainerProps> = ({className, children}) => {
  return <S.Container className={className}>{children}</S.Container>;
};
export default ContributorContainer;

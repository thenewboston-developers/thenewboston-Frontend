import {SFC} from 'types';
import * as S from './Styles';
import {ReactNode} from 'react';

export interface PanelHeadingProps {
  heading: string | ReactNode;
}

const PanelHeading: SFC<PanelHeadingProps> = ({className, heading}) => {
  return <S.Container className={className}>{heading}</S.Container>;
};

export default PanelHeading;

import {SFC} from 'types';
import * as S from './Styles';

export interface PanelHeadingProps {
  heading: string;
}

const PanelHeading: SFC<PanelHeadingProps> = ({className, heading}) => {
  return <S.Container className={className}>{heading}</S.Container>;
};

export default PanelHeading;

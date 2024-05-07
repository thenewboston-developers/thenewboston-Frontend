import {SFC} from 'types';
import logo from 'assets/logo192.png';
import * as S from './Styles';

export interface TNBLogoProps {
  size?: string;
}

const TNBLogo: SFC<TNBLogoProps> = ({size = '15px'}) => {
  return <S.TNBLogo src={logo} $size={size} />;
};

export default TNBLogo;

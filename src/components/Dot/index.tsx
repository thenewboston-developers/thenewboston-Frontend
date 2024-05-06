import {SFC} from 'types';
import {colors} from 'styles';
import * as S from './Styles';

interface DotProps {
  color?: string;
}

const Dot: SFC<DotProps> = ({color = colors.palette.red['500']}) => {
  return <S.Dot $color={color} />;
};

export default Dot;

import {SFC} from 'types';
import Toolbar from './Toolbar';
import MainArea from './MainArea';
import * as S from './Styles';

interface ContributionsProps {
  className?: string;
}

const Contributions: SFC<ContributionsProps> = ({className}) => {
  return (
    <S.Container className={className}>
      <Toolbar />
      <MainArea />
    </S.Container>
  );
};

export default Contributions;

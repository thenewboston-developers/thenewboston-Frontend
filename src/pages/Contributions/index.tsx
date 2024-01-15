import SectionHeading from 'components/SectionHeading';
import {SFC} from 'types';
import * as S from './Styles';

const Contributions: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SectionHeading heading="Contributions" />
    </S.Container>
  );
};

export default Contributions;

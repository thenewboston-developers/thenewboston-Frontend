import {SFC} from 'types';
import * as S from './Styles';

const Chart: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <div>Chart</div>
    </S.Container>
  );
};

export default Chart;

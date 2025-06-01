import {SFC} from 'types';

import * as S from './Styles';

export interface CodeProps {
  data: any;
}

const Code: SFC<CodeProps> = ({data}) => {
  return (
    <S.Container>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </S.Container>
  );
};

export default Code;

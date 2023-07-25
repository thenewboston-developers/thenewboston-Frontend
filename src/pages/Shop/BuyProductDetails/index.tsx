import {useParams} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const {id} = useParams();

  return (
    <S.Container className={className}>
      <div>{id}</div>
    </S.Container>
  );
};

export default BuyProductDetails;

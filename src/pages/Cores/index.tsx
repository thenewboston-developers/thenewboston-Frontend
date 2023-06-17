import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getCores as _getCores} from 'dispatchers/cores';
import {getCores} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import CoreCard from './CoreCard';
import * as S from './Styles';

const Cores: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cores = useSelector(getCores);

  useEffect(() => {
    (async () => {
      await dispatch(_getCores());
    })();
  }, [dispatch]);

  const renderCoreCards = () => {
    const orderedCores = orderBy(Object.values(cores), ['ticker']);
    return orderedCores.map((core) => <CoreCard core={core} key={core.id} />);
  };

  return (
    <S.Container className={className}>
      <S.CardsContainer>{renderCoreCards()}</S.CardsContainer>
    </S.Container>
  );
};

export default Cores;

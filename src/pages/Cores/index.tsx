import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import {getCores as _getCores} from 'dispatchers/cores';
import {useToggle} from 'hooks';
import CoreModal from 'modals/CoreModal';
import {getCores} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import CoreCard from './CoreCard';
import * as S from './Styles';

const Cores: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const cores = useSelector(getCores);
  const dispatch = useDispatch<AppDispatch>();

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
    <>
      <S.Container className={className}>
        <S.Toolbar>
          <Button onClick={toggleCoreModal} text="Add Core" />
        </S.Toolbar>
        <S.CardsContainer>{renderCoreCards()}</S.CardsContainer>
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default Cores;

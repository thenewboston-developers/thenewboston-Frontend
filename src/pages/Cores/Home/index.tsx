import {getCores} from 'selectors/state';
import {SFC} from 'types';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useToggle} from 'hooks';
import * as S from './Styles';
import CoreCard from '../CoreCard';
import CoreModal from 'modals/CoreModal';
import EmptyText from 'components/EmptyText';
import orderBy from 'lodash/orderBy';
import SectionHeading from 'components/SectionHeading';

const Home: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const cores = useSelector(getCores);

  const coresList = useMemo(() => {
    return orderBy(Object.values(cores), ['ticker']);
  }, [cores]);

  const renderContent = () => {
    if (!!coresList.length) return renderCores();
    return <EmptyText>No cores to display.</EmptyText>;
  };

  const renderCores = () => {
    const coreCards = coresList.map((core) => <CoreCard core={core} key={core.id} />);
    return <S.CardsContainer>{coreCards}</S.CardsContainer>;
  };

  return (
    <>
      <S.Container className={className}>
        <SectionHeading heading="Currencies" />
        {renderContent()}
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default Home;

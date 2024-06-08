import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getCores} from 'selectors/state';
import {SFC} from 'types';
import CoreCard from '../CoreCard';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';

import * as S from './Styles';

const Home: SFC = ({className}) => {
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
    </>
  );
};

export default Home;

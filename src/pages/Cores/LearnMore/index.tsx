import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import SectionHeading from 'components/SectionHeading';
import {useToggle} from 'hooks';
import CoreModal from 'modals/CoreModal';
import {getCores} from 'selectors/state';
import {SFC} from 'types';
import CoreCard from '../CoreCard';
import * as S from './Styles';

const LearnMore: SFC = ({className}) => {
  const [coreModalIsOpen, toggleCoreModal] = useToggle(false);
  const cores = useSelector(getCores);

  const coresList = useMemo(() => {
    return orderBy(Object.values(cores), ['ticker']);
  }, [cores]);

  const renderButton = () => {
    return <Button onClick={toggleCoreModal} text="Add Currency" />;
  };

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
        <SectionHeading heading="Currencies" rightContent={renderButton()} />
        {renderContent()}
      </S.Container>
      {coreModalIsOpen ? <CoreModal close={toggleCoreModal} /> : null}
    </>
  );
};

export default LearnMore;

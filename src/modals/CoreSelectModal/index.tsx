import {useSelector} from 'react-redux';

import {getCores} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

export interface CoreSelectModalProps {
  close(): void;
}

const CoreSelectModal: SFC<CoreSelectModalProps> = ({className, close}) => {
  const cores = useSelector(getCores);

  const renderRadioCards = () => {
    return (
      <>
        {Object.values(cores).map((_core) => {
          return <S.RadioCardWrapper core={_core} key={_core.id} />;
        })}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Cores">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <S.Button text="Apply" />
    </S.Modal>
  );
};

export default CoreSelectModal;

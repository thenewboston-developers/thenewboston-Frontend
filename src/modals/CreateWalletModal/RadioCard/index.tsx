import {Core, GenericVoidFunction, SFC} from 'types';
import * as S from './Styles';

interface RadioCardProps {
  activeCoreId: number | null;
  core: Core;
  handleRadioCardClick: GenericVoidFunction;
}

const RadioCard: SFC<RadioCardProps> = ({activeCoreId, className, core, handleRadioCardClick}) => {
  return (
    <S.Container
      $isActive={activeCoreId === core.id}
      className={className}
      key={core.id}
      onClick={handleRadioCardClick}
    >
      {core.ticker}
    </S.Container>
  );
};

export default RadioCard;

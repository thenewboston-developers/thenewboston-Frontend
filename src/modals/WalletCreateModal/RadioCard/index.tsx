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
      <S.ImageContainer>
        <S.Img alt="logo" src={core.logo || ''} />
        <S.Title>{core.ticker}</S.Title>
      </S.ImageContainer>
      <S.Radio>
        <S.RadioInput checked={activeCoreId === core.id} name="ticker" readOnly type="radio" value={core.ticker} />
      </S.Radio>
    </S.Container>
  );
};

export default RadioCard;

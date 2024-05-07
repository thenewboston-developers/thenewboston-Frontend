import {useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getManager} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, Core, SFC} from 'types';
import * as S from './Styles';

interface RadioCardProps {
  core: Core;
}

const RadioCard: SFC<RadioCardProps> = ({className, core}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const radioRef = useRef<HTMLInputElement>(null);

  const isActiveCommentCore = useMemo(() => {
    return manager.activeCommentCore?.id === core.id;
  }, [core.id, manager.activeCommentCore?.id]);

  const handleRadioCardClick = () => {
    dispatch(updateManager({activeCommentCore: isActiveCommentCore ? null : core}));
    if (radioRef.current) {
      radioRef.current.click();
    }
  };

  return (
    <S.Container $isActive={isActiveCommentCore} className={className} key={core.id} onClick={handleRadioCardClick}>
      <S.ImageContainer>
        <S.Img alt="logo" src={core.logo || ''} />
        <S.Title>{core.ticker}</S.Title>
      </S.ImageContainer>
      <S.Radio>
        <S.RadioInput
          checked={isActiveCommentCore}
          name="ticker"
          readOnly
          ref={radioRef}
          type="radio"
          value={core.ticker}
        />
      </S.Radio>
    </S.Container>
  );
};

export default RadioCard;

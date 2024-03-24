import {useMemo} from 'react';
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

  const isActiveCommentCore = useMemo(() => {
    return manager.activeCommentCore?.id === core.id;
  }, [core.id, manager.activeCommentCore?.id]);

  const handleRadioCardClick = () => {
    dispatch(updateManager({activeCommentCore: isActiveCommentCore ? null : core}));
  };

  return (
    <S.Container $isActive={isActiveCommentCore} className={className} key={core.id} onClick={handleRadioCardClick}>
      {core.ticker}
    </S.Container>
  );
};

export default RadioCard;

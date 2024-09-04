import * as S from './Styles';
import {mdiTuneVariant} from '@mdi/js';

const Filters = () => {
  return (
    <>
      <S.FilterButton>
        <S.Icon icon={mdiTuneVariant} size={15} totalSize="unset" />
        Filter
      </S.FilterButton>
    </>
  );
};

export default Filters;

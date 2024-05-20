import CoreDetail from 'components/CoreLabel';
import {Core, SFC} from 'types';
import * as S from './Styles';

export interface CoreCardProps {
  core: Core;
}

const CoreCard: SFC<CoreCardProps> = ({className, core}) => {
  return (
    <>
      <S.Container className={className}>
        <CoreDetail core={core} />
      </S.Container>
    </>
  );
};

export default CoreCard;

import Skeleton from 'react-loading-skeleton';
import Line from 'components/Line';
import {SFC} from 'types';
import * as S from './Styles';

interface ContributionsSkeletonProps {
  dataLength: number;
}

const ContributionsSkeleton: SFC<ContributionsSkeletonProps> = ({dataLength}) => {
  const cardHeader = () => {
    return (
      <>
        <S.Box>
          <S.BoxLeft>
            <S.Avatar>
              <Skeleton circle width={50} height={50} />
            </S.Avatar>
            <S.Text>
              <S.TextSkeleton width={'40%'} />
            </S.Text>
          </S.BoxLeft>
          <S.BoxRight>
            <S.TextSkeleton width={'40%'} $float={'inline-end'} />
          </S.BoxRight>
        </S.Box>
        <Line />
      </>
    );
  };
  const renderContent = () => {
    return (
      <>
        <S.Avatar>
          <Skeleton circle width={25} height={25} />
        </S.Avatar>
        <S.Text>
          <S.TextSkeleton width={'50%'} />
        </S.Text>
      </>
    );
  };
  const cardBody = () => {
    return (
      <S.Box $padding={'10px'}>
        {renderContent()}
        {renderContent()}
      </S.Box>
    );
  };
  const cardFooter = () => {
    return (
      <>
        <S.Box>
          <S.Avatar>
            <Skeleton circle width={50} height={50} />
          </S.Avatar>
          <S.Text>
            <S.TextSkeleton width={'30%'} />
          </S.Text>
        </S.Box>
        <S.TextSkeleton width={'80%'} count={2} $marginLeft={'60px'} />
      </>
    );
  };
  return (
    <>
      {Array(dataLength)
        .fill(0)
        .map((_, index) => (
          <S.Column size={6} key={index}>
            <S.Card>
              <div>
                {cardHeader()}
                {cardBody()}
                {cardBody()}
              </div>
              <Line />

              <S.Div>{cardFooter()}</S.Div>
            </S.Card>
          </S.Column>
        ))}
    </>
  );
};

export default ContributionsSkeleton;

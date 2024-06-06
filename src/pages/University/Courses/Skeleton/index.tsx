import {Col} from 'styles/components/GridStyle';
import {SFC} from 'types';
import Skeleton from 'react-loading-skeleton';
import * as S from './Styles';

interface CourseSkeletonProps {
  dataLength: number;
}

const CourseSkeleton: SFC<CourseSkeletonProps> = ({dataLength}) => {
  const cardBody = () => {
    return (
      <>
        <S.CardBody>
          <S.BoxSkeleton />
          <S.TextSkeleton />
          <S.TextSkeleton $width="80%" />
        </S.CardBody>
      </>
    );
  };
  const cardFooter = () => {
    return (
      <>
        <S.CardFooter>
          <S.Left>
            <S.Div>
              <Skeleton circle width={45} height={45} />
            </S.Div>
            <S.Text>
              <S.TextSkeleton $width="50%" />
              <S.TextSkeleton $width="80%" />
            </S.Text>
          </S.Left>
          <S.Right>
            <S.TextSkeleton />
          </S.Right>
        </S.CardFooter>
      </>
    );
  };
  return (
    <>
      {Array(dataLength)
        .fill(0)
        .map((_, index) => (
          <Col size={4} key={index}>
            <S.Card>
              {cardBody()}
              {cardFooter()}
            </S.Card>
          </Col>
        ))}
    </>
  );
};

export default CourseSkeleton;

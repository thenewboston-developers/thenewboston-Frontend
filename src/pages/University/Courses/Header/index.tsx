import * as S from './Styles';
import LearningIcon from 'assets/learning.svg';
import HeaderImage from 'assets/LearningHeader.png';

export const UniversityHeader = () => {
  return (
    <S.Container>
      <S.Left>
        <S.HeaderContainer>
          <S.Header>
            <img alt="artwork-icon" src={LearningIcon} />
            <h1>Learning Paths</h1>
          </S.Header>
          <S.SubHeader>
            Supercharge Your Learning Journey with Expertly Curated Video Courses Directly from Passionate Instructors!
          </S.SubHeader>
        </S.HeaderContainer>
      </S.Left>
      <S.Right>
        <S.Img alt="learning" src={HeaderImage} />
        <S.ImgOverlay />
      </S.Right>
    </S.Container>
  );
};

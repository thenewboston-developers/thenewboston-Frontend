import {SFC} from 'types';
import banner from 'assets/la-profile.png';
import ia from 'assets/ia-image.svg';
import * as S from './Styles';

const Overview: SFC = () => {
  return (
    <>
      <S.Box>
        <S.Heading>Overview</S.Heading>
        <S.Text>
          Thenewboston is an open-source project that anyone can contribute to, including developers, designers, and
          more. In exchange for their contributions, users receive TNB. The amount of TNB received is proportional to
          the value of the contribution, which is determined by Ia, our AI.
        </S.Text>
        <S.Div>
          <S.Image src={banner} />
        </S.Div>
      </S.Box>
      <S.Box>
        <S.Heading>Types of Contributions: GitHub and Manual</S.Heading>
        <S.Text>
          There are two types of contributions: GitHub contributions and manual contributions. For GitHub contributions,
          whenever a pull request (PR) is merged into the master branch, Ia will automatically assess the value of that
          PR. For manual contributions, users submit a description of their contribution, and Ia will make her
          assessment based on that.
        </S.Text>
        <S.Div>
          <S.Image src={ia} />
        </S.Div>
      </S.Box>
    </>
  );
};
export default Overview;

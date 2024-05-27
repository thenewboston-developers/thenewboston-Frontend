import {SFC} from 'types';
import qa from 'assets/qa.svg';
import dashLine from 'assets/dash-line.svg';
import {contentData} from '..';
import * as S from './Styles';

const ContentBlock: SFC<{data: (typeof contentData)[0]}> = ({data}) => {
  return (
    <>
      <S.Box>
        <S.Img src={qa} />
        <S.Heading>{data.heading}</S.Heading>
        <S.Text>{data.text}</S.Text>
        {data.images.length > 0 && (
          <S.Content>
            {data.images.map((src, index) =>
              src === dashLine ? (
                <S.Div key={`dash-line-${index}`}>
                  <S.DashLine src={src} />
                </S.Div>
              ) : (
                <img key={`image-${index}`} src={src} />
              ),
            )}
          </S.Content>
        )}
        {data.contact && (
          <>
            <h4>Bucky</h4>
            <S.Link to="">{data.contact}</S.Link>
          </>
        )}
      </S.Box>
    </>
  );
};
export default ContentBlock;

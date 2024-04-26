import * as S from './Styles';
import {Url} from 'url';

interface UserLabelV2Props {
  image?: string | '';
  content: string;
  url?: Url;
  header: string;
  style?: any;
}

export const UserLabelV2 = ({image, content, header, style = {}}: UserLabelV2Props) => {
  return (
    <S.Container style={style}>
      <div>
        <S.Header>{header}</S.Header>
        <S.Username>{content}</S.Username>
      </div>
      {image && <S.Image src={image} width={40} height={40} />}
    </S.Container>
  );
};

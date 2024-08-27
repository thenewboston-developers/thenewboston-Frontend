import {PostReactionSerializer, SFC} from 'types';
import * as S from './Styles';

export interface PostReactionModalProps {
  close(): void;
  reactions?: PostReactionSerializer[];
}

export const PostReactionModal: SFC<PostReactionModalProps> = ({className, close, reactions}) => {
  return (
    <S.Modal className={className} close={close} header={'Post Reactions'}>
      <S.Div>
        {reactions?.map((postReaction, index) => (
          <S.Row $isFirst={Boolean(index == 0)}>
            {postReaction.reaction} {postReaction.user.username}
          </S.Row>
        ))}
      </S.Div>
      <S.Bumper />
    </S.Modal>
  );
};

export default PostReactionModal;

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getComments} from 'selectors/state';
import {SFC} from 'types';
import Comment from './Comment';
import * as S from './Styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const comments = useSelector(getComments);

  const commentList = useMemo(() => {
    const _comments = orderBy(Object.values(comments), ['created_date'], ['desc']);
    return _comments.filter(({post}) => post === postId);
  }, [comments, postId]);

  const renderComments = () => {
    return commentList.map((comment) => <Comment comment={comment} key={comment.id} />);
  };

  return <S.Container className={className}>{renderComments()}</S.Container>;
};

export default Comments;

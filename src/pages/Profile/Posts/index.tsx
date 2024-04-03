import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import Post from 'components/Post';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Posts: SFC = ({className}) => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;
      await dispatch(_resetPosts());
      await dispatch(_getPosts({owner: userId}));
    })();
  }, [dispatch, userId]);

  const postList = useMemo(() => {
    const _posts = orderBy(Object.values(posts), ['created_date'], ['desc']);
    return _posts.filter(({owner}) => owner.id === userId);
  }, [posts, userId]);

  const renderContent = () => {
    if (!!postList.length) return renderPostContainer();
    return <EmptyText>No posts to display.</EmptyText>;
  };

  const renderPostContainer = () => {
    const _posts = postList.map((post) => <Post key={post.id} post={post} />);
    return <S.PostContainer>{_posts}</S.PostContainer>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Posts;

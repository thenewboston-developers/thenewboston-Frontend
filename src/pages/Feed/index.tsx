import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Post from 'components/Post';
import {getPosts as _getPosts} from 'dispatchers/posts';
import {getPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);

  useEffect(() => {
    (async () => {
      await dispatch(_getPosts());
    })();
  }, [dispatch]);

  const postList = useMemo(() => {
    return orderBy(Object.values(posts), ['created_date'], ['desc']);
  }, [posts]);

  const renderContent = () => {
    if (!!postList.length) return renderPostContainer();
    return (
      <EmptyPage
        bottomText="Try following some users to see their posts here!"
        graphic={LeavesEmptyState}
        topText="Nothing here!"
      />
    );
  };

  const renderPostContainer = () => {
    const _posts = postList.map((post) => <Post key={post.id} post={post} />);
    return <S.PostContainer>{_posts}</S.PostContainer>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Feed;

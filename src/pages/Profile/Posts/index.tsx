import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import EmptyText from 'components/EmptyText';
import Post from 'components/Post';
import {getPosts} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const Posts: SFC = ({className}) => {
  const posts = useSelector(getPosts);

  const postList = useMemo(() => {
    return Object.values(posts);
  }, [posts]);

  const renderContent = () => {
    if (!!postList.length) return renderPosts();
    return <EmptyText>No posts to display.</EmptyText>;
  };

  const renderPosts = () => {
    return postList.map((post) => <Post key={post.id} post={post} />);
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Posts;

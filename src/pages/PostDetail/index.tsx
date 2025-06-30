import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {getPost} from 'api/posts';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {Post as TPost, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PostDetail: SFC = ({className}) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<TPost | null>(null);
  const {postId} = useParams<{postId: string}>();

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        displayErrorToast('Invalid post ID');
        return;
      }

      try {
        setLoading(true);
        const postData = await getPost(parseInt(postId, 10));
        setPost(postData);
      } catch (error) {
        displayErrorToast('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <S.Container className={className}>
      <S.Content>{loading ? <PostSkeleton dataLength={1} /> : post && <Post post={post} />}</S.Content>
    </S.Container>
  );
};

export default PostDetail;

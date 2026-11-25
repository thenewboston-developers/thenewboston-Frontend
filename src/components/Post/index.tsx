import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiCommentTextOutline, mdiDotsVertical, mdiHeart, mdiHeartOutline} from '@mdi/js';

import ContentWithMentions from 'components/ContentWithMentions';
import {deletePost, likePost, unlikePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {useRequireAuthentication, useToggle} from 'hooks';
import PostLikesModal from 'modals/PostLikesModal';
import PostModal from 'modals/PostModal';
import {getComments, getSelf} from 'selectors/state';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';

import Comments from './Comments';
import PostImages from './PostImages';
import * as S from './Styles';
import TransferInfo from './TransferInfo';

export interface PostProps {
  // The comment a notification points to, which is scrolled into view and highlighted
  highlightedCommentId?: number | null;
  post: TPost;
}

const CONTENT_PREVIEW_LENGTH = 400;

const extractYouTubeVideoId = (text: string): string | null => {
  const urlPattern = /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\s]+/gi;
  const matches = text.match(urlPattern);

  if (!matches) return null;

  for (const match of matches) {
    let url: URL | null = null;

    try {
      url = new URL(match);
    } catch (error) {
      url = null;
    }

    if (url) {
      const host = url.host.replace(/^www\./, '');
      const pathParts = url.pathname.split('/').filter(Boolean);

      if (host === 'youtu.be' && pathParts[0]) {
        return pathParts[0];
      }

      if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
        if (url.searchParams.get('v')) {
          return url.searchParams.get('v');
        }

        if (pathParts[0] === 'embed' && pathParts[1]) {
          return pathParts[1];
        }

        if (pathParts[0] === 'shorts' && pathParts[1]) {
          return pathParts[1];
        }
      }
    }
  }

  return null;
};

const Post: SFC<PostProps> = ({className, highlightedCommentId, post}) => {
  const [animateLike, setAnimateLike] = useState(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [likesModalIsOpen, toggleLikesModal] = useToggle(false);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const requireAuthentication = useRequireAuthentication();
  const self = useSelector(getSelf);

  const {
    content,
    created_date,
    id,
    images,
    is_liked,
    like_count,
    mentioned_users,
    owner,
    price_amount,
    price_currency,
    recipient,
    tip_amounts: coin_transfer_amounts,
  } = post;
  const isLongContent = content.length > CONTENT_PREVIEW_LENGTH;
  const isTransferPost = !!(recipient && price_amount && price_currency);
  const isOwner = owner.id === self.id;
  const youtubeVideoId = extractYouTubeVideoId(content);
  const commentsForPost = Object.values(comments)
    .filter((comment) => comment.post === id)
    .sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());

  const handleCommentToggleClick = () => {
    setIsOpenCommentBox(!isOpenCommentBox);
  };

  const handleCopyAsJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify({...post, comments: commentsForPost}, null, 2));
      displayToast('Post JSON copied.', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error copying post JSON');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      displayToast('Post deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting post');
    }
  };

  const handleGoToPost = () => {
    navigate(`/posts/${id}`);
  };

  const handleLikeClick = async () => {
    if (!requireAuthentication('like this post')) return;

    try {
      if (is_liked) {
        await dispatch(unlikePost(id));
      } else {
        // Trigger animation only when liking
        setAnimateLike(true);
        setTimeout(() => setAnimateLike(false), 600);
        await dispatch(likePost(id));
      }
    } catch (error) {
      displayErrorToast('Error updating like status');
    }
  };

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  const menuOptions = [
    {
      label: 'Go to post',
      onClick: handleGoToPost,
    },
    {
      label: 'Copy as JSON',
      onClick: handleCopyAsJson,
    },
    ...(isOwner
      ? [
          {
            label: 'Edit',
            onClick: togglePostModal,
          },
        ]
      : []),
    ...(isOwner
      ? [
          {
            label: 'Delete',
            onClick: handleDelete,
          },
        ]
      : []),
  ];

  const renderDropdownMenu = () => {
    if (menuOptions.length === 0) return null;
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <>
      <S.Container {...analyticsArea('post')} className={className}>
        <S.Top>
          <S.UserLabel
            avatar={owner.avatar}
            avatarSize="40px"
            description={shortDate(created_date, true)}
            id={owner.id}
            username={owner.username}
          />
          {renderDropdownMenu()}
        </S.Top>
        {isTransferPost && (
          <TransferInfo
            owner={owner}
            priceAmount={price_amount!}
            priceCurrency={price_currency!}
            recipient={recipient!}
          />
        )}
        <S.Content>
          <S.TextContent>
            <ContentWithMentions
              content={
                isLongContent && !showFullContent ? content.substring(0, CONTENT_PREVIEW_LENGTH) + '...' : content
              }
              mentionedUsers={mentioned_users || []}
            />
            {isLongContent && (
              <S.TextLink
                {...analyticsTarget('see_more')}
                aria-expanded={showFullContent}
                onClick={toggleShowFullContent}
                type="button"
              >
                {showFullContent ? 'See less' : 'See more'}
              </S.TextLink>
            )}
          </S.TextContent>
        </S.Content>
        {youtubeVideoId ? (
          <S.VideoWrapper>
            <S.VideoPlayer
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
            />
          </S.VideoWrapper>
        ) : null}
        <PostImages images={images} />
        <S.ActionsContainer>
          <S.ActionsLeft>
            <S.LikeWrapper>
              <S.LikeButton
                {...analyticsTarget('like')}
                $animate={animateLike}
                $isLiked={is_liked}
                aria-label="Like"
                aria-pressed={is_liked}
                onClick={handleLikeClick}
                type="button"
              >
                <S.LikeIcon
                  $animate={animateLike}
                  icon={is_liked ? mdiHeart : mdiHeartOutline}
                  size={20}
                  totalSize="unset"
                />
              </S.LikeButton>
              <S.LikeCount {...analyticsTarget('like_count')} onClick={toggleLikesModal} type="button">
                {like_count.toLocaleString()} {like_count === 1 ? 'like' : 'likes'}
              </S.LikeCount>
            </S.LikeWrapper>
            <S.CommentToggle
              {...analyticsTarget('comments')}
              aria-expanded={isOpenCommentBox}
              onClick={handleCommentToggleClick}
              type="button"
            >
              <S.ActionIcon icon={mdiCommentTextOutline} size={18} totalSize="unset" />
              {isOpenCommentBox ? 'Hide Comments' : 'Comment'}
            </S.CommentToggle>
          </S.ActionsLeft>
          {coin_transfer_amounts && coin_transfer_amounts.length > 0 && (
            <S.TipAmounts tipAmounts={coin_transfer_amounts} />
          )}
        </S.ActionsContainer>
        {isOpenCommentBox && <Comments highlightedCommentId={highlightedCommentId} postId={post.id} />}
      </S.Container>
      {likesModalIsOpen ? <PostLikesModal close={toggleLikesModal} postId={post.id} /> : null}
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
    </>
  );
};

export default Post;

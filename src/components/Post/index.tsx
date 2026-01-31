import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCommentTextOutline, mdiDotsVertical, mdiHeart, mdiHeartOutline} from '@mdi/js';

import ContentWithMentions from 'components/ContentWithMentions';
import OutlineButton from 'components/OutlineButton';
import UserLabel from 'components/UserLabel';
import {deletePost, likePost, unlikePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import PostLikesModal from 'modals/PostLikesModal';
import PostModal from 'modals/PostModal';
import {getComments, getSelf} from 'selectors/state';
import {AppDispatch, Comment as TComment, Post as TPost, SFC} from 'types';
import {longDate, shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';

import Comments from './Comments';
import * as S from './Styles';
import CoinTransferAmounts from './TipAmounts';
import TransferInfo from './TransferInfo';

export interface PostProps {
  post: TPost;
}

type CoinTransferAmount = {
  currency: {
    ticker: string;
  };
  total_amount: number;
};

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

const formatAmountWithTicker = (amount: number, ticker: string): string => {
  return `${amount.toLocaleString()} ${ticker}`;
};

const getCommentCoinTransferLine = (comment: TComment): string | null => {
  if (!comment.price_amount || !comment.price_currency) return null;
  return `Coin transfer: ${formatAmountWithTicker(comment.price_amount, comment.price_currency.ticker)}`;
};

const getPostCoinTransferLines = (transferAmounts: CoinTransferAmount[]): string[] => {
  if (!transferAmounts || transferAmounts.length === 0) return [];
  return transferAmounts.map(
    (transfer) => `- ${formatAmountWithTicker(transfer.total_amount, transfer.currency.ticker)}`,
  );
};

const sortCommentsByDate = (comments: TComment[]): TComment[] => {
  return [...comments].sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
};

const buildConversationMarkdown = (
  post: TPost,
  comments: TComment[],
  transferAmounts: CoinTransferAmount[],
): string => {
  const lines: string[] = [];
  const coinTransferLines = getPostCoinTransferLines(transferAmounts);
  const isTransferPost = !!(post.recipient && post.price_amount && post.price_currency);

  lines.push(`# Post by @${post.owner.username}`);
  lines.push(`- Post ID: ${post.id}`);
  lines.push(`- Created: ${longDate(post.created_date)}`);

  if (post.image) {
    lines.push(`- Image: ${post.image}`);
  }

  if (isTransferPost) {
    lines.push(
      `- Transfer: @${post.owner.username} sent ${formatAmountWithTicker(
        post.price_amount!,
        post.price_currency!.ticker,
      )} to @${post.recipient!.username}`,
    );
  }

  lines.push('');
  lines.push('## Post');
  lines.push(post.content);

  if (coinTransferLines.length) {
    lines.push('');
    lines.push('## Coin Transfers');
    lines.push(...coinTransferLines);
  }

  lines.push('');
  lines.push(`## Comments (${comments.length})`);

  if (comments.length === 0) {
    return lines.join('\n');
  }

  comments.forEach((comment, index) => {
    const commentCoinTransferLine = getCommentCoinTransferLine(comment);

    lines.push('');
    lines.push(`### ${index + 1}. @${comment.owner.username}`);
    lines.push(`- Created: ${longDate(comment.created_date)}`);

    if (commentCoinTransferLine) {
      lines.push(`- ${commentCoinTransferLine}`);
    }

    lines.push('');
    lines.push(comment.content);
  });

  return lines.join('\n');
};

const Post: SFC<PostProps> = ({className, post}) => {
  const [animateLike, setAnimateLike] = useState(false);
  const [imageModalIsOpen, toggleImageModal] = useToggle(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [likesModalIsOpen, toggleLikesModal] = useToggle(false);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {
    content,
    created_date,
    id,
    image,
    is_liked,
    like_count,
    mentioned_users,
    owner,
    price_amount,
    price_currency,
    recipient,
    tip_amounts: coin_transfer_amounts,
  } = post;
  const isTransferPost = !!(recipient && price_amount && price_currency);
  const isOwner = owner.id === self.id;
  const isStaff = self.is_staff;
  const youtubeVideoId = extractYouTubeVideoId(content);
  const commentsForPost = sortCommentsByDate(Object.values(comments).filter((comment) => comment.post === id));

  const handleCopyForLlm = async () => {
    try {
      await navigator.clipboard.writeText(buildConversationMarkdown(post, commentsForPost, coin_transfer_amounts));
      displayToast('Conversation copied for LLM.', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error copying conversation');
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

  const handleLikeClick = async () => {
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

  const handlePostImageClick = () => {
    toggleImageModal();
  };

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  const menuOptions = [
    ...(isStaff
      ? [
          {
            label: 'Copy for LLM',
            onClick: handleCopyForLlm,
          },
        ]
      : []),
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
      <S.Container className={className}>
        <S.Top>
          <UserLabel
            avatar={owner.avatar}
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
          {showFullContent || content.length <= 400 ? (
            <>
              <S.TextContent>
                <ContentWithMentions content={content} mentionedUsers={mentioned_users || []} />
                {content.length > 400 && <S.TextLink onClick={toggleShowFullContent}>See less</S.TextLink>}
              </S.TextContent>
            </>
          ) : (
            <>
              <S.TextContent>
                <ContentWithMentions
                  content={content.substring(0, 400) + '...'}
                  mentionedUsers={mentioned_users || []}
                />{' '}
                <S.TextLink onClick={toggleShowFullContent}>See more</S.TextLink>
              </S.TextContent>
            </>
          )}
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
        {image ? <S.Image alt="image" onClick={handlePostImageClick} src={image} /> : null}
        <S.ActionsContainer>
          <S.ActionsLeft>
            <S.LikeWrapper>
              <S.LikeButton $animate={animateLike} onClick={handleLikeClick}>
                <S.LikeIcon
                  $animate={animateLike}
                  $isLiked={is_liked}
                  icon={is_liked ? mdiHeart : mdiHeartOutline}
                  size={20}
                />
              </S.LikeButton>
              <S.LikeCount onClick={toggleLikesModal}>
                {like_count} {like_count === 1 ? 'like' : 'likes'}
              </S.LikeCount>
            </S.LikeWrapper>
            <OutlineButton
              iconLeft={mdiCommentTextOutline}
              onClick={() => setIsOpenCommentBox(!isOpenCommentBox)}
              text={isOpenCommentBox ? 'Hide Comments' : 'Comment'}
            />
          </S.ActionsLeft>
          {coin_transfer_amounts && coin_transfer_amounts.length > 0 && (
            <CoinTransferAmounts tipAmounts={coin_transfer_amounts} />
          )}
        </S.ActionsContainer>
        {isOpenCommentBox && <Comments postId={post.id} />}
      </S.Container>
      {imageModalIsOpen && image ? <FullScreenImageModal close={toggleImageModal} imageSrc={image} /> : null}
      {likesModalIsOpen ? <PostLikesModal close={toggleLikesModal} postId={post.id} /> : null}
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
    </>
  );
};

export default Post;

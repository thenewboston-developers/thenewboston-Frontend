import {KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import EmojiPicker from 'components/EmojiPicker';
import MentionTextarea from 'components/MentionTextarea';
import {createComment, syncPostComments} from 'dispatchers/comments';
import {useToggle} from 'hooks';
import CurrencySelectModal from 'modals/CurrencySelectModal';
import rootRouter from 'routers/rootRouter';
import {getComments, getManager, getSelf} from 'selectors/state';
import {AppDispatch, Comment as TComment, SFC, UserReadSerializer} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import Comment from './Comment';
import * as S from './Styles';

const AUTO_SCROLL_THRESHOLD_PX = 80;

type CommentConnectionStatus = 'connected' | 'disconnected' | 'error' | 'syncing';

const COMMENT_CONNECTION_LABELS: Record<CommentConnectionStatus, string> = {
  connected: 'Connected',
  disconnected: 'Disconnected',
  error: 'Error',
  syncing: 'Syncing',
};

export interface CommentsProps {
  composerAvatar: string | null;
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, composerAvatar, postId}) => {
  const [commentConnectionStatus, setCommentConnectionStatus] = useState<CommentConnectionStatus>('disconnected');
  const [currencySelectModalIsOpen, toggleCurrencySelectModal] = useToggle(false);
  const [hasCommentHistoryOverflow, setHasCommentHistoryOverflow] = useState(false);
  const [isCommentInputFocused, setIsCommentInputFocused] = useState(false);
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>([]);
  const [optimisticComments, setOptimisticComments] = useState<TComment[]>([]);
  const commentPaneRef = useRef<HTMLDivElement | null>(null);
  const isCommentInputFocusedRef = useRef(false);
  const manualSocketCloseRef = useRef(false);
  const nextOptimisticCommentIdRef = useRef(-1);
  const previousCommentCountRef = useRef(0);
  const shouldAutoscrollRef = useRef(true);
  const socketRef = useRef<WebSocket | null>(null);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const self = useSelector(getSelf);

  const persistedCommentList = useMemo(() => {
    return Object.values(comments)
      .filter(({post}) => post === postId)
      .sort((commentA, commentB) => {
        const createdDateDifference =
          new Date(commentA.created_date).getTime() - new Date(commentB.created_date).getTime();
        if (createdDateDifference !== 0) return createdDateDifference;
        return commentA.id - commentB.id;
      });
  }, [comments, postId]);

  const commentList = useMemo(() => {
    const deduplicatedOptimisticComments = optimisticComments.filter((optimisticComment) => {
      return !persistedCommentList.some((persistedComment) => {
        const createdDateDifference = Math.abs(
          new Date(persistedComment.created_date).getTime() - new Date(optimisticComment.created_date).getTime(),
        );
        const optimisticPriceCurrencyId = optimisticComment.price_currency?.id || null;
        const persistedPriceCurrencyId = persistedComment.price_currency?.id || null;

        return (
          persistedComment.content === optimisticComment.content &&
          persistedComment.owner.id === optimisticComment.owner.id &&
          persistedComment.post === optimisticComment.post &&
          persistedComment.price_amount === optimisticComment.price_amount &&
          persistedPriceCurrencyId === optimisticPriceCurrencyId &&
          createdDateDifference < 5000
        );
      });
    });

    return [...persistedCommentList, ...deduplicatedOptimisticComments].sort((commentA, commentB) => {
      const createdDateDifference =
        new Date(commentA.created_date).getTime() - new Date(commentB.created_date).getTime();
      if (createdDateDifference !== 0) return createdDateDifference;
      return commentA.id - commentB.id;
    });
  }, [optimisticComments, persistedCommentList]);

  const initialValues = {
    content: '',
    price_amount: '',
  };

  type FormValues = typeof initialValues;

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, []);

  const closeCommentSocket = useCallback(() => {
    if (socketRef.current) {
      manualSocketCloseRef.current = true;
      socketRef.current.close();
      socketRef.current = null;
    }

    setCommentConnectionStatus('disconnected');
  }, []);

  const handleCommentPaneScroll = useCallback(() => {
    const commentPane = commentPaneRef.current;
    if (!commentPane) return;

    const distanceFromBottom = commentPane.scrollHeight - commentPane.scrollTop - commentPane.clientHeight;
    shouldAutoscrollRef.current = distanceFromBottom <= AUTO_SCROLL_THRESHOLD_PX;
  }, []);

  const handleCommentTextareaBlur = useCallback(() => {
    setIsCommentInputFocused(false);
  }, []);

  const handleCommentTextareaFocus = useCallback(() => {
    setIsCommentInputFocused(true);
  }, []);

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    const trimmedContent = values.content.trim();
    if (!trimmedContent) return;

    let price_amount = values.price_amount === '' ? null : parseInt(values.price_amount, 10);
    let price_currency = manager.activeCommentCurrency?.id || null;

    if (price_amount && !price_currency) {
      displayErrorToast('Please select a currency for the amount');
      return;
    }

    if (!price_amount || !price_currency) {
      price_amount = null;
      price_currency = null;
    }

    const requestData = {
      ...values,
      content: trimmedContent,
      mentioned_user_ids: mentionedUsers.map((user) => user.id),
      post: postId,
      price_amount,
      price_currency,
    };
    const optimisticCommentId = nextOptimisticCommentIdRef.current;
    nextOptimisticCommentIdRef.current -= 1;
    const optimisticOwner =
      self.id && self.username
        ? {
            avatar: self.avatar,
            banner: self.banner,
            bio: self.bio || '',
            connect_five_elo: self.connect_five_elo,
            discord_username: self.discord_username,
            facebook_username: self.facebook_username,
            github_username: self.github_username,
            id: self.id,
            instagram_username: self.instagram_username,
            is_staff: self.is_staff,
            linkedin_username: self.linkedin_username,
            pinterest_username: self.pinterest_username,
            reddit_username: self.reddit_username,
            tiktok_username: self.tiktok_username,
            twitch_username: self.twitch_username,
            username: self.username,
            x_username: self.x_username,
            youtube_username: self.youtube_username,
          }
        : null;
    const optimisticPriceCurrency =
      price_amount && price_currency && manager.activeCommentCurrency
        ? {
            id: manager.activeCommentCurrency.id,
            logo: manager.activeCommentCurrency.logo,
            ticker: manager.activeCommentCurrency.ticker,
          }
        : null;

    if (optimisticOwner) {
      const optimisticComment: TComment = {
        content: trimmedContent,
        created_date: new Date(),
        id: optimisticCommentId,
        mentioned_users: mentionedUsers,
        modified_date: new Date(),
        owner: optimisticOwner,
        post: postId,
        price_amount,
        price_currency: optimisticPriceCurrency,
      };
      setOptimisticComments((previousOptimisticComments) => [...previousOptimisticComments, optimisticComment]);
    }

    resetForm();
    setMentionedUsers([]);

    try {
      await dispatch(createComment(requestData));
      setOptimisticComments((previousOptimisticComments) =>
        previousOptimisticComments.filter(({id}) => id !== optimisticCommentId),
      );
    } catch (error) {
      setOptimisticComments((previousOptimisticComments) =>
        previousOptimisticComments.filter(({id}) => id !== optimisticCommentId),
      );
      const errorData = (error as {response?: {data?: unknown}}).response?.data;
      const errorText = JSON.stringify(errorData || '').toLowerCase();

      if (errorText.includes('insufficient funds')) {
        const tipCurrencyTicker = manager.activeCommentCurrency?.ticker;
        displayErrorToast(
          tipCurrencyTicker
            ? `You don't have enough ${tipCurrencyTicker} to send this tip amount`
            : "You don't have enough funds to send this tip amount",
        );
        return;
      }

      displayErrorToast('Error submitting the comment');
    }
  };

  const handleTipCurrencyButtonClick = useCallback(() => {
    toggleCurrencySelectModal();
  }, [toggleCurrencySelectModal]);

  const handleUpdateCommentHistoryOverflow = useCallback(() => {
    const commentPane = commentPaneRef.current;
    if (!commentPane) {
      setHasCommentHistoryOverflow(false);
      return;
    }

    const hasOverflow = commentPane.scrollHeight > commentPane.clientHeight + 1;
    setHasCommentHistoryOverflow((previousHasOverflow) =>
      previousHasOverflow === hasOverflow ? previousHasOverflow : hasOverflow,
    );
  }, []);

  const handleCommentTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>, submitForm: () => Promise<void>) => {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;

    event.preventDefault();
    submitForm();
  };

  const openCommentSocket = useCallback(() => {
    if (socketRef.current) return;

    manualSocketCloseRef.current = false;
    setCommentConnectionStatus('disconnected');

    const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}/ws/comments/${postId}`);
    socketRef.current = socket;

    socket.onclose = () => {
      const wasManualClose = manualSocketCloseRef.current;
      manualSocketCloseRef.current = false;

      if (socketRef.current === socket) {
        socketRef.current = null;
      }

      if (wasManualClose || !isCommentInputFocusedRef.current) {
        setCommentConnectionStatus('disconnected');
        return;
      }

      setCommentConnectionStatus('error');
    };

    socket.onerror = () => {
      if (!isCommentInputFocusedRef.current || socketRef.current !== socket) return;
      setCommentConnectionStatus('error');
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onopen = async () => {
      if (!isCommentInputFocusedRef.current || socketRef.current !== socket) return;

      setCommentConnectionStatus('syncing');

      try {
        await dispatch(syncPostComments(postId));

        if (!isCommentInputFocusedRef.current || socketRef.current !== socket) return;
        setCommentConnectionStatus('connected');
      } catch (error) {
        if (!isCommentInputFocusedRef.current || socketRef.current !== socket) return;
        setCommentConnectionStatus('error');
      }
    };
  }, [dispatch, postId]);

  const renderComments = () => {
    return commentList.map((comment: TComment) => <Comment comment={comment} key={comment.id} />);
  };

  const renderConnectionStatus = () => {
    return (
      <S.ConnectionStatusContainer>
        <S.ConnectionStatusLight $status={commentConnectionStatus} />
        {isCommentInputFocused ? (
          <S.ConnectionStatusLabel $status={commentConnectionStatus}>
            {COMMENT_CONNECTION_LABELS[commentConnectionStatus]}
          </S.ConnectionStatusLabel>
        ) : null}
      </S.ConnectionStatusContainer>
    );
  };

  const renderTipCurrencyControl = (errors: {[field: string]: string}, touched: {[field: string]: boolean}) => {
    if (!manager.activeCommentCurrency) {
      return (
        <S.TipCurrencyButton onClick={handleTipCurrencyButtonClick} type="button">
          Tip Currency
        </S.TipCurrencyButton>
      );
    }

    return (
      <S.PriceAmountInputContainer>
        <S.IconContainer onClick={handleTipCurrencyButtonClick}>
          <S.Image alt={`${manager.activeCommentCurrency.ticker} logo`} src={manager.activeCommentCurrency.logo} />
        </S.IconContainer>
        <S.PriceAmountInput errors={errors} name="price_amount" placeholder="Amount" touched={touched} type="number" />
      </S.PriceAmountInputContainer>
    );
  };

  useEffect(() => {
    isCommentInputFocusedRef.current = isCommentInputFocused;
  }, [isCommentInputFocused]);

  useEffect(() => {
    if (isCommentInputFocused) {
      openCommentSocket();
      return;
    }

    closeCommentSocket();
  }, [closeCommentSocket, isCommentInputFocused, openCommentSocket]);

  useEffect(() => {
    return () => {
      closeCommentSocket();
    };
  }, [closeCommentSocket]);

  useEffect(() => {
    requestAnimationFrame(() => {
      handleUpdateCommentHistoryOverflow();
    });
  }, [commentList, handleUpdateCommentHistoryOverflow]);

  useEffect(() => {
    window.addEventListener('resize', handleUpdateCommentHistoryOverflow);

    return () => {
      window.removeEventListener('resize', handleUpdateCommentHistoryOverflow);
    };
  }, [handleUpdateCommentHistoryOverflow]);

  useEffect(() => {
    const hasNewComment = commentList.length > previousCommentCountRef.current;
    previousCommentCountRef.current = commentList.length;

    if (!hasNewComment || !shouldAutoscrollRef.current) return;

    requestAnimationFrame(() => {
      const commentPane = commentPaneRef.current;
      if (!commentPane) return;

      commentPane.scrollTop = commentPane.scrollHeight;
      handleUpdateCommentHistoryOverflow();
      shouldAutoscrollRef.current = true;
    });
  }, [commentList.length, handleUpdateCommentHistoryOverflow]);

  return (
    <>
      <S.Container className={className}>
        {commentList.length ? (
          <>
            {hasCommentHistoryOverflow ? <S.SectionDivider $position="top" /> : null}
            <S.CommentHistorySection>
              <S.CommentHistory
                $hasOverflow={hasCommentHistoryOverflow}
                onScroll={handleCommentPaneScroll}
                ref={commentPaneRef}
              >
                {renderComments()}
              </S.CommentHistory>
            </S.CommentHistorySection>
            {hasCommentHistoryOverflow ? <S.SectionDivider $position="bottom" /> : null}
          </>
        ) : null}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({errors, submitForm, touched, values, setFieldValue}) => (
            <Form>
              <S.CommentForm>
                <S.ComposerInputRow>
                  <S.ComposerAvatar size="36px" src={composerAvatar} />
                  <S.MentionTextareaWrapper onBlur={handleCommentTextareaBlur} onFocus={handleCommentTextareaFocus}>
                    <MentionTextarea
                      dropdownYOffset={36}
                      errors={errors}
                      label=""
                      maxRows={4}
                      name="content"
                      onChange={(event) => setFieldValue('content', event.target.value)}
                      onKeyDown={(event) => handleCommentTextareaKeyDown(event, submitForm)}
                      onMentionedUsersChange={setMentionedUsers}
                      placeholder="Add a comment..."
                      touched={touched}
                      value={values.content}
                    />
                  </S.MentionTextareaWrapper>
                </S.ComposerInputRow>
                <S.ComposerToolsRow>
                  <S.ComposerToolsSpacer />
                  <S.ComposerToolsContent>
                    <S.ControlsLeft>
                      <EmojiPicker field="content" setFieldValue={setFieldValue} value={values.content} />
                      {renderTipCurrencyControl(errors, touched)}
                    </S.ControlsLeft>
                    {renderConnectionStatus()}
                  </S.ComposerToolsContent>
                </S.ComposerToolsRow>
              </S.CommentForm>
            </Form>
          )}
        </Formik>
      </S.Container>
      {currencySelectModalIsOpen ? <CurrencySelectModal close={() => toggleCurrencySelectModal(false)} /> : null}
    </>
  );
};

export default Comments;

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import Icon from '@mdi/react';
import {Formik, FormikHelpers, Form} from 'formik';
import {mdiChevronDown, mdiChevronUp, mdiEmoticonOutline, mdiPlusCircle, mdiSend} from '@mdi/js';

import Coin from 'assets/coin.svg';
import Comment from './Comment';
import CoreSelectModal from 'modals/CoreSelectModal';
import yup from 'utils/yup';
import {AppDispatch, Comment as TComment, SFC} from 'types';
import {ButtonColor, ButtonType} from 'components/Button';
import {breakpoints} from 'styles';
import {createComment} from 'dispatchers/comments';
import {displayErrorToast} from 'utils/toasts';
import {getComments, getManager} from 'selectors/state';
import {useToggle} from 'hooks';

import * as S from './Styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const [commentDetails, setCommentDetails] = useState<TComment[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isOpenEmojiBox, setIsOpenEmojiBox] = useState(false);
  const [coreSelectModalIsOpen, toggleCoreSelectModal] = useToggle(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(window.innerWidth <= parseInt(breakpoints.mini));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const initialValues = {
    content: '',
    price_amount: '',
  };

  type FormValues = typeof initialValues;

  const commentList = useMemo(() => {
    const _comments = Object.values(comments);
    return _comments.filter(({post}) => post === postId);
  }, [comments, postId]);

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      let price_amount = values.price_amount === '' ? null : parseInt(values.price_amount, 10);
      let price_core = manager.activeCommentCore?.id || null;

      if (!price_amount || !price_core) {
        price_amount = null;
        price_core = null;
      }

      const requestData = {
        ...values,
        post: postId,
        price_amount,
        price_core,
      };
      await dispatch(createComment(requestData));
      resetForm();
      setIsOpenEmojiBox(false);
    } catch (error) {
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return commentDetails.map((comment, index) => <Comment comment={comment} key={index} />);
  };

  const renderSelectCoreElement = () => {
    if (manager.activeCommentCore) {
      return (
        <S.IconContainer onClick={toggleMenu}>
          <S.Img alt="logo" src={manager.activeCommentCore.logo || Coin} />
          {coreSelectModalIsOpen ? (
            <S.IconRight path={mdiChevronUp} size="20px" />
          ) : (
            <S.IconRight path={mdiChevronDown} size="20px" />
          )}
        </S.IconContainer>
      );
    }

    return (
      <S.IconContainer onClick={toggleMenu}>
        <S.Icon path={mdiPlusCircle} size="24px" />
      </S.IconContainer>
    );
  };

  const toggleMenu = () => {
    toggleCoreSelectModal();
    setIsMenuOpen(!isMenuOpen);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required(),
    });
  }, []);

  useEffect(() => {
    const arr = commentList.slice(0, startIndex + 4);
    setCommentDetails(arr);
  }, [commentList, startIndex]);

  const handleComment = useCallback(() => {
    const nextIndex = startIndex + 4;
    if (nextIndex < commentList.length) {
      setStartIndex(nextIndex);
      setCommentDetails((prevDetails) => {
        const nextComments = commentList.slice(startIndex, nextIndex);
        return [...prevDetails, ...nextComments];
      });
    }
  }, [commentList, startIndex]);

  useEffect(() => {
    if (isOpenEmojiBox && document.querySelectorAll('.epr_-3yva2a').length > 0) {
      const emojiFooter = document.querySelectorAll('.epr_-3yva2a')[0];
      emojiFooter.remove();
    }
  }, [isOpenEmojiBox]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= parseInt(breakpoints.mini));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiBoxRef.current &&
        !emojiBoxRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpenEmojiBox(false);
      }
    };
    if (isOpenEmojiBox) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpenEmojiBox]);

  return (
    <>
      <S.Container className={className}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, isValid, touched, values, setFieldValue}) => (
            <Form>
              <S.InputBox>
                <S.ContentInput
                  errors={errors}
                  name="content"
                  placeholder="Add a comment..."
                  touched={touched}
                  $isMobileDevice={isMobileDevice}
                />
                {isOpenEmojiBox && (
                  <S.EmojiBox ref={emojiBoxRef}>
                    <EmojiPicker
                      width={isMobileDevice ? 250 : 280}
                      height={350}
                      skinTonesDisabled
                      onEmojiClick={(e) => {
                        const updatedValue = values.content + e.emoji;
                        setFieldValue('content', updatedValue);
                      }}
                    />
                  </S.EmojiBox>
                )}
                <S.Wrapper>
                  <S.EmojiButton
                    ref={emojiButtonRef}
                    $isOpenEmojiBox={isOpenEmojiBox}
                    onClick={() => setIsOpenEmojiBox(!isOpenEmojiBox)}
                    type="button"
                  >
                    <Icon path={mdiEmoticonOutline} size="24px" />
                  </S.EmojiButton>
                  {!isMobileDevice && (
                    <S.PriceAmountInputContainer>
                      {renderSelectCoreElement()}
                      <S.PriceAmountInput
                        errors={errors}
                        name="price_amount"
                        placeholder="Amount"
                        touched={touched}
                        type="number"
                      />
                    </S.PriceAmountInputContainer>
                  )}

                  <S.Button
                    color={ButtonColor.secondary}
                    dirty={dirty}
                    disabled={isSubmitting}
                    iconLeft={mdiSend}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    text=""
                    type={ButtonType.submit}
                  />
                </S.Wrapper>
              </S.InputBox>
              {isMobileDevice && (
                <S.Box>
                  <S.PriceAmountInputContainer>
                    {renderSelectCoreElement()}
                    <S.PriceAmountInput
                      errors={errors}
                      name="price_amount"
                      placeholder="Amount"
                      touched={touched}
                      type="number"
                    />
                  </S.PriceAmountInputContainer>
                </S.Box>
              )}
            </Form>
          )}
        </Formik>
        {renderComments()}
        {commentList.length > commentDetails.length && (
          <S.Content>
            <S.Div />
            <S.CommentBtn
              text={`Show ${Math.min(4, commentList.length - commentDetails.length)} more comments`}
              color={ButtonColor.secondary}
              onClick={handleComment}
            />
            <S.Div />
          </S.Content>
        )}
      </S.Container>
      {coreSelectModalIsOpen ? <CoreSelectModal close={toggleCoreSelectModal} /> : null}
    </>
  );
};

export default Comments;

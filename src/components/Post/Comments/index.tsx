import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiChevronDown, mdiChevronUp, mdiEmoticonOutline, mdiPlusCircle, mdiSend} from '@mdi/js';
import Icon from '@mdi/react';
import EmojiPicker from 'emoji-picker-react';
import {Form, Formik, FormikHelpers} from 'formik';

import {ButtonColor, ButtonType} from 'components/Button';
import OutlineButton from 'components/OutlineButton';
import {createComment} from 'dispatchers/comments';
import {useToggle} from 'hooks';
import CurrencySelectModal from 'modals/CurrencySelectModal';
import {getComments, getManager} from 'selectors/state';
import {breakpoints} from 'styles';
import {AppDispatch, Comment as TComment, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import Comment from './Comment';
import * as S from './Styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const [commentDetails, setCommentDetails] = useState<TComment[]>([]);
  const [currencySelectModalIsOpen, toggleCurrencySelectModal] = useToggle(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(window.innerWidth <= parseInt(breakpoints.mini));
  const [isOpenEmojiBox, setIsOpenEmojiBox] = useState(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const emojiBoxRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required(),
    });
  }, []);

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
    const arr = commentList.slice(0, startIndex + 4);
    setCommentDetails(arr);
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

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      let price_amount = values.price_amount === '' ? null : parseInt(values.price_amount, 10);
      let price_currency = manager.activeCommentCurrency?.id || null;

      if (!price_amount || !price_currency) {
        price_amount = null;
        price_currency = null;
      }

      const requestData = {
        ...values,
        post: postId,
        price_amount,
        price_currency,
      };
      await dispatch(createComment(requestData));
      resetForm();
      setIsOpenEmojiBox(false);
    } catch (error) {
      displayErrorToast('Error submitting the comment');
    }
  };

  const toggleMenu = () => {
    toggleCurrencySelectModal();
    setIsMenuOpen(!isMenuOpen);
  };

  const renderComments = () => {
    return commentDetails.map((comment, index) => <Comment comment={comment} key={index} />);
  };

  const renderSelectCurrencyElement = () => {
    if (manager.activeCommentCurrency) {
      return (
        <S.IconContainer onClick={toggleMenu}>
          <S.Img alt="logo" src={manager.activeCommentCurrency.logo} />
          {currencySelectModalIsOpen ? (
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
                  $isMobileDevice={isMobileDevice}
                  errors={errors}
                  name="content"
                  placeholder="Add a comment..."
                  touched={touched}
                />
                {isOpenEmojiBox && (
                  <S.EmojiBox ref={emojiBoxRef}>
                    <EmojiPicker
                      height={350}
                      onEmojiClick={(e) => {
                        const updatedValue = values.content + e.emoji;
                        setFieldValue('content', updatedValue);
                      }}
                      skinTonesDisabled
                      width={isMobileDevice ? 250 : 280}
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
                      {renderSelectCurrencyElement()}
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
                    {renderSelectCurrencyElement()}
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
            <OutlineButton
              onClick={handleComment}
              text={`Show ${Math.min(4, commentList.length - commentDetails.length)} more comments`}
            />
            <S.Div />
          </S.Content>
        )}
      </S.Container>
      {currencySelectModalIsOpen ? <CurrencySelectModal close={toggleCurrencySelectModal} /> : null}
    </>
  );
};

export default Comments;

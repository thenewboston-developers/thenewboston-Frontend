import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';
import Icon from '@mdi/react';
import EmojiPicker from 'emoji-picker-react';
import {mdiChevronDown, mdiChevronUp, mdiEmoticonOutline, mdiPlusCircle, mdiSend} from '@mdi/js';

import Coin from 'assets/coin.svg';

import {ButtonColor, ButtonType} from 'components/Button';
import {createComment} from 'dispatchers/comments';
import {useToggle} from 'hooks';
import CoreSelectModal from 'modals/CoreSelectModal';
import {getComments, getManager} from 'selectors/state';
import {AppDispatch, Comment as TComment, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import Comment from './Comment';
import * as S from './Styles';
import {breakpoints} from 'styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const [commentDetails, setCommentDetails] = useState<TComment[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isOpenEmojiBox, setIsOpenEmojiBox] = useState(false);
  const [coreSelectModalIsOpen, toggleCoreSelectModal] = useToggle(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const miniDevice = breakpoints;

  const initialValues = {
    content: '',
    price_amount: '',
  };

  type FormValues = typeof initialValues;

  const commentList = useMemo(() => {
    const _comments = orderBy(Object.values(comments), ['created_date'], ['desc']);
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
      console.error(error);
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
        const nextComments = commentList.slice(0, nextIndex + 4);
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
            <S.Form>
              <S.ContentInput errors={errors} name="content" placeholder="Add a comment..." touched={touched} />
              {isOpenEmojiBox && (
                <S.EmojiBox>
                  <EmojiPicker
                    width={miniDevice.mini ? 270 : 350}
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
                  $isOpenEmojiBox={isOpenEmojiBox}
                  onClick={() => setIsOpenEmojiBox(!isOpenEmojiBox)}
                  type="button"
                >
                  <Icon path={mdiEmoticonOutline} size="24px" />
                </S.EmojiButton>
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
                <S.Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text=""
                  color={ButtonColor.secondary}
                  iconLeft={mdiSend}
                  type={ButtonType.submit}
                />
              </S.Wrapper>
            </S.Form>
          )}
        </Formik>
        {renderComments()}
        {commentList.length > 4 && (
          <S.Content>
            <S.Div />
            <S.CommentBtn text="Show 4 more comments" color={ButtonColor.secondary} onClick={handleComment} />
            <S.Div />
          </S.Content>
        )}
      </S.Container>
      {coreSelectModalIsOpen ? <CoreSelectModal close={toggleCoreSelectModal} /> : null}
    </>
  );
};

export default Comments;

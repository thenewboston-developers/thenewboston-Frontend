import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiPlusCircle, mdiSend} from '@mdi/js';
import {Form, Formik, FormikHelpers} from 'formik';

import {ButtonColor, ButtonType} from 'components/Button';
import EmojiPicker from 'components/EmojiPicker';
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
  const [startIndex, setStartIndex] = useState<number>(0);
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required('Content is required'),
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
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= parseInt(breakpoints.mini));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
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
        post: postId,
        price_amount,
        price_currency,
      };
      await dispatch(createComment(requestData));
      resetForm();
    } catch (error) {
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return commentDetails.map((comment, index) => <Comment comment={comment} isFirst={index === 0} key={index} />);
  };

  const renderSelectCurrencyElement = () => {
    if (manager.activeCommentCurrency) {
      return (
        <S.IconContainer onClick={toggleMenu}>
          <S.Image alt="logo" src={manager.activeCommentCurrency.logo} />
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
    toggleCurrencySelectModal();
    setIsMenuOpen(!isMenuOpen);
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
              <S.CommentForm>
                <S.ContentInput
                  $isMobileDevice={isMobileDevice}
                  errors={errors}
                  name="content"
                  placeholder="Add a comment..."
                  touched={touched}
                />
                <S.ControlsWrapper>
                  <EmojiPicker field="content" setFieldValue={setFieldValue} value={values.content} />
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
                </S.ControlsWrapper>
              </S.CommentForm>
            </Form>
          )}
        </Formik>
        {renderComments()}
        {commentList.length > commentDetails.length && (
          <S.Content>
            <S.Divider />
            <OutlineButton
              onClick={handleComment}
              text={`Show ${Math.min(4, commentList.length - commentDetails.length)} more comments`}
            />
            <S.Divider />
          </S.Content>
        )}
      </S.Container>
      {currencySelectModalIsOpen ? <CurrencySelectModal close={() => toggleCurrencySelectModal(false)} /> : null}
    </>
  );
};

export default Comments;

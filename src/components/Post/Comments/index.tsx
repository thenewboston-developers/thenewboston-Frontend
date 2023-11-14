import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import {createComment} from 'dispatchers/comments';
import {getComments, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Comment from './Comment';
import * as S from './Styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

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
      const requestData = {
        ...values,
        post: postId,
        price_amount: values.price_amount === '' ? null : parseInt(values.price_amount, 10),
        price_core: 4, // TODO: Change
      };
      await dispatch(createComment(requestData));
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return commentList.map((comment) => <Comment comment={comment} key={comment.id} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <S.Form>
            <Avatar src={self.avatar} />
            <S.ContentInput errors={errors} name="content" placeholder="Add a comment..." touched={touched} />
            <S.PriceAmountInput errors={errors} name="price_amount" placeholder="Amount" touched={touched} />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </S.Form>
        )}
      </Formik>
      {renderComments()}
    </S.Container>
  );
};

export default Comments;

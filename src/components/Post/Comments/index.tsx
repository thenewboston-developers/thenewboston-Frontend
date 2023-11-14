import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';
import {mdiPlusCircle} from '@mdi/js';

import Coin from 'assets/coin.svg';
import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import {createComment} from 'dispatchers/comments';
import {useToggle} from 'hooks';
import SelectCoreModal from 'modals/SelectCoreModal';
import {getComments, getManager, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Comment from './Comment';
import * as S from './Styles';

export interface CommentsProps {
  postId: number;
}

const Comments: SFC<CommentsProps> = ({className, postId}) => {
  const [selectCoreModalIsOpen, toggleSelectCoreModal] = useToggle(false);
  const comments = useSelector(getComments);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
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
    } catch (error) {
      console.error(error);
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return commentList.map((comment) => <Comment comment={comment} key={comment.id} />);
  };

  const renderSelectCoreElement = () => {
    if (manager.activeCommentCore) {
      return <S.Img alt="logo" onClick={toggleSelectCoreModal} src={manager.activeCommentCore.logo || Coin} />;
    }

    return (
      <S.IconContainer onClick={toggleSelectCoreModal}>
        <S.Icon path={mdiPlusCircle} size="24px" />
      </S.IconContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required(),
    });
  }, []);

  return (
    <>
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
              <S.PriceAmountInput
                errors={errors}
                name="price_amount"
                placeholder="Amount"
                touched={touched}
                type="number"
              />
              {renderSelectCoreElement()}
              <S.Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text=""
                type={ButtonType.submit}
              />
            </S.Form>
          )}
        </Formik>
        {renderComments()}
      </S.Container>
      {selectCoreModalIsOpen ? <SelectCoreModal close={toggleSelectCoreModal} /> : null}
    </>
  );
};

export default Comments;

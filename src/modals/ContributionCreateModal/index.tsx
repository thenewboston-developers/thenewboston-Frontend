import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {AppDispatch, SFC} from 'types';
import {createContribution} from 'dispatchers/contributions';
import {displayErrorToast, displayToast} from 'utils/toasts';
import {Form, Formik} from 'formik';
import {ToastType} from 'enums';
import Button, {ButtonType} from 'components/Button';
import yup from 'utils/yup';

import * as S from './Styles';

export interface ContributionCreateModalProps {
  close(): void;
}

const ContributionCreateModal: SFC<ContributionCreateModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    description: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = {
        description: values.description,
      };
      await dispatch(createContribution(requestData));
      displayToast('Contribution successfully added.', ToastType.SUCCESS);
      close();
    } catch (error: any) {
      console.error(error);
      displayErrorToast(error?.response?.data || 'Error adding contribution');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required('Description is required'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={'Add Contribution'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Textarea
              errors={errors}
              label="Description"
              name="description"
              placeholder="Please type your contribution's description here"
              touched={touched}
            />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Add"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ContributionCreateModal;

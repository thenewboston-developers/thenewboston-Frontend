import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {createCore} from 'dispatchers/cores';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface CoreModalProps {
  close(): void;
}

const CoreModal: SFC<CoreModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    domain: '',
    ticker: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('domain', values.domain);
      formData.append('ticker', values.ticker);
      await dispatch(createCore(values));
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      domain: yup.string().required(),
      ticker: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Add Core">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Input errors={errors} label="Domain" name="domain" touched={touched} />
            <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default CoreModal;

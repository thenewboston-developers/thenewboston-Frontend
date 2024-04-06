import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {createCore, updateCore} from 'dispatchers/cores';
import {AppDispatch, Core, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import * as S from './Styles';

export interface CoreModalProps {
  close(): void;
  core?: Core;
}

const CoreModal: SFC<CoreModalProps> = ({className, close, core}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    domain: core?.domain || '',
    ticker: core?.ticker || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('domain', values.domain);
      requestData.append('ticker', values.ticker);

      if (core) {
        await dispatch(updateCore(core.id, requestData));
      } else {
        await dispatch(createCore(requestData));
      }

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
    <S.Modal className={className} close={close} header={core ? 'Edit Core' : 'Add Core'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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

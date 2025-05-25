import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {createInvitation, updateInvitation} from 'dispatchers/invitations';
import {ToastType} from 'enums';
import {Form, Formik} from 'formik';
import {AppDispatch, Invitation, SFC} from 'types';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface InvitationModalProps {
  close(): void;
  invitation?: Invitation;
}

const InvitationModal: SFC<InvitationModalProps> = ({className, close, invitation}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      note: invitation?.note || '',
    }),
    [invitation?.note],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      if (invitation) {
        await dispatch(updateInvitation(invitation.id, values));
        displayToast('Invitation updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createInvitation(values));
        displayToast('Invitation created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      const verb = invitation ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} invitation`);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      note: yup.string(),
    });
  }, []);

  const verb = invitation ? 'Update' : 'Create';

  return (
    <S.Modal className={className} close={close} header={`${verb} Invitation`}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Note" name="note" touched={touched} />
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

export default InvitationModal;

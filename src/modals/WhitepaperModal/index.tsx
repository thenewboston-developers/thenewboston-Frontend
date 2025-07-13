import {useState} from 'react';
import {Form, Formik} from 'formik';

import {createWhitepaper, updateWhitepaper} from 'api/whitepapers';
import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {ModalFooterButton} from 'components/Modal';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {ToastType} from 'enums';
import {Currency, SFC, Whitepaper} from 'types';
import {renderMarkdown} from 'utils/markdown';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface WhitepaperModalProps {
  close(): void;
  currency: Currency;
  onSuccess?: () => void;
  whitepaper: Whitepaper | null;
}

const WhitepaperModal: SFC<WhitepaperModalProps> = ({className, close, currency, onSuccess, whitepaper}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const initialValues = {
    content: whitepaper?.content || '',
  };

  const validationSchema = yup.object().shape({
    content: yup.string().required('Content is required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (whitepaper) {
        await updateWhitepaper(whitepaper.id, {content: values.content});
        displayToast('Whitepaper updated!', ToastType.SUCCESS);
      } else {
        await createWhitepaper({currency: currency.id, content: values.content});
        displayToast('Whitepaper created!', ToastType.SUCCESS);
      }
      onSuccess?.();
      close();
    } catch (error) {
      displayErrorToast('Error saving whitepaper');
    }
  };

  return (
    <S.Modal className={className} close={close} header={whitepaper ? 'Edit Whitepaper' : 'Create Whitepaper'}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched, values}) => (
          <Form>
            <S.TabsContainer>
              <Tabs>
                <Tab isActive={activeTab === 'write'} onClick={() => setActiveTab('write')}>
                  Write
                </Tab>
                <Tab isActive={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
                  Preview
                </Tab>
              </Tabs>
            </S.TabsContainer>

            {activeTab === 'write' ? (
              <S.Textarea
                errors={errors}
                label="Content (Markdown supported)"
                name="content"
                placeholder="Enter your whitepaper content here..."
                touched={touched}
              />
            ) : (
              <S.PreviewContainer>
                {values.content ? (
                  // eslint-disable-next-line react/no-danger
                  <div dangerouslySetInnerHTML={{__html: renderMarkdown(values.content)}} />
                ) : (
                  <p>No content to preview</p>
                )}
              </S.PreviewContainer>
            )}

            <S.ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text={whitepaper ? 'Update' : 'Create'}
                type={ButtonType.submit}
              />
            </S.ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default WhitepaperModal;

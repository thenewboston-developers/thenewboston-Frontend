import React, {useMemo, useState} from 'react';
import {Field, Formik} from 'formik';
import {createOpenAIImage} from 'api/openaiImages';
import {ButtonType} from 'components/Button';
import {Textarea} from 'components/FormElements';
import {CreateOpenAIImageResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import ImageCarousel from './ImageCarousel';
import * as S from './Styles';
import {useSelector} from 'react-redux';
import {getWallets} from 'selectors/state';
import {orderBy} from 'lodash-es';

const Create: SFC = ({className}) => {
  const [createOpenAIImageResponse, setCreateOpenAIImageResponse] = useState<CreateOpenAIImageResponse | null>(null);
  const [description, setDescription] = useState('');
  const wallets = useSelector(getWallets);

  const availableBalance = useMemo(
    () => orderBy(Object.values(wallets), [(wallet) => wallet.core.ticker]),
    [wallets],
  )[0].balance;

  const initialValues = {
    description: '',
    quantity: '1',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const results = await createOpenAIImage({description: values.description, quantity: +values.quantity});
      setCreateOpenAIImageResponse(results);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error generating art');
    }
  };

  const renderImageCarousel = () => {
    if (!createOpenAIImageResponse) return null;
    const imageUrls = createOpenAIImageResponse.data.map(({url}) => url);
    return <ImageCarousel description={description} imageUrls={imageUrls} />;
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      quantity: yup.number().min(1).max(10).required().integer(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, handleChange, isSubmitting, isValid, values, touched}) => {
          return (
            <S.Form>
              <S.Card>
                <Textarea
                  errors={errors}
                  label="Description"
                  onChange={(e) => {
                    handleChange(e);
                    setDescription(e.target.value);
                  }}
                  name="description"
                  touched={touched}
                  placeholder="Please type here"
                />
              </S.Card>
              <S.Card>
                <S.CardHeader>Image Quantity</S.CardHeader>
                <S.RadioGroup className="radio-group">
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="1" onChange={handleChange} />
                    <span>1</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="2" onChange={handleChange} />
                    <span>2</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="3" onChange={handleChange} />
                    <span>3</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="4" onChange={handleChange} />
                    <span>4</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="5" onChange={handleChange} />
                    <span>5</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="6" onChange={handleChange} />
                    <span>6</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="7" onChange={handleChange} />
                    <span>7</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="8" onChange={handleChange} />
                    <span>8</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="9" onChange={handleChange} />
                    <span>9</span>
                  </label>
                  <label className="radio-option">
                    <Field type="radio" name="quantity" value="10" onChange={handleChange} />
                    <span>10</span>
                  </label>
                </S.RadioGroup>
              </S.Card>
              <S.Card>
                <S.BottomContainer>
                  <S.Row>
                    <h3>Available</h3>
                    <span>{availableBalance.toLocaleString('en-US')} TNB</span>
                  </S.Row>
                  <S.Row>
                    <h3>1 image generation fee</h3>
                    <span>1 TNB</span>
                  </S.Row>
                  <S.Row>
                    <h3>Total fee</h3>
                    <span>{+values.quantity * 1} TNB</span>
                  </S.Row>
                  <S.Row $gap={10}>
                    <S.Button
                      dirty={dirty}
                      disabled={isSubmitting}
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                      text="Generate Art"
                      type={ButtonType.submit}
                    />
                  </S.Row>
                </S.BottomContainer>
              </S.Card>
            </S.Form>
          );
        }}
      </Formik>
      <S.ImageCarouselContainer>{renderImageCarousel()}</S.ImageCarouselContainer>
    </S.Container>
  );
};

export default Create;

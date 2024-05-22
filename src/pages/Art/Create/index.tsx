import {useMemo, useState} from 'react';
import {Field, Formik} from 'formik';
import {useSelector} from 'react-redux';

import {createOpenAIImage} from 'api/openaiImages';
import {ButtonType} from 'components/Button';
import {Textarea} from 'components/FormElements';
import EmptyImage from 'components/EmptyImage';
import TNBLogo from 'components/TNBLogo';
import {DEFAULT_CORE_TICKER, OPENAI_IMAGE_CREATION_FEE} from 'constants/general';
import {useUserStats} from 'hooks/useUserStats';
import ImageCarousel from './ImageCarousel';
import {displayErrorToast} from 'utils/toasts';
import {formatNumber} from 'utils/numbers';
import yup from 'utils/yup';
import {getSelf} from 'selectors/state';
import {CreateOpenAIImageResponse, SFC} from 'types';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const [createOpenAIImageResponse, setCreateOpenAIImageResponse] = useState<CreateOpenAIImageResponse | null>(null);
  const [description, setDescription] = useState('');
  const [isImageSaved, setIsImageSaved] = useState<Array<number>>([]);
  const self = useSelector(getSelf);

  const stats = useUserStats(self.id);

  const initialValues = {
    description: '',
    quantity: '1',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const results = await createOpenAIImage({description: values.description, quantity: +values.quantity});
      setCreateOpenAIImageResponse(results);
      setIsImageSaved([]);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error generating art');
    }
  };
  const renderImageCarousel = () => {
    if (!createOpenAIImageResponse) return null;
    const imageUrls = createOpenAIImageResponse.data.map(({url}) => url);
    return (
      <ImageCarousel
        description={description}
        imageUrls={imageUrls}
        isImageSaved={isImageSaved}
        setIsImageSaved={setIsImageSaved}
      />
    );
  };
  const renderDefaultImage = () => {
    return <EmptyImage>Describe your art, select image quantity and generate art !</EmptyImage>;
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
                    <span>
                      <S.AvailableBalance>
                        <TNBLogo /> <b>{formatNumber(stats?.default_wallet_balance || 0)}</b>&nbsp;{DEFAULT_CORE_TICKER}
                      </S.AvailableBalance>
                    </span>
                  </S.Row>
                  <S.Row>
                    <h3>1 image generation fee</h3>
                    <span>
                      {OPENAI_IMAGE_CREATION_FEE} {DEFAULT_CORE_TICKER}
                    </span>
                  </S.Row>
                  <S.Row>
                    <h3>Total fee</h3>
                    <span>
                      {values.quantity} {DEFAULT_CORE_TICKER}
                    </span>
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

      <S.ImageCarouselContainer $createOpenAIImageResponse={createOpenAIImageResponse}>
        {createOpenAIImageResponse === null && renderDefaultImage()}
        {createOpenAIImageResponse !== null && createOpenAIImageResponse.data.length > 0 && renderImageCarousel()}
      </S.ImageCarouselContainer>
    </S.Container>
  );
};

export default Create;

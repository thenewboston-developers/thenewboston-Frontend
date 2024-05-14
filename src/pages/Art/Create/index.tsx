import {useMemo, useState} from 'react';
import {Field, Formik} from 'formik';
import {useSelector} from 'react-redux';

import {createOpenAIImage} from 'api/openaiImages';
import {ButtonType} from 'components/Button';
import {Textarea} from 'components/FormElements';
import TNBLogo from 'components/TNBLogo';
import {DEFAULT_CORE_TICKER, OPENAI_IMAGE_CREATION_FEE} from 'constants/general';
import {useUserStats} from 'hooks/useUserStats';
import ImageCarousel from './ImageCarousel';
import {displayErrorToast} from 'utils/toasts';
import {formatNumber} from 'utils/numbers';
import yup from 'utils/yup';
import {getSelf} from 'selectors/state';
import {CreateOpenAIImageResponse, SFC} from 'types';
// import * as S from './Styles';
import * as S from './Styles2';

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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      quantity: yup.number().min(1).max(10).required().integer(),
    });
  }, []);

  return (
    <S.ContainerRoot>
      {renderImageCarousel() ? (
        <>
          <S.ImageCarouselContainer>{renderImageCarousel()}</S.ImageCarouselContainer>
        </>
      ) : (
        <S.Desicon>
          <S.Icon>
            <S.Frame>
              <S.VectorIcon src="/Icon.svg" />
            </S.Frame>
          </S.Icon>
          <S.Describe>Describe your art, select image quantity and generate art!</S.Describe>
        </S.Desicon>
      )}

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, handleChange, isSubmitting, isValid, values, touched}) => {
          return (
            <S.Form>
              <S.Card2>
                <S.Card>
                  <S.Cardheader>Description</S.Cardheader>
                  {/* <S.Textarea>Please type here</S.Textarea> */}
                  <Textarea
                    errors={errors}
                    onChange={(e) => {
                      handleChange(e);
                      setDescription(e.target.value);
                    }}
                    name="description"
                    touched={touched}
                    placeholder="Please type here"
                  />
                </S.Card>
                <S.Divider />
                <S.Card1>
                  <S.Cardheader>Image Quantity</S.Cardheader>
                  <S.Radiogroup>
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

                    {/* <S.Wrapper>
                      <S.Div>1</S.Div>
                    </S.Wrapper>
                    <S.FrameDiv>
                      <S.GenerateArt>2</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>3</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>4</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>5</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>6</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>7</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>8</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>9</S.GenerateArt>
                    </S.FrameDiv>
                    <S.FrameDiv>
                      <S.GenerateArt>10</S.GenerateArt>
                    </S.FrameDiv> */}
                  </S.Radiogroup>
                </S.Card1>
              </S.Card2>
              <S.Card3>
                <S.Carddiv>
                  <S.Available>Available</S.Available>
                  <S.Tnb>
                    <TNBLogo />
                    <b>{formatNumber(stats?.default_wallet_balance || 0)}</b> {DEFAULT_CORE_TICKER}
                  </S.Tnb>
                </S.Carddiv>
                <S.Divider1 />
                <S.Carddiv>
                  <S.Available>1 image generation fee</S.Available>
                  <S.Tnb>
                    {OPENAI_IMAGE_CREATION_FEE} {DEFAULT_CORE_TICKER}
                  </S.Tnb>
                </S.Carddiv>
                <S.Divider1 />
                <S.Carddiv>
                  <S.Available1>Total fee</S.Available1>
                  <S.Tnb1>
                    {values.quantity} {DEFAULT_CORE_TICKER}
                  </S.Tnb1>
                </S.Carddiv>
                <S.Cardbtns>
                  <S.Button
                    dirty={dirty}
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    text="Generate Art"
                    type={ButtonType.submit}
                  />
                  {/* <S.Btn>
                    <S.GenerateArt>Generate art</S.GenerateArt>
                  </S.Btn>
                  <S.Btn1>
                    <S.GenerateArt>Save</S.GenerateArt>
                  </S.Btn1> */}
                </S.Cardbtns>
              </S.Card3>
            </S.Form>
          );
        }}
      </Formik>
    </S.ContainerRoot>

    // <S.Container className={className}>
    //   <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
    //     {({dirty, errors, handleChange, isSubmitting, isValid, values, touched}) => {
    //       return (
    //         <S.Form>
    //           <S.Card>
    //             <Textarea
    //               errors={errors}
    //               label="Description"
    //               onChange={(e) => {
    //                 handleChange(e);
    //                 setDescription(e.target.value);
    //               }}
    //               name="description"
    //               touched={touched}
    //               placeholder="Please type here"
    //             />
    //           </S.Card>
    //           <S.Card>
    //             <S.CardHeader>Image Quantity</S.CardHeader>
    //             <S.RadioGroup className="radio-group">
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="1" onChange={handleChange} />
    //                 <span>1</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="2" onChange={handleChange} />
    //                 <span>2</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="3" onChange={handleChange} />
    //                 <span>3</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="4" onChange={handleChange} />
    //                 <span>4</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="5" onChange={handleChange} />
    //                 <span>5</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="6" onChange={handleChange} />
    //                 <span>6</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="7" onChange={handleChange} />
    //                 <span>7</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="8" onChange={handleChange} />
    //                 <span>8</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="9" onChange={handleChange} />
    //                 <span>9</span>
    //               </label>
    //               <label className="radio-option">
    //                 <Field type="radio" name="quantity" value="10" onChange={handleChange} />
    //                 <span>10</span>
    //               </label>
    //             </S.RadioGroup>
    //           </S.Card>
    //           <S.Card>
    //             <S.BottomContainer>
    //               <S.Row>
    //                 <h3>Available</h3>
    //                 <span>
    //                   <S.AvailableBalance>
    //                     <TNBLogo /> <b>{formatNumber(stats?.default_wallet_balance || 0)}</b>&nbsp;{DEFAULT_CORE_TICKER}
    //                   </S.AvailableBalance>
    //                 </span>
    //               </S.Row>
    //               <S.Row>
    //                 <h3>1 image generation fee</h3>
    //                 <span>
    //                   {OPENAI_IMAGE_CREATION_FEE} {DEFAULT_CORE_TICKER}
    //                 </span>
    //               </S.Row>
    //               <S.Row>
    //                 <h3>Total fee</h3>
    //                 <span>
    //                   {values.quantity} {DEFAULT_CORE_TICKER}
    //                 </span>
    //               </S.Row>
    //               <S.Row $gap={10}>
    //                 <S.Button
    //                   dirty={dirty}
    //                   disabled={isSubmitting}
    //                   isSubmitting={isSubmitting}
    //                   isValid={isValid}
    //                   text="Generate Art"
    //                   type={ButtonType.submit}
    //                 />
    //               </S.Row>
    //             </S.BottomContainer>
    //           </S.Card>
    //         </S.Form>
    //       );
    //     }}
    //   </Formik>
    //   <S.ImageCarouselContainer>{renderImageCarousel()}</S.ImageCarouselContainer>
    // </S.Container>
  );
};

export default Create;

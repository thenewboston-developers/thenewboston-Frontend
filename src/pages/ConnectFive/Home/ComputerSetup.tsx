import {ReactNode, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Formik, FormikHelpers} from 'formik';

import {createConnectFiveComputerMatch} from 'api/connectFive';
import {ButtonType} from 'components/Button';
import {FormField} from 'components/FormElements';
import {getSelf} from 'selectors/state';
import {upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveDifficulty} from 'types';
import {handleFormikAPIError} from 'utils/forms';

import * as S from './Styles';

const initialValues = {difficulty: 'normal' as ConnectFiveDifficulty, timeLimitSeconds: '900'};

interface Props {
  children?: (controls: {isCreating: boolean; onPlay: () => void}) => ReactNode;
}

const ComputerSetup = ({children}: Props) => {
  const creationLock = useRef(false);
  const creationRequest = useRef<{id: string; signature: string} | null>(null);
  const currentViewer = useRef<number | null | undefined>(null);
  const dispatch = useDispatch<AppDispatch>();
  const live = useRef(true);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  currentViewer.current = self.id;

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  const handleSubmit = async (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => {
    if (creationLock.current) return;
    const viewerId = self.id;
    const isCurrent = () => live.current && currentViewer.current === viewerId;
    creationLock.current = true;
    helpers.setSubmitting(true);
    try {
      const data = {difficulty: values.difficulty, time_limit_seconds: Number(values.timeLimitSeconds)};
      const signature = JSON.stringify({...data, userId: self.id});
      if (creationRequest.current?.signature !== signature)
        creationRequest.current = {id: crypto.randomUUID(), signature};
      const match = await createConnectFiveComputerMatch({...data, request_id: creationRequest.current.id});
      if (!isCurrent()) return;
      creationRequest.current = null;
      dispatch(upsertMatch({match, selfId: self.id}));
      navigate(`/connect-five/matches/${match.id}`);
    } catch (error) {
      if (isCurrent()) handleFormikAPIError(error, helpers, 'Unable to start a computer game. Please try again.');
    } finally {
      creationLock.current = false;
      if (isCurrent()) helpers.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(helpers) => (
        <>
          {children?.({isCreating: helpers.isSubmitting, onPlay: () => handleSubmit(initialValues, helpers)})}
          <S.Section aria-labelledby="computer-game">
            <S.SectionTitle id="computer-game">Play the computer</S.SectionTitle>
            <S.SectionDescription>
              Free to play. No account needed. Choose your challenge and practice your next winning line. Computer games
              do not change your ELO.
            </S.SectionDescription>
            <S.Form onSubmit={helpers.handleSubmit}>
              <S.FormRow>
                <FormField>
                  <S.Select
                    errors={helpers.errors}
                    label="Computer difficulty"
                    name="difficulty"
                    options={[
                      {displayName: 'Easy · Learn the board', value: 'easy'},
                      {displayName: 'Normal · Think ahead', value: 'normal'},
                      {displayName: 'Hard · Test your tactics', value: 'hard'},
                    ]}
                    touched={helpers.touched}
                  />
                </FormField>
                <FormField>
                  <S.Select
                    errors={helpers.errors}
                    label="Time per player"
                    name="timeLimitSeconds"
                    options={[
                      {displayName: '5 minutes', value: '300'},
                      {displayName: '10 minutes', value: '600'},
                      {displayName: '15 minutes', value: '900'},
                      {displayName: '30 minutes', value: '1800'},
                    ]}
                    touched={helpers.touched}
                  />
                </FormField>
              </S.FormRow>
              <S.SectionDescription>
                Each player starts with two horizontal doubles, two vertical doubles, and two bombs. No stakes or paid
                purchases.
              </S.SectionDescription>
              <S.SubmitRow>
                <S.SubmitButton
                  dirty
                  isSubmitting={helpers.isSubmitting}
                  isValid
                  text={helpers.isSubmitting ? 'Preparing your game…' : 'Play free against computer'}
                  type={ButtonType.submit}
                />
              </S.SubmitRow>
            </S.Form>
          </S.Section>
        </>
      )}
    </Formik>
  );
};

export default ComputerSetup;

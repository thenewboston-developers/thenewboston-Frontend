import {ReactNode, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';
import {Field, Formik, FormikHelpers} from 'formik';

import {createConnectFiveComputerMatch} from 'api/connectFive';
import {getSelf} from 'selectors/state';
import {upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveDifficulty} from 'types';
import {handleFormikAPIError} from 'utils/forms';

import {ComputerEmblem, KitPiece, KitPieceKind, StoneRow} from '../Stones';

import * as S from './Styles';
import TimeOptions from './TimeOptions';

const DIFFICULTIES: {description: string; label: string; stones: number; value: ConnectFiveDifficulty}[] = [
  {description: 'Learn the board', label: 'Easy', stones: 1, value: 'easy'},
  {description: 'Think ahead', label: 'Normal', stones: 3, value: 'normal'},
  {description: 'Test your tactics', label: 'Hard', stones: 5, value: 'hard'},
];

const STARTING_KIT: {kind: KitPieceKind; label: string}[] = [
  {kind: 'horizontal', label: '2 horizontal doubles'},
  {kind: 'vertical', label: '2 vertical doubles'},
  {kind: 'bomb', label: '2 bombs'},
];

const initialValues = {difficulty: 'normal' as ConnectFiveDifficulty, timeLimitSeconds: '900'};

interface Props {
  // The hero's play button starts a default game through the same submission lock as the panel. The render prop gets
  // the panel too, so the page decides where it goes.
  children?: (controls: {isCreating: boolean; onPlay: () => void; panel: ReactNode}) => ReactNode;
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
      {(helpers) => {
        const panel = (
          <S.Panel aria-labelledby="computer-game">
            <S.PanelHeader>
              <ComputerEmblem />
              <div>
                <S.Eyebrow>Practice your next line</S.Eyebrow>
                <S.PanelTitle id="computer-game">Play the computer</S.PanelTitle>
              </div>
            </S.PanelHeader>
            <S.Lead>
              Free to play. No account needed. Choose your challenge and practice your next winning line. Computer games
              do not change your ELO.
            </S.Lead>
            <S.ComputerForm onSubmit={helpers.handleSubmit}>
              <S.Fieldset>
                <S.Legend>Computer difficulty</S.Legend>
                <S.ChoiceGrid>
                  {DIFFICULTIES.map(({description, label, stones, value}) => (
                    <S.Choice key={value}>
                      <Field id={`computer-difficulty-${value}`} name="difficulty" type="radio" value={value} />
                      <S.ChoiceCard>
                        <StoneRow filled={stones} tone={helpers.values.difficulty === value ? 'gold' : 'ivory'} />
                        <strong>{label}</strong>
                        <small>{description}</small>
                      </S.ChoiceCard>
                    </S.Choice>
                  ))}
                </S.ChoiceGrid>
              </S.Fieldset>
              <TimeOptions idPrefix="computer" />
              <S.Kit>
                <S.KitTitle>Each player starts with</S.KitTitle>
                <S.KitList>
                  {STARTING_KIT.map(({kind, label}) => (
                    <S.KitItem key={kind}>
                      <KitPiece kind={kind} />
                      {label}
                    </S.KitItem>
                  ))}
                </S.KitList>
                <S.KitNote>No stakes or paid purchases.</S.KitNote>
              </S.Kit>
              <S.PanelActions>
                <S.PrimaryButton aria-busy={helpers.isSubmitting} disabled={helpers.isSubmitting} type="submit">
                  <Icon aria-hidden path={mdiPlay} size="20px" />
                  {helpers.isSubmitting ? 'Preparing your game…' : 'Play free against computer'}
                </S.PrimaryButton>
              </S.PanelActions>
            </S.ComputerForm>
          </S.Panel>
        );

        if (!children) return panel;
        return children({
          isCreating: helpers.isSubmitting,
          onPlay: () => handleSubmit(initialValues, helpers),
          panel,
        });
      }}
    </Formik>
  );
};

export default ComputerSetup;

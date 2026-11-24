import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getConnectFiveMatch} from 'api/connectFive';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {upsertMatch} from 'store/connectFive';
import {AppDispatch, SFC} from 'types';

import ComputerMatch from './ComputerMatch';
import HumanMatch from './HumanMatch';
import * as S from './Styles';

const Match: SFC = ({className}) => {
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const {matchId} = useParams();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const self = useSelector(getSelf);
  const id = Number(matchId);
  const match = matchesById[id];
  const hasMatch = !!match;

  useEffect(() => {
    if (hasMatch) return undefined;
    const controller = new AbortController();
    let live = true;
    setError(false);
    getConnectFiveMatch(id, {mine: 'any'}, controller.signal)
      .then((data) => {
        if (live) dispatch(upsertMatch({match: data, selfId: self.id}));
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
      controller.abort();
    };
  }, [dispatch, hasMatch, id, retryKey, self.id]);

  if (match?.mode === 'computer' && match.player_a.id !== self.id)
    return (
      <S.Container>
        <EmptyText>This computer game belongs to another player.</EmptyText>
      </S.Container>
    );
  if (!match)
    return (
      <S.Container className={className}>
        <S.LoadingContainer>
          {error ? (
            <>
              <EmptyText>Unable to load this match.</EmptyText>
              <Button onClick={() => setRetryKey((value) => value + 1)} text="Try again" />
            </>
          ) : (
            <Loader />
          )}
        </S.LoadingContainer>
      </S.Container>
    );
  if (match.mode === 'computer')
    return <ComputerMatch className={className} key={`${match.id}:${self.id}`} match={match} />;
  return <HumanMatch className={className} />;
};

export default Match;

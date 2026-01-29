import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONNECT_FIVE} from 'constants/store';
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus} from 'enums';
import {ConnectFiveChallenge, ConnectFiveMatch, ConnectFiveState} from 'types';

const initialState: ConnectFiveState = {
  activeMatches: [],
  challengesById: {},
  completedMatches: [],
  incomingChallenges: [],
  matchesById: {},
  outgoingChallenges: [],
};

const removeChallengeFromList = (list: ConnectFiveChallenge[], challengeId: number) => {
  const index = list.findIndex((challenge) => challenge.id === challengeId);
  if (index !== -1) list.splice(index, 1);
};

const upsertChallengeInList = (list: ConnectFiveChallenge[], challenge: ConnectFiveChallenge) => {
  const index = list.findIndex((item) => item.id === challenge.id);
  if (index === -1) {
    list.unshift(challenge);
  } else {
    list[index] = challenge;
  }
};

const removeMatchFromList = (list: ConnectFiveMatch[], matchId: number) => {
  const index = list.findIndex((match) => match.id === matchId);
  if (index !== -1) list.splice(index, 1);
};

const upsertMatchInList = (list: ConnectFiveMatch[], match: ConnectFiveMatch) => {
  const index = list.findIndex((item) => item.id === match.id);
  if (index === -1) {
    list.unshift(match);
  } else {
    list[index] = match;
  }
};

const connectFive = createSlice({
  initialState,
  name: CONNECT_FIVE,
  reducers: {
    removeIncomingChallenge: (state: ConnectFiveState, {payload: challengeId}: PayloadAction<number>) => {
      state.incomingChallenges = state.incomingChallenges.filter((challenge) => challenge.id !== challengeId);
    },
    removeOutgoingChallenge: (state: ConnectFiveState, {payload: challengeId}: PayloadAction<number>) => {
      state.outgoingChallenges = state.outgoingChallenges.filter((challenge) => challenge.id !== challengeId);
    },
    setActiveMatches: (state: ConnectFiveState, {payload}: PayloadAction<ConnectFiveMatch[]>) => {
      state.activeMatches = payload;
      payload.forEach((match) => {
        state.matchesById[match.id] = match;
      });
    },
    setCompletedMatches: (state: ConnectFiveState, {payload}: PayloadAction<ConnectFiveMatch[]>) => {
      state.completedMatches = payload;
      payload.forEach((match) => {
        state.matchesById[match.id] = match;
      });
    },
    setIncomingChallenges: (state: ConnectFiveState, {payload}: PayloadAction<ConnectFiveChallenge[]>) => {
      state.incomingChallenges = payload;
      payload.forEach((challenge) => {
        state.challengesById[challenge.id] = challenge;
      });
    },
    setOutgoingChallenges: (state: ConnectFiveState, {payload}: PayloadAction<ConnectFiveChallenge[]>) => {
      state.outgoingChallenges = payload;
      payload.forEach((challenge) => {
        state.challengesById[challenge.id] = challenge;
      });
    },
    upsertChallenge: (
      state: ConnectFiveState,
      {payload}: PayloadAction<{challenge: ConnectFiveChallenge; selfId?: number | null}>,
    ) => {
      const {challenge, selfId} = payload;
      state.challengesById[challenge.id] = challenge;

      if (!selfId) return;

      const isChallenger = challenge.challenger.id === selfId;
      const isOpponent = challenge.opponent.id === selfId;
      const isPending = challenge.status === ConnectFiveChallengeStatus.PENDING;

      if (isChallenger) {
        if (isPending) {
          upsertChallengeInList(state.outgoingChallenges, challenge);
        } else {
          removeChallengeFromList(state.outgoingChallenges, challenge.id);
        }
      }

      if (isOpponent) {
        if (isPending) {
          upsertChallengeInList(state.incomingChallenges, challenge);
        } else {
          removeChallengeFromList(state.incomingChallenges, challenge.id);
        }
      }
    },
    upsertMatch: (
      state: ConnectFiveState,
      {payload}: PayloadAction<{match: ConnectFiveMatch; selfId?: number | null}>,
    ) => {
      const {match, selfId} = payload;
      state.matchesById[match.id] = match;

      if (!selfId) return;
      if (match.player_a.id !== selfId && match.player_b.id !== selfId) return;

      if (match.status === ConnectFiveMatchStatus.ACTIVE) {
        upsertMatchInList(state.activeMatches, match);
        removeMatchFromList(state.completedMatches, match.id);
      } else {
        upsertMatchInList(state.completedMatches, match);
        removeMatchFromList(state.activeMatches, match.id);
      }
    },
  },
});

export const {
  removeIncomingChallenge,
  removeOutgoingChallenge,
  setActiveMatches,
  setCompletedMatches,
  setIncomingChallenges,
  setOutgoingChallenges,
  upsertChallenge,
  upsertMatch,
} = connectFive.actions;
export default connectFive.reducer;

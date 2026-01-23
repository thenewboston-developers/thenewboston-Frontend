export enum ConnectFiveChallengeStatus {
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  DECLINED = 'declined',
  EXPIRED = 'expired',
  PENDING = 'pending',
}

export enum ConnectFiveMatchStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  DRAW = 'draw',
  FINISHED_CONNECT5 = 'finished_connect5',
  FINISHED_TIMEOUT = 'finished_timeout',
}

export enum ConnectFiveMoveType {
  BOMB = 'BOMB',
  H2 = 'H2',
  SINGLE = 'SINGLE',
  V2 = 'V2',
}

export enum ConnectFiveSpecialType {
  BOMB = 'BOMB',
  H2 = 'H2',
  V2 = 'V2',
}

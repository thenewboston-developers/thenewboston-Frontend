export enum ExchangeOrderSide {
  BUY = 1,
  SELL = -1,
}

export enum ExchangeOrderStatus {
  OPEN = 1,
  PARTIALLY_FILLED = 2,
  FILLED = 3,
  CANCELLED = 100,
}

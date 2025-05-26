export interface CreateMintRequest {
  amount: number;
  currency: number;
}

export interface GetMintsParams {
  currency: number;
  page?: number;
  page_size?: number;
}

export interface CreateOrderRequest {
  order_type: string;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}

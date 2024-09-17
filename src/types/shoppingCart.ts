import { ProductType } from "./product";

export type OrderItem = ProductType & { qty: number };
export type ShoppingCart = {
  userId: string;
  // shipping: number;
  orderItems: OrderItem[];
};

export type SummaryItem = {
  name: string;
  value?: string | number;
};

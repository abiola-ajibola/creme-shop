export type ShoppingCart = {
    userId: string;
    orderItems: {
      productId: string;
      qty: number;
    }[];
  };
import { AxiosResponse } from "axios";
import { axios } from "./config";
import { OrderItem, ShoppingCart } from "@/types/shoppingCart";
import { ProductType } from "@/types/product";
import { successNotification } from "@/utils/notifications";

export async function saveCart(cart: {
  userId: string;
  orderItems: { product: string; qty: number }[];
}) {
  try {
    const repsonse: AxiosResponse<ShoppingCart> = await axios.put(
      "/cart",
      cart,
    );
    successNotification("Cart saved successfully");
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function shareCart(cart: {
  userId: string;
  orderItems: { product: string; qty: number }[];
}) {
  try {
    const repsonse: AxiosResponse<ShoppingCart> = await axios.put(
      "/cart/share",
      cart,
    );
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getCart(id: string): Promise<OrderItem[] | undefined> {
  try {
    const response: AxiosResponse<
      { product: ProductType; qty: number; _id: string }[]
    > = await axios.get("/cart/" + id);
    console.log({ d: response.data });
    const data = response.data.map((item) => ({
      ...item.product,
      qty: item.qty,
    }));
    return data;
  } catch (error) {
    console.log({ error });
  }
}

import { AxiosResponse } from "axios";
import { axios } from "./config";
import { ShoppingCart } from "@/types/shoppingCart";

export async function saveCart(cart: ShoppingCart) {
  try {
    const repsonse: AxiosResponse<ShoppingCart> = await axios.post(
      "/cart",
      cart,
    );
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function shareCart(cart: ShoppingCart) {
  try {
    const repsonse: AxiosResponse<ShoppingCart> = await axios.post(
      "/cart/share",
      cart,
    );
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

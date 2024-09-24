import { getCart } from "@/api/cart";
import { ShoppingCart } from "@/components/SoppingCart";
import { OrderItem } from "@/types/shoppingCart";

export default function CartWithParam(props: { allCartItems: OrderItem[] }) {
  console.log({ props });
  return <ShoppingCart allCartItems={props.allCartItems} />;
}

export async function getServerSideProps({
  params,
}: {
  params: { cartId: string };
}) {
  console.log({ params });
  const response = await getCart(params.cartId);
  console.log({ response });
  return {
    props: { allCartItems: response },
  };
}

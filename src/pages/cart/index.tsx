import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectAllCartItems } from "@/redux/reducers";
import { ShoppingCart } from "@/components/SoppingCart";

export default function Cart() {
  const allCartItems = useSelector((state: RootState) =>
    selectAllCartItems(state),
  );

  return <ShoppingCart allCartItems={allCartItems} />;
}

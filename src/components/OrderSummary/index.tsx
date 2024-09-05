import { selectAllCartItems } from "@/redux/reducers";
import { selectShipping } from "@/redux/reducers/shoppingCartSlice";
import { RootState } from "@/redux/store";
import { SummaryItem } from "@/types/shoppingCart";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Link from "../Link";

function SummaryItem({ name, value }: SummaryItem) {
  return (
    <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
      <strong>{name}:</strong> <strong>{value}</strong>
    </Typography>
  );
}

export function OrderSummary() {
  const totalPrice = useSelector((state: RootState) =>
    selectAllCartItems(state)
  ).reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);
  const shipping = useSelector((state: RootState) => selectShipping(state));
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <Typography variant="h4">Order Summary</Typography>
      <hr />
      <SummaryItem name="Price" value={totalPrice || 0} />
      <SummaryItem name="Shipping" value={shipping} />
      <hr />
      <Typography
        color={"#ff8d8d"}
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <strong>Total:</strong> <strong>{totalPrice + shipping}</strong>
      </Typography>
      <Box>
        <Button sx={{ width: "100%", marginTop: "1rem" }} variant="contained">
          <Link
            sx={{ textDecoration: "none" }}
            variant="subtitle1"
            href=""
            color="#000000"
          >
            Checkout
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Save, Share } from "@mui/icons-material";
import Link from "../Link";
import { selectAllCartItems } from "@/redux/reducers";
// import { selectShipping } from "@/redux/reducers/shoppingCartSlice";
import { RootState } from "@/redux/store";
import type { SummaryItem } from "@/types/shoppingCart";
import { saveCart } from "@/api/cart";

function SummaryItem({ name, value }: SummaryItem) {
  return (
    <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
      <strong>{name}:</strong> <strong>{value}</strong>
    </Typography>
  );
}

export function OrderSummary() {
  const cart = useSelector((state: RootState) => selectAllCartItems(state));
  const totalPrice = cart
    .reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0)
    .toFixed(2);

  // const shipping = useSelector((state: RootState) =>
  //   selectShipping(state)
  // ).toFixed(2);
  const handleSaveCart = async () => {
    const data = await saveCart({ orderItems: cart, userId: "" });
    console.log({ data });
  };
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <Box>
        <Grid container flexWrap={"wrap"}>
          <Grid flexGrow={1} item>
            <Button
              onClick={handleSaveCart}
              size="small"
              fullWidth
              startIcon={<Save />}
            >
              Save cart
            </Button>
          </Grid>
          <Grid flexGrow={1} item>
            <Button size="small" fullWidth startIcon={<Share />}>
              Share cart
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4">Order Summary</Typography>
      <hr />
      <SummaryItem name="Price" value={totalPrice || 0} />
      {/* <SummaryItem name="Shipping" value={shipping} /> */}
      <hr />
      <Typography
        color={"#ff8d8d"}
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <strong>Total:</strong> <strong>{totalPrice}</strong>
      </Typography>
      <Box>
        <Button sx={{ width: "100%", marginTop: "1rem" }} variant="contained">
          <Link sx={{ textDecoration: "none" }} href="">
            Checkout
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Save, Share } from "@mui/icons-material";
import { useRouter } from "next/router";
import Link from "../Link";
import { selectUser } from "@/redux/reducers";
// import { selectShipping } from "@/redux/reducers/shoppingCartSlice";
import { RootState } from "@/redux/store";
import type { OrderItem, SummaryItem } from "@/types/shoppingCart";
import { saveCart } from "@/api/cart";
import { warningNotification } from "@/utils/notifications";

function SummaryItem({ name, value }: SummaryItem) {
  return (
    <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
      <strong>{name}:</strong> <strong>{value}</strong>
    </Typography>
  );
}

export function OrderSummary({ cart }: { cart: OrderItem[] }) {
  // const cart = useSelector((state: RootState) => selectAllCartItems(state));
  const user = useSelector((state: RootState) => selectUser(state));
  const router = useRouter();
  const totalPrice = cart
    .reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0)
    .toFixed(2);

  // const shipping = useSelector((state: RootState) =>
  //   selectShipping(state)
  // ).toFixed(2);

  const handleSaveCart = () => {
    if (!user?._id) {
      warningNotification("Please login to continue");
      return router.push("/login?redirect=/cart");
    }
    saveCart({
      orderItems: cart.map((item) => ({ product: item._id, qty: item.qty })),
      userId: user._id,
    });
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

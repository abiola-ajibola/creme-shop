import { selectAllCartItems } from "@/redux/reducers";
import { RootState } from "@/redux/store";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useSelector } from "react-redux";
import { OrderSummary } from "@/components/OrderSummary";
import { ShoppingCartItem } from "@/components/ShoppingCartItem";

export default function Cart(props: any) {
  const allCartItems = useSelector((state: RootState) =>
    selectAllCartItems(state)
  );

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="Shopping Cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Shopping Cart" />
        <meta property="og:description" content="Shopping Cart" />
      </Head>
      <Typography mx={3} variant="h2">
        Shopping Cart
      </Typography>
      <Box
        sx={{
          margin: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
        component={"main"}
        gap={3}
      >
        <Box flexGrow={1}>
          {allCartItems.map((item) => (
            <ShoppingCartItem key={item._id} item={item} />
          ))}
        </Box>
        {allCartItems.length > 0 && (
          <Box>
            <OrderSummary />
          </Box>
        )}
      </Box>
    </>
  );
}

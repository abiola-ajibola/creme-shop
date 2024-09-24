import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { ShoppingCartItem } from "../ShoppingCartItem";
import { OrderSummary } from "../OrderSummary";
import { OrderItem } from "@/types/shoppingCart";

export function ShoppingCart({ allCartItems }: { allCartItems: OrderItem[] }) {
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
            <OrderSummary cart={allCartItems} />
          </Box>
        )}
      </Box>
    </>
  );
}

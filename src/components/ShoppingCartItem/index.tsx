import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";
import Image from "next/image";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeFromCart, setQty } from "@/redux/reducers";
import { OrderItem } from "@/types/shoppingCart";
import { QuantityPicker } from "@/components/QuantityPicker";

// see: https://www.behance.net/gallery/91174237/E-Commerce-Cart-Checkout-Page-Design?tracking_source=search_projects|e-commerce+cart+page

const FlexibleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  height: "100%",
}));

const StyledImage = styled(Image)(() => ({}));

export function ShoppingCartItem({ item }: { item: OrderItem }) {
  const dispatch = useDispatch();
  const handleIncrement = () => {
    console.log({ item });
    dispatch(setQty({ productId: item._id, qty: item.qty + 1 }));
  };

  const handleDecrement = () => {
    console.log({ item });
    const newQty = item.qty - 1;
    if (newQty < 1) {
      dispatch(removeFromCart(item._id));
      return;
    }
    dispatch(setQty({ productId: item._id, qty: newQty }));
  };

  const handleDelete = () => {
    dispatch(removeFromCart(item._id));
  };
  return (
    <Paper sx={{ flexGrow: 1, padding: 2, marginBottom: 1 }}>
      <Grid container spacing={1}>
        <Grid item md={7} sm={12} xs={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={"auto"}
              sx={(theme) => ({
                [theme.breakpoints.up("sm")]: {
                  marginRight: 2,
                },
              })}
            >
              <StyledImage
                src={item.image}
                width={200}
                height={200}
                alt="Random"
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                    height: "100%",
                  },
                })}
              />
            </Grid>
            <Grid
              item
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  flexBasis: "100%",
                },
              })}
            >
              <FlexibleBox>
                <Typography align="center" width="100%">
                  {item.name}
                </Typography>
              </FlexibleBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} sm={5} xs={12}>
          <FlexibleBox>
            <Typography align="center" width="100%">
              {" "}
              <Box>
                <QuantityPicker
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                  incrementDisabled={item.countInStock === item.qty}
                  decrementDisabled={item.countInStock === 0 || item.qty === 0}
                  inputDisabled
                  inputValue={item.qty}
                />
              </Box>{" "}
            </Typography>
          </FlexibleBox>
        </Grid>
        <Grid item md={2} sm={5} xs={12}>
          <FlexibleBox>
            <Typography align="center" width="100%">
              {item.price}
            </Typography>
          </FlexibleBox>
        </Grid>
        <Grid item md={1} sm={2} xs={12}>
          <FlexibleBox>
            <Typography align="center" width="100%">
              <Button onClick={handleDelete} color="error" variant="text">
                <Delete />
              </Button>
            </Typography>
          </FlexibleBox>
        </Grid>
      </Grid>
    </Paper>
  );
}
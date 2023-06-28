import { MouseEventHandler, useState } from "react";
import { Typography, Box, Rating, Button, Input } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ProductPageStyle } from "@/styles/ProductPageStyles";
import { ProductType } from "@/types/product";
import { addToCart, decreaseQty, increaseQty, setQty } from "@/redux/reducers";
import { RootState } from "@/redux/store";

type API_Error = {
  status: number;
  statusText: string;
  data: { message: string };
};

export default function Product({
  product,
  error,
}: {
  product: ProductType;
  error?: API_Error;
}) {
  const [localQty, setLocalQty] = useState(0);
  const productId = product._id;
  const addedProduct = useSelector((state: RootState) =>
    state.shoppingCartReducer.orderItems.find(
      ({ productId: pid }) => pid === productId
    )
  );

  const qty = addedProduct?.qty;
  const addedProductId = addedProduct?.productId;
  const dispatch = useDispatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!addedProductId) {
      dispatch(addToCart({ productId, qty: localQty || 1 }));
    }
  };

  const handleQtyChange = (data: string) => {
    const castData = Number(data);
    if (data === "-") {
      if (!qty && qty !== 0) {
        setLocalQty((state) => state - 1);
        return;
      }
      dispatch(decreaseQty({ productId }));
      return;
    }
    if (data === "+") {
      if (!qty && qty !== 0) {
        setLocalQty((state) => state + 1);
        return;
      }
      dispatch(increaseQty({ productId }));
      return;
    }
    if (castData || castData === 0) {
      let dispatchQty = 0;
      if (castData < 0) dispatchQty = 0;
      if (castData > product.countInStock) dispatchQty = product.countInStock;
      if (!qty && qty !== 0) {
        setLocalQty(dispatchQty);
        return;
      }
      dispatch(setQty({ productId, qty: dispatchQty }));
    }
  };
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" textAlign={"center"}>
            {error.statusText}
          </Typography>{" "}
          <Typography textAlign={"center"}>{error.data.message}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <ProductPageStyle>
      <div className="wrapper">
        <div className="image-wrapper">
          <Image
            src={product.image}
            width={640}
            height={510}
            alt={product.name}
          />
        </div>
        <div className="descriptions-wrapper">
          <Typography gutterBottom variant="h5" component="div">
            <strong>{product.name}</strong>
          </Typography>
          <Typography
            sx={{ display: "flex", marginBottom: "0.5rem" }}
            variant="body1"
            color="text.secondary"
          >
            <Rating readOnly precision={0.1} value={product.rating} />{" "}
            <Box component={"span"} sx={{ paddingLeft: "1rem" }}>
              {product.numReviews} reviews
            </Box>
          </Typography>
          <Typography variant="h4">${product.price}</Typography>
          <Typography>{product.description}</Typography>
        </div>
        <div className="actions-wrapper">
          <Typography>
            <strong>Price:</strong> <strong>${product.price}</strong>
          </Typography>
          <Typography>
            <strong>Status:</strong>{" "}
            <strong>
              {product.countInStock ? "In Stock" : "Out Of Stock"}
            </strong>
          </Typography>
            <Box
              sx={{
                flexGrow: 1,
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              Qty:{" "}
              <Box>
              <Button
                disabled={qty ? qty <= 0 : localQty <= 0}
                onClick={() => handleQtyChange("-")}
                variant="contained"
              >
                -
              </Button>{" "}
              <Input
                onChange={(e) => handleQtyChange(e.target.value)}
                inputProps={{ className: "qty_input" }}
                value={qty ? qty : localQty}
              />{" "}
              <Button
                disabled={
                  qty
                    ? qty >= product.countInStock
                    : localQty >= product.countInStock
                }
                onClick={() => handleQtyChange("+")}
                variant="contained"
              >
                +
              </Button>
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: 2,
                minWidth: "180px",
                marginTop: "1rem",
              }}
            >
          <Box sx={{ marginTop: "1rem", display: "flex", flexWrap: "wrap" }}>
              <Button
                onClick={handleClick}
                sx={{ width: "100%" }}
                variant="contained"
                disabled={Boolean(addedProductId) || product.countInStock === 0}
              >
                {Boolean(addedProductId)
                  ? `Added to Cart (${qty || qty === 0 ? qty : localQty})`
                  : "Add to Cart"}
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </ProductPageStyle>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/products/${query.productId}`
    );
    return {
      props: {
        product: data,
      },
    };
  } catch (e: any) {
    const { status, statusText, data } = e.response;
    // if (status === 404) {
    //   return { notFound: true };
    // }
    return {
      props: {
        error: { status, statusText, data },
      },
    };
  }
};

import { ChangeEvent, MouseEventHandler, useState } from "react";
import { Typography, Box, Rating, Button } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ProductType } from "@/types/product";
import {
  addToCart,
  removeFromCart,
  selectAddedProducts,
  setQty,
} from "@/redux/reducers";
import { RootState } from "@/redux/store";
import { QuantityPicker } from "@/components/QuantityPicker";
import { ProductPageStyle } from "./ProductPageStyles";

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
  const [canUpdateCart, setCanUpdateCart] = useState(false);
  const productId = product._id;
  const addedProduct = useSelector((state: RootState) =>
    selectAddedProducts(state, productId)
  );

  const qty = addedProduct?.qty;
  const [localQty, setLocalQty] = useState(qty || 0);
  const addedProductId = addedProduct?._id;
  const dispatch = useDispatch();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setCanUpdateCart(false);
    if (!addedProductId) {
      dispatch(addToCart({ ...product, qty: localQty || 1 }));
      return;
    }
    if (localQty === 0) {
      dispatch(removeFromCart(productId));
      return;
    }
    dispatch(setQty({ productId, qty: localQty }));
  };

  const handleQtyChange = (data: number) => {
    if (data === -1) {
      if (Boolean(localQty)) {
        setCanUpdateCart(true);
        setLocalQty((state) => state - 1);
        return;
      }
    }
    if (data === 1) {
      setCanUpdateCart(true);
      setLocalQty((state) => state + 1);
      return;
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
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Head>
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
              <QuantityPicker
                decrementDisabled={!Boolean(localQty)}
                onDecrement={() => handleQtyChange(-1)}
                incrementDisabled={
                  (qty || 0) >= product.countInStock ||
                  localQty >= product.countInStock
                }
                onIncrement={() => handleQtyChange(1)}
                inputValue={localQty}
                onInputChange={(e: ChangeEvent<HTMLInputElement>) => setLocalQty(Number(e.target.value) || 0)}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 2,
                minWidth: "180px",
                marginTop: "1rem",
              }}
            >
              <Box
                sx={{ marginTop: "1rem", display: "flex", flexWrap: "wrap" }}
              >
                {qty && canUpdateCart ? (
                  <Button
                    onClick={handleClick}
                    sx={{ width: "100%" }}
                    variant="contained"
                    disabled={false}
                  >
                    {"Update Cart"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleClick}
                    sx={{ width: "100%" }}
                    variant="contained"
                    disabled={
                      Boolean(addedProductId) || product.countInStock === 0
                    }
                  >
                    {Boolean(addedProductId)
                      ? `Added to Cart (${qty})`
                      : "Add to Cart"}
                  </Button>
                )}
              </Box>
            </Box>
          </div>
        </div>
      </ProductPageStyle>
    </>
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

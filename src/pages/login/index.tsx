import Head from "next/head";
// import { ProductType } from "@/types/product";
import Link from "next/link";
import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledPaper } from "./LoginStyles";
import { LoginStyles } from "@/styles/LoginStyle";

export default function Home(/* { products }: { products: ProductType[] } */) {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LoginStyles>
        <StyledPaper component={"form"}>
          <Box my={4}>
            <TextField
              name="email"
              type="email"
              id="email"
              label=""
              placeholder="Email"
              fullWidth
            />
          </Box>
          <Box my={4}>
            <TextField
              name="password"
              type="password"
              id="password"
              label=""
              placeholder="Password"
              fullWidth
            />
          </Box>
          <Box my={4}>
            <Button className="submit_button" type="button" variant="contained">
              Login
            </Button>
          </Box>
          <Box my={2}>
            <Typography justifyContent={"center"} variant="body2">
              <Link href="#forgot_password">Forgot password?</Link>
            </Typography>
          </Box>
          <Box>
            <Typography justifyContent={"center"} variant="body2">
              <Link href="/signup">
                Don&apos;t have an account? Sign-up
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </LoginStyles>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/products`
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}

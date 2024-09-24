import Head from "next/head";
import Link from "next/link";
import { Box, Button, TextField, Typography } from "@mui/material";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { StyledPaper } from "./LoginStyles";
import { signIn } from "@/api/auth";
import { LoginStyles } from "@/styles/LoginStyle";
import { setUser } from "@/redux/reducers";
type TSignin = {
  email: string;
  password: string;
};
const loginSchema = object({
  email: string().email().required("Email is required"),
  password: string().required("Please, enter a password"),
});

export default function Signin() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(loginSchema) });
  const dispatch = useDispatch();
  const onSubmit = async (values: TSignin) => {
    const data = await signIn(values);
    if (data) {
      dispatch(setUser(data.user));
    }
    console.log({ data });
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LoginStyles>
        <StyledPaper onSubmit={handleSubmit(onSubmit)} component={"form"}>
          <Box my={4}>
            <TextField
              type="email"
              id="email"
              label=""
              placeholder="Email"
              {...register("email")}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <Box my={4}>
            <TextField
              type="password"
              id="password"
              label=""
              placeholder="Password"
              {...register("password")}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Box my={4}>
            <Button className="submit_button" type="submit" variant="contained">
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
              <Link href="/signup">Don&apos;t have an account? Sign-up</Link>
            </Typography>
          </Box>
        </StyledPaper>
      </LoginStyles>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/products`,
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}

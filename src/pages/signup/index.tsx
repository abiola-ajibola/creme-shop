import { Box, Grid, TextField, Typography } from "@mui/material";
import { SignupWrapper, StyledPaper } from "./SignupStyles";
import Head from "next/head";

export default function Signup() {
  return (
    <>
      <Typography align="center" variant="h2">
        Signup
      </Typography>
      <SignupWrapper>
        <Head>
          <title>Signup</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <StyledPaper component="form">
          <Grid container spacing={2}>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="First name"
                name="firstname"
                label="First name"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Last name"
                name="firstname"
                label="Last name"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                label="Email"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Phone"
                name="email"
                label="Phone"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
              />
            </Grid>
            <Grid className="gridItem" item></Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Confirm Password"
                type="password"
                name="consfirm_password"
                label="Confirm Password"
              />
            </Grid>
            <Grid className="gridItem" item></Grid>
          </Grid>

          <Box border={0} mt={4} p={0} component={"fieldset"}>
            <TextField
              fullWidth
              placeholder="Street"
              name="street"
              label="street"
            />
          </Box>
        </StyledPaper>
      </SignupWrapper>
    </>
  );
}

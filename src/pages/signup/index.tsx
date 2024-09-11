import { IncomingHttpHeaders, IncomingMessage } from "http";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import Head from "next/head";
import { SignupWrapper, StyledPaper } from "./SignupStyles";
import {
  getAllCountries,
  getCountryStates,
  getIpLcation,
  TCountry,
  TIPLocation,
  TState,
} from "@/api/locations";
import { ControlledTextField } from "@/components/ControlledTextField";

type TServerProps = {
  location: Partial<TIPLocation>;
  countries: Partial<TCountry>[];
  states: TState[];
};

export type TFieldValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  street: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  zip_code: string;
};

export default function Signup(props: TServerProps) {
  const [countryStates, setCountryStates] = useState<TState[]>(props.states);

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      city: "",
      confirm_password: "",
      country: props.location.countryCode,
      state: "",
    } as TFieldValues,
  });

  const handleCountryChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue("state", "");
    try {
      const data = await getCountryStates(e.target.value);
      if (!data) throw "States data undefined";
      setCountryStates(data);
    } catch (e) {
      console.log({ e });
    }
  };

  const onSubmit = (values: FieldValues) => {
    console.log({ values });
  };

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
        <StyledPaper component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid className="gridContainer" container spacing={2}>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="First name"
                label="First name"
                {...register("firstname")}
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Last name"
                {...register("lastname")}
                label="Last name"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Email"
                {...register("email")}
                label="Email"
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Password"
                type="password"
                {...register("password")}
                label="Password"
              />
            </Grid>
            <Grid className="gridItem" item></Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Confirm Password"
                type="password"
                {...register("confirm_password")}
                label="Confirm Password"
              />
            </Grid>
            <Grid className="gridItem" item></Grid>
          </Grid>

          <Box border={0} mt={4} p={0} component={"fieldset"}>
            <Typography component={"legend"} mb={2} variant="h5">
              Address
            </Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Street"
                label="Street"
                {...register("street")}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid className="gridItem" item>
                <ControlledTextField
                  control={control}
                  select
                  onChange={handleCountryChange}
                  label="country"
                  fullWidth
                  defaultValue={props.location.countryCode}
                  name="country"
                >
                  {props.countries.map((country) => (
                    <MenuItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </MenuItem>
                  ))}
                </ControlledTextField>
              </Grid>
              <Grid className="gridItem" item>
                <ControlledTextField
                  control={control}
                  name="state"
                  select
                  fullWidth
                  label="State"
                  placeholder="State"
                >
                  {countryStates.map((state) => (
                    <MenuItem key={state.name} value={state.isoCode}>
                      {state.name}
                    </MenuItem>
                  ))}
                </ControlledTextField>
              </Grid>
              <Grid className="gridItem" item>
                <TextField
                  fullWidth
                  label="City"
                  placeholder="City"
                  {...register("city")}
                />
              </Grid>
              <Grid className="gridItem" item>
                <TextField
                  fullWidth
                  label="Post Code/Zip Code"
                  placeholder="Post Code/Zip Code"
                  {...register("zip_code")}
                />
              </Grid>
              <Grid className="gridItem" item>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      fullWidth
                      defaultCountry={props.location.countryCode}
                      label="Phone"
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="center" mb={2} mt={6}>
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </Box>
        </StyledPaper>
      </SignupWrapper>
    </>
  );
}

export async function getServerSideProps({ req }: { req: IncomingMessage }) {
  function cleanIp(address?: string): string {
    if (!address) return "";
    if (address == "127.0..1") return "";
    if (address === "::1") return ""; //"127.0.0.1";
    if (address.includes("::ffff:")) {
      const ip_add = address.substring(7);
      return cleanIp(ip_add);
    }
    const [first, second] = address.split(".");
    if (+first == 10) return "";
    if (+first == 172 && 16 <= +second && 31 >= +second) return "";
    if (+first == 192 && +second == 168) return "";
    return address;
  }

  const countryCodeFromHeaders = (headers: IncomingHttpHeaders) => {
    return headers["accept-language"]?.split(",")[0].substring(3);
  };

  const serverProps: TServerProps = { location: {}, countries: [], states: [] };

  const ip =
    cleanIp(req.headers["x-forwarded-for"] as string)
      ?.split(",")
      .pop()
      ?.trim() ?? cleanIp(req.socket?.remoteAddress);

  try {
    if (!ip) {
      throw "No IP address";
    }
    const data = await getIpLcation(ip);
    if (!data) throw "IP location data is undefined";
    serverProps.location = data;
  } catch (error) {
    console.log({ error });
    const countryCode = countryCodeFromHeaders(req.headers) as
      | MuiTelInputCountry
      | undefined;
    serverProps.location = { countryCode };
  }

  try {
    const data = await getAllCountries();
    if (!data) throw "Countries data is undefined";
    serverProps.countries = data;
  } catch (error) {
    console.log(error);
  }

  try {
    const data = await getCountryStates(
      serverProps.location.countryCode as string,
    );
    if (!data) throw "States data is undefined";
    serverProps.states = data;
  } catch (error) {
    console.log(error);
  }

  return { props: serverProps };
}

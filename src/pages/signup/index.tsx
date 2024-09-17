import { IncomingHttpHeaders, IncomingMessage } from "http";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldValues, useForm } from "react-hook-form";
import Head from "next/head";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { object, ObjectSchema, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useDispatch } from "react-redux";
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
import { PasswordField } from "@/components/PasswordField";
import { User } from "@/types/user";
import { signUp } from "@/api/auth";
import { setUser } from "@/redux/reducers";

type TServerProps = {
  location: Partial<TIPLocation>;
  countries: Partial<TCountry>[];
  states: TState[];
};

export type TFieldValues = {
  password: string;
  confirm_password: string;
} & Omit<User, "_id">;

const schema: ObjectSchema<TFieldValues> = object({
  firstname: string()
    .max(20, "First name cannot be more than 20 charaaters")
    .min(2, "First name cannot be less than 2 characters")
    .required(),
  lastname: string()
    .max(20, "Last name cannot be more than 20 charaaters")
    .min(2, "Last name cannot be less than 2 characters")
    .required(),
  email: string().email("Must be a valid email").required("Email is required"),
  password: string().required(),
  confirm_password: string()
    .required()
    .oneOf([ref("password")], "Passwords must match"),
  address: object({
    street: string().required("Street is required"),
    country: string().required("Country is required"),
    state: string().required("State is required"),
    city: string().required("City is required"),
  }),
  phone: string()
    .test({
      message: "Invalid phone number",
      exclusive: true,
      name: "isValidPhoneNumber",
      test: (value) => (value ? isValidPhoneNumber(value) : false),
    })
    .required("Phone is required"),
  zip_code: string().required("Zip/post code is required"),
});

export default function Signup(props: TServerProps) {
  const [countryStates, setCountryStates] = useState<TState[]>(props.states);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      address: {
        city: "",
        country: props.location.countryCode,
        state: "",
        street: "",
      },
      confirm_password: "",
    } as TFieldValues,
    resolver: yupResolver(schema),
  });

  const handleCountrySelect = async (country: Partial<TCountry>) => {
    if (country.isoCode) {
      try {
        const data = await getCountryStates(country.isoCode);
        if (!data) throw "States data undefined";
        setCountryStates(data);
      } catch (e) {
        console.log({ e });
      }
    }
  };

  const handleCountryChange = async () => {
    setValue("address.state", "");
  };

  const onSubmit = async (values: TFieldValues) => {
    const data = await signUp(values);
    console.log(data);
    if (data) {
      dispatch(setUser(data));
    }
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
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Last name"
                {...register("lastname")}
                label="Last name"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
            </Grid>
            <Grid className="gridItem" item>
              <TextField
                fullWidth
                placeholder="Email"
                {...register("email")}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid className="gridItem" item>
              <PasswordField
                fullWidth
                placeholder="Password"
                // {...register("password")}
                register={register}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
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
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
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
                {...register("address.street")}
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid className="gridItem" item>
                <ControlledTextField
                  control={
                    control as Control<FieldValues> & Control<TFieldValues>
                  }
                  select
                  onChange={handleCountryChange}
                  label="country"
                  fullWidth
                  defaultValue={props.location.countryCode}
                  name="address.country"
                  error={!!errors.address?.country}
                  helperText={errors.address?.country?.message}
                >
                  {props.countries.map((country) => (
                    <MenuItem
                      key={country.isoCode}
                      value={country.name}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </ControlledTextField>
              </Grid>
              <Grid className="gridItem" item>
                <ControlledTextField
                  control={
                    control as Control<FieldValues> & Control<TFieldValues>
                  }
                  name="address.state"
                  select
                  fullWidth
                  label="State"
                  placeholder="State"
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                >
                  {countryStates.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
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
                  {...register("address.city")}
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                />
              </Grid>
              <Grid className="gridItem" item>
                <TextField
                  fullWidth
                  label="Post Code/Zip Code"
                  placeholder="Post Code/Zip Code"
                  {...register("zip_code")}
                  error={!!errors.zip_code}
                  helperText={errors.zip_code?.message}
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
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
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

import { AxiosResponse } from "axios";
import { MuiTelInputCountry } from "mui-tel-input";
import { axios } from "./config";

export type Timezones = {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
};

export type TCountry = {
  name: string;
  phonecode: string;
  isoCode: MuiTelInputCountry;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones?: Timezones[];
};

export type TIPLocation = {
  status: "success" | "fail";
  country: string;
  countryCode: MuiTelInputCountry;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};

export type TState = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude?: string | null;
  longitude?: string | null;
};

export type TCity = {
    name: string;
    countryCode: string;
    stateCode: string;
    latitude?: string | null;
    longitude?: string | null;}

export async function getAllCountries() {
  try {
    const data: AxiosResponse<TCountry[]> = await axios.get(
      "/location/countries"
    );
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getCountryStates(countryCode: string) {
  try {
    const data: AxiosResponse<TState[]> = await axios.get(
      "/location/" + countryCode
    );
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getStateCities(countryCode: string, stateCode: string) {
  try {
    const data: AxiosResponse<TCity[]> = await axios.get(
      `/location/${countryCode}/${stateCode}`
    );
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getIpLcation(ipAddress: string) {
  try {
    const ipLocation: AxiosResponse<TIPLocation> = await axios.get(ipAddress, {
      baseURL: process.env.NEXT_PUBLIC_IP_API_URL,
    });
    return ipLocation.data;
  } catch (error) {
    console.log({ error });
  }
}

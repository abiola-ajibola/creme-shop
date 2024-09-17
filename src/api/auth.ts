import { AxiosResponse } from "axios";
import { axios } from "./config";
import { User } from "@/types/user";
import { TFieldValues } from "@/pages/signup";

export async function signIn(creds: { email: string; password: string }) {
  try {
    const repsonse: AxiosResponse<User> = await axios.post("auth/sign", creds);
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function signUp(userData: TFieldValues) {
  try {
    const repsonse: AxiosResponse<User> = await axios.post(
      "/auth/signup",
      userData,
    );
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

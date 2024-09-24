import { AxiosResponse } from "axios";
import { axios } from "./config";
import { User } from "@/types/user";
import { TFieldValues } from "@/pages/signup";

export async function signIn(creds: { email: string; password: string }) {
  try {
    const repsonse: AxiosResponse<{ status: string; user: User }> =
      await axios.post("auth/signin", creds);
    return repsonse.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function signUp(userData: TFieldValues) {
  try {
    const response: AxiosResponse<{
      status: string;
      user: User;
      token: string;
    }> = await axios.post("/auth/signup", userData);
    // localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log({ error });
  }
}

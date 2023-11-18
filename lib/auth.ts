import axios from "axios";
import { notifications } from "@mantine/notifications";

import { FormValueType } from "@/app/(pages)/(Auth)/auth/page";

export interface NewUserType {
  msg: string;
  user: number | string; // option for mongodb
}

export const register = async (fieldData: FormValueType) => {
  try {
    const { data } = await axios.post<NewUserType>(
      "/api/auth/register",
      fieldData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(data);

    return data;
  } catch (err: any) {
    notifications.show({
      title: "Registration Failed",
      message: err.response.data.msg || err.message,
      color: "red",
    });
  }
};

export const userFind = async (username: string) => {
  try {
    const { data } = await axios.get(`/api/user?username=${username}`, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (err: any) {
    notifications.show({
      title: "Not Found",
      message: err.response.data.msg || err.message,
      color: "red",
    });
  }
};

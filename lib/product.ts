import { notifications } from "@mantine/notifications";
import axios from "axios";

export const allProducts = async () => {
  try {
    const { data } = await axios.get("/api/product", {
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

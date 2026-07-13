import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export const getHouseById = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}/api/houses/${id}`);

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

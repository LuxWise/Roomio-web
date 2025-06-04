import axios from "axios";

const api = axios.create({
  baseURL: "/api/hotel",
  withCredentials: true,
});

export async function hotel() {
  try {
    const response = await api.get("/hotels");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function room() {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

import axios from "axios";

const api = axios.create({
  baseURL: "/api/hotel",
  withCredentials: true,
});

export async function getHotelsService() {
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

export async function getRoomsService() {
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

export async function getRoomsByDestinationService(destination: string) {
  try {
    const response = await api.post("/rooms/destination", {
      destination: destination,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function getRoomByIdService(id: string) {
  try {
    const response = await api.post(`/room`, { id: id });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function getRoomMediaByIdService(id: string) {
  try {
    const response = await api.post(`/room/media`, { id: id });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

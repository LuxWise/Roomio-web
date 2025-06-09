import axios from "axios";

interface Reservation {
  start: string;
  end: string;
  id: string;
}

const api = axios.create({
  baseURL: "/api/reservation",
  withCredentials: true,
});

export async function postReservationService({ start, end, id }: Reservation) {
  try {
    const response = await api.post(`/reserve`, {
      start: start,
      end: end,
      id: id,
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

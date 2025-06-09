import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";

interface Payload {
  start: string;
  end: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();
    console.log(data);

    if (!data.id || !data.start || !data.end) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Obtener el token de la cookie
    const cookie = req.cookies.get("auth_token");
    const token = cookie?.value;

    if (!token) {
      return NextResponse.json({ error: "No auth token" }, { status: 401 });
    }

    const res = await api.post(
      `/api/reservation`,
      {
        reservationStart: data.start,
        reservationEnd: data.end,
        roomId: data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({ success: true, data: res.data });
  } catch (e) {
    const error = e as AxiosError;
    console.log(e);
    if (error.response) {
      const status = error.response.status;
      const message = status === 401 ? "bad request" : e;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "No response received from auth service" },
      { status: 502 }
    );
  }
}

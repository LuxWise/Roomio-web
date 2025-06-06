import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";

interface Payload {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const res = await api.get(`/api/hotel/rooms/${data.id}`);
    return NextResponse.json({ success: true, data: res.data });
  } catch (e) {
    const error = e as AxiosError;
    console.log(e);
    if (error.response) {
      const status = error.response.status;
      const message = status === 401 ? "Bad credentials" : e;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "No response received from auth service" },
      { status: 502 }
    );
  }
}

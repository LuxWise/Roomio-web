import api from "@/lib/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  destination: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();

    if (!data.destination) {
      return NextResponse.json(
        { error: "Missing destination" },
        { status: 400 }
      );
    }

    const res = await api.get(
      `/api/hotel/rooms/destination/${data.destination}`
    );
    return NextResponse.json(
      { success: "success", data: res.data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ success: "Error", Error: e });
  }
}

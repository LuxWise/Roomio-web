import api from "@/lib/axiosInstance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await api.get("/api/hotel");
    return NextResponse.json(
      { success: "success", data: res.data },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ success: "Error", Error: e });
  }
}

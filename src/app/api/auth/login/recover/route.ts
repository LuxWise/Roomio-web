import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  email: string;
  locale: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();
    await api.post("/api/auth/recover/password", {
      email: data.email,
      locale: data.locale,
    });

    if (!data.email || !data.locale) {
      throw new Error("Missing data");
    }

    return NextResponse.json(
      { status: "success", message: "send code success" },
      { status: 200 }
    );
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const status = error.response.status;
      const message = status === 409 ? "User Exists" : e;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "No response received from auth service" },
      { status: 502 }
    );
  }
}

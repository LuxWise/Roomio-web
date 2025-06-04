import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();
    const res = await api.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    });

    return NextResponse.json(
      { status: "success", message: "login success" },
      { status: 200 }
    );
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

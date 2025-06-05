import api from "@/lib/axiosInstance";
import OperativeSystem from "@/utils/OperativeSystem";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();

    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const res = await api.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (!res.data.token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const response = NextResponse.json(
      { status: "success", message: "login success" },
      { status: 200 }
    );

    response.cookies.set("auth_token", res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: OperativeSystem() === "iOS" ? "lax" : "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
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

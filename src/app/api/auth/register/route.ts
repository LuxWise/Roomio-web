import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  code: string;
  locale: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: Payload = await req.json();

    if (
      !data.name ||
      !data.lastname ||
      !data.email ||
      !data.phone ||
      !data.password ||
      !data.code ||
      !data.locale
    ) {
      return NextResponse.json(
        { error: "Los datos no están completos" },
        { status: 400 }
      );
    }

    await api.post("/api/auth/register", {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      roleId: 1,
      code: data.code,
      locale: data.locale,
    });

    return NextResponse.json(
      { status: "success", message: "register success" },
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

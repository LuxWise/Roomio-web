import api from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  email: string;
  newPassword: string;
  code: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const data: Payload = await req.json();

    await api.patch("/api/auth/password", {
      email: data.email,
      newPassword: data.newPassword,
      code: data.code,
    });

    if (!data.email || !data.newPassword || !data.code) {
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
      console.log(error);
      const message = status === 409 ? "User Exists" : e;
      return NextResponse.json({ error: message }, { status });
    }
    return NextResponse.json(
      { error: "No response received from auth service" },
      { status: 502 }
    );
  }
}

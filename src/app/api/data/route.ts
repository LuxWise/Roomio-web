import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const text = formData.get("text") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const backendForm = new FormData();
    backendForm.append("email", email);
    backendForm.append("subject", subject);
    backendForm.append("text", text);
    backendForm.append("file", file, file.name);

    const res = await fetch("http://correos:8084/mail/sendWithAttachment", {
      method: "POST",
      body: backendForm,
    });

    const data = await res.text();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

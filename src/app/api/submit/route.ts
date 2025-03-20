import { NextResponse } from "next/server";
import NewAppEmailTemplate from "@/components/misc/templates/new-app-email-template";
import { Resend } from "resend";
import { SubmissionFormData } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_FROM!;
const receiver = process.env.RESEND_TO!;

export async function POST(request: Request) {
  const formData = await request.formData();

  const formDataObj = Object.fromEntries(
    formData
  ) as unknown as SubmissionFormData;

  try {
    const { appName, appUrl } = formDataObj;

    if (!appName.trim() || !appUrl.trim()) {
      throw new Error("Submission Failed. Missing Field");
    }

    const { error } = await resend.emails.send({
      from: `EncryptedList <${sender}>`,
      to: receiver,
      subject: `Submitting New App (EncryptedList)`,
      react: NewAppEmailTemplate(formDataObj)
    });

    if (error) {
      throw new Error("Submission Failed Due to an Issue with the Server.");
    }

    return NextResponse.json(
      {
        message: "App Submitted Successfully."
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

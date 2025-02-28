import { NextResponse } from "next/server";
import ReportEmailTemplate from "@/components/shared/templates/report-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_FROM!;
const receiver = process.env.RESEND_TO!;

export async function POST(request: Request) {
  const { reportData } = await request.json();

  try {
    const { productName, problem } = reportData;

    if (!productName.trim() || !problem.trim()) {
      throw new Error("Submission Failed. Missing Field");
    }

    const { error } = await resend.emails.send({
      from: `EncryptedList <${sender}>`,
      to: receiver,
      subject: `Reporting "${productName}" (EncryptedList)`,
      react: ReportEmailTemplate(reportData)
    });

    if (error) {
      throw new Error("Submission Failed Due to an Issue with the Server.");
    }

    return NextResponse.json(
      {
        message: "Report Submitted Successfully."
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

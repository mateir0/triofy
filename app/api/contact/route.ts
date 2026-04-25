import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  _honeypot: z.string().max(0, "Bot detected"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Log the submission (in production, integrate with email/CRM)
    console.log("Contact form submission:", {
      name: result.data.name,
      email: result.data.email,
      company: result.data.company,
      budget: result.data.budget,
      service: result.data.service,
      message: result.data.message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

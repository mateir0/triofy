import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().min(1, "Budget is required"),
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
      projectType: result.data.projectType,
      budget: result.data.budget,
      message: result.data.message,
    });

    return NextResponse.json(
      {
        success: true,
        note: "Lead captured. Email delivery and CRM integration placeholder active; connect provider via environment configuration.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

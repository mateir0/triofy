import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().email("Invalid email address"),
  company: z.string().trim().max(120, "Company name is too long").optional(),
  budget: z.string().trim().max(120, "Budget value is too long").optional(),
  service: z.string().trim().max(200, "Service value is too long").optional(),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message is too long"),
  _honeypot: z.string().max(0, "Bot detected"),
  _submittedAt: z.number().int().positive("Invalid submission time"),
});

const minimumSubmitDelayMs = 3000;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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

    if (Date.now() - result.data._submittedAt < minimumSubmitDelayMs) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "infoclientify@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Triofy Contact <onboarding@resend.dev>";
    const company = result.data.company || "Not provided";
    const budget = result.data.budget || "Not provided";
    const service = result.data.service || "Not provided";
    const name = result.data.name;
    const email = result.data.email;
    const message = result.data.message;

    const plainText = [
      "New contact form submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Budget: ${budget}`,
      `Service: ${service}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: "New Triofy contact form submission",
      text: plainText,
      html,
    });

    void resend.emails
      .send({
        from: fromEmail,
        to: [email],
        subject: "We received your message",
        text: `Hi ${name},\n\nThanks for contacting Triofy. We received your message and will get back to you within 24 hours.\n\n- Triofy`,
      })
      .catch((error) => {
        console.error("Failed to send contact confirmation email", error);
      });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

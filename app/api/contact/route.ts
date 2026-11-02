import { validateContactForm, type ContactFormData } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: Partial<ContactFormData> = await request.json();

    // Validate form input
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          message: "Validation failed. Please review your input.",
        },
        { status: 400 },
      );
    }

    const { name, email, service, budget, message } = body;

    // Log received lead details securely on server
    console.log("[New Lead Inquiry Received]:", {
      name,
      email,
      service: service || "Not specified",
      budget: budget || "Not specified",
      messageLength: message?.length,
      timestamp: new Date().toISOString(),
    });

    // If an external email provider or CRM webhook is configured, dispatch here:
    // e.g. await sendEmail({ to: 'hello@endowtech.dev', from: email, ... })

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your inquiry has been received. Our team will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error processing inquiry. Please reach out via WhatsApp.",
      },
      { status: 500 },
    );
  }
}

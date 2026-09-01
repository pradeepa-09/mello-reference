import { NextRequest, NextResponse } from "next/server";
import { validateContactInput } from "@/lib/backend/validators";

export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 * Handle contact / partnership requests.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const validation = validateContactInput(body);

    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid contact form submission.",
            details: validation.errors,
          },
        },
        { status: 400 }
      );
    }

    // Optional Slack webhook dispatch
    const slackUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackUrl) {
      fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📬 *New Contact Message*\n• *From:* ${validation.data.name || "Anonymous"} (<${validation.data.email}>)\n• *Subject:* ${validation.data.subject || "No Subject"}\n• *Message:* ${validation.data.message}`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: "Your message has been received. We will be in touch shortly." },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/contact] Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        },
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { validateWaitlistInput } from "@/lib/backend/validators";
import { waitlistService } from "@/lib/backend/waitlist.service";

export const dynamic = "force-dynamic";

/**
 * POST /api/waitlist
 * Submit an email to join the Mello desktop waitlist.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const validation = validateWaitlistInput(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid waitlist submission.",
            details: validation.errors,
          },
        },
        { status: 400 }
      );
    }

    // Extract optional request telemetry
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const record = await waitlistService.register({
      ...validation.data,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: record.id,
          email: record.email,
          platform: record.platform,
          status: record.status,
          createdAt: record.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/waitlist] Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while saving your submission.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * Returns stats (protected by ADMIN_API_KEY header).
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;

  if (adminKey && authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } },
      { status: 401 }
    );
  }

  const stats = await waitlistService.getStats();
  return NextResponse.json({ success: true, data: stats });
}

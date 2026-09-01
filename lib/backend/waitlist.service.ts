import crypto from "crypto";
import type { CreateWaitlistDto, WaitlistRecord } from "./types";

// In-memory store for local development without DB configured
const memoryStore = new Map<string, WaitlistRecord>();

export class WaitlistService {
  /**
   * Save a waitlist signup.
   * If a record with this email and platform already exists, returns existing record.
   * Otherwise generates a new UUID record and dispatches optional notifications.
   */
  async register(dto: CreateWaitlistDto): Promise<WaitlistRecord> {
    const key = `${dto.email}_${dto.platform}`;
    const existing = memoryStore.get(key);

    if (existing) {
      return existing;
    }

    const id = `wl_${crypto.randomUUID()}`;
    const now = new Date().toISOString();

    const record: WaitlistRecord = {
      id,
      email: dto.email,
      platform: dto.platform,
      status: "accepted",
      source: dto.source,
      referrer: dto.referrer,
      createdAt: now,
      updatedAt: now,
    };

    // Store in memory (fallback)
    memoryStore.set(key, record);

    // Asynchronously dispatch external webhooks / notifications if configured
    this.dispatchWebhookNotifications(record).catch((err) => {
      console.error("[WaitlistService] Notification dispatch error:", err);
    });

    return record;
  }

  /**
   * Returns list of all entries (protected endpoint).
   */
  async getAll(): Promise<WaitlistRecord[]> {
    return Array.from(memoryStore.values());
  }

  /**
   * Returns stats summary.
   */
  async getStats(): Promise<{ total: number; macOS: number; Windows: number }> {
    const all = Array.from(memoryStore.values());
    return {
      total: all.length,
      macOS: all.filter((r) => r.platform === "macOS").length,
      Windows: all.filter((r) => r.platform === "Windows").length,
    };
  }

  /**
   * Optional webhook notification to Slack / Discord / CRM.
   */
  private async dispatchWebhookNotifications(record: WaitlistRecord): Promise<void> {
    const slackUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackUrl) {
      try {
        await fetch(slackUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `✨ *New Mello Waitlist Signup!*\n• *Email:* \`${record.email}\`\n• *Platform:* *${record.platform}*\n• *Time:* ${record.createdAt}`,
          }),
        });
      } catch {
        // Non-blocking
      }
    }
  }
}

export const waitlistService = new WaitlistService();

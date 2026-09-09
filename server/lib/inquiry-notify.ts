import { Resend } from "resend";
import { PUBLIC_INQUIRY_EMAIL } from "@shared/contact";

// Use the verified novapath.dev sender from the shared Resend account unless
// CONTACT_FROM_EMAIL is set. The destination inbox is independent of From.
const DEFAULT_FROM = "NovaPath Education <hello@novapath.dev>";

export type InquiryNotifyInput = {
  source: string;
  subject: string;
  replyTo: string;
  fields: Record<string, string | null | undefined>;
};

interface ResendConnectionSettings {
  settings: {
    api_key: string;
  };
}

interface ConnectorListResponse {
  items?: ResendConnectionSettings[];
}

export function inquiryToEmail(
  env: NodeJS.ProcessEnv = process.env,
): string {
  return (
    env.CONTACT_TO_EMAIL?.trim() ||
    env.CONTACT_TO?.trim() ||
    PUBLIC_INQUIRY_EMAIL
  );
}

export function inquiryFromEmail(
  env: NodeJS.ProcessEnv = process.env,
): string {
  return env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function filledRows(
  fields: Record<string, string | null | undefined>,
): Array<[string, string]> {
  return Object.entries(fields).flatMap(([label, value]) => {
    const text = value?.trim() ?? "";
    return text ? [[label, text] as [string, string]] : [];
  });
}

export function buildInquiryEmail(input: InquiryNotifyInput): {
  html: string;
  text: string;
} {
  const rows = filledRows(input.fields);
  const text = [
    `New Education inquiry (${input.source})`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong><br/>${escapeHtml(value).replace(/\n/g, "<br/>")}</p>`,
    )
    .join("");

  const html = `<p>New Education inquiry (${escapeHtml(input.source)})</p>${htmlRows}`;
  return { html, text };
}

async function getResendApiKey(): Promise<string> {
  const fromEnv = process.env.RESEND_API_KEY?.trim();
  if (fromEnv) {
    return fromEnv;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      "Inquiry email is not configured. Set RESEND_API_KEY or connect the Resend integration in Replit.",
    );
  }

  const response = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=resend",
    {
      signal: AbortSignal.timeout(10000),
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Resend connector API returned ${response.status}`);
  }

  const data = (await response.json()) as ConnectorListResponse;
  const apiKey = data.items?.[0]?.settings?.api_key;
  if (!apiKey) {
    throw new Error("Resend is not connected in this Replit.");
  }
  return apiKey;
}

/**
 * Sends a team notification after an inquiry is saved.
 * Failures are logged and do not reject the visitor's successful save.
 */
export async function notifyTeamInquiry(
  input: InquiryNotifyInput,
): Promise<boolean> {
  const to = inquiryToEmail();
  const from = inquiryFromEmail();
  const { html, text } = buildInquiryEmail(input);

  try {
    const apiKey = await getResendApiKey();
    const client = new Resend(apiKey);
    const { error } = await client.emails.send({
      from,
      to: [to],
      replyTo: input.replyTo,
      subject: input.subject,
      html,
      text,
    });
    if (error) {
      throw new Error(error.message || error.name || "Resend send failed");
    }
    return true;
  } catch (error) {
    console.error(
      `Failed to notify ${to} for ${input.source} inquiry:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return false;
  }
}

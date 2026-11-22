import "server-only";

import { Resend } from "resend";
import { getResendEnv } from "@/lib/supabase/env";

export type MailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type MailResult =
  | { sent: true }
  | { sent: false; reason: "not_configured" | "send_failed" };

function getClient() {
  const env = getResendEnv();
  if (!env) return null;
  return { client: new Resend(env.apiKey), env };
}

export async function sendMail(payload: MailPayload): Promise<MailResult> {
  const configured = getClient();
  if (!configured) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    const { error } = await configured.client.emails.send({
      from: configured.env.fromEmail,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    if (error) {
      console.error("[email] send failed", error.message);
      return { sent: false, reason: "send_failed" };
    }

    return { sent: true };
  } catch (error) {
    console.error("[email] unexpected error", error);
    return { sent: false, reason: "send_failed" };
  }
}

export async function sendAdminAndApplicantMails(options: {
  adminSubject: string;
  adminText: string;
  adminHtml: string;
  applicantEmail: string;
  applicantSubject: string;
  applicantText: string;
  applicantHtml: string;
}): Promise<{ admin: MailResult; applicant: MailResult }> {
  const configured = getClient();
  if (!configured) {
    return {
      admin: { sent: false, reason: "not_configured" },
      applicant: { sent: false, reason: "not_configured" },
    };
  }

  const admin = await sendMail({
    to: configured.env.adminEmail,
    subject: options.adminSubject,
    text: options.adminText,
    html: options.adminHtml,
  });

  const applicant = await sendMail({
    to: options.applicantEmail,
    subject: options.applicantSubject,
    text: options.applicantText,
    html: options.applicantHtml,
  });

  return { admin, applicant };
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

import { Resend } from "resend";
import { escapeHtml } from "./visitor";

// Construct the Resend client lazily. The Resend constructor throws when no API
// key is present, which would otherwise crash `next build` (page-data
// collection) in any environment where RESEND_API_KEY isn't set. Returning null
// lets email simply no-op when unconfigured.
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

// Resend's shared "onboarding@resend.dev" sender only delivers to the Resend
// account owner's own address. To reach providers, set EMAIL_FROM to an address
// on a domain you've verified in Resend (e.g. "Mariposa Local Services <hello@yourdomain.com>").
const FROM_ADDRESS =
  process.env.EMAIL_FROM ||
  "Mariposa Local Services <onboarding@resend.dev>";

interface SendApprovalEmailParams {
  providerName: string;
  providerEmail: string;
  categoryName: string;
}

export async function sendApprovalEmail({
  providerName,
  providerEmail,
  categoryName,
}: SendApprovalEmailParams) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping approval email.");
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: providerEmail,
    subject: "Your listing has been approved! — Mariposa Local Services",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a5276; font-size: 24px;">Welcome to Mariposa Local Services!</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi <strong>${providerName}</strong>,
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Great news — your listing under <strong>${categoryName}</strong> has been approved!
          Your business will now be visible to locals searching for services in the Mariposa area.
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          If you have any questions, just reply to this email or contact us at
          <a href="mailto:goehring.cory@gmail.com" style="color: #1a5276;">goehring.cory@gmail.com</a>.
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Thank you for being part of our local community directory!
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 14px; color: #888;">
          Mariposa Local Services — Your trusted local directory
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send approval email:", error);
    throw error;
  }

  return data;
}

interface SendNotificationToAdminParams {
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  categoryName: string;
}

export async function sendNewSubmissionNotification({
  providerName,
  providerEmail,
  providerPhone,
  categoryName,
}: SendNotificationToAdminParams) {
  const adminEmail = process.env.ADMIN_EMAIL || "goehring.cory@gmail.com";

  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping admin notification email.");
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: adminEmail,
    subject: `New listing submission: ${providerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a5276; font-size: 24px;">New Listing Submission</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          A new business has submitted a listing for review:
        </p>
        <table style="font-size: 16px; color: #333; line-height: 1.8;">
          <tr><td style="padding-right: 12px;"><strong>Business:</strong></td><td>${providerName}</td></tr>
          <tr><td style="padding-right: 12px;"><strong>Category:</strong></td><td>${categoryName}</td></tr>
          <tr><td style="padding-right: 12px;"><strong>Email:</strong></td><td>${providerEmail}</td></tr>
          <tr><td style="padding-right: 12px;"><strong>Phone:</strong></td><td>${providerPhone}</td></tr>
        </table>
        <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 20px;">
          Log in to the <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin" style="color: #1a5276;">admin dashboard</a> to review and approve this listing.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send admin notification:", error);
    // Don't throw — notification failure shouldn't block submission
  }

  return data;
}

interface SendLeadNotificationParams {
  lead: {
    customerName: string;
    phone: string;
    email: string | null;
    message: string;
  };
  providerName: string;
  providerEmail: string;
  categoryName: string;
}

/**
 * Delivers a quote request to the provider, with the admin copied so there's a
 * record of the lead landing even if the provider never replies.
 *
 * Every interpolated value here is attacker-controlled (the form is public and
 * unauthenticated), so all of it is escaped before it reaches the HTML.
 */
export async function sendLeadNotification({
  lead,
  providerName,
  providerEmail,
  categoryName,
}: SendLeadNotificationParams) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping lead notification email.");
    return null;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "goehring.cory@gmail.com";

  const name = escapeHtml(lead.customerName);
  const phone = escapeHtml(lead.phone);
  const email = lead.email ? escapeHtml(lead.email) : null;
  const message = escapeHtml(lead.message).replace(/\n/g, "<br />");
  const business = escapeHtml(providerName);
  const category = escapeHtml(categoryName);
  const dialable = lead.phone.replace(/\D/g, "");

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: providerEmail,
    cc: adminEmail,
    // Lets the provider hit reply and reach the customer directly when they
    // left an address.
    ...(lead.email ? { replyTo: lead.email } : {}),
    subject: `New job request from ${lead.customerName} — Mariposa Local Services`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a5276; font-size: 24px;">You have a new job request!</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi <strong>${business}</strong>, someone found you on Mariposa Local
          Services under <strong>${category}</strong> and wants to hear from you.
        </p>
        <div style="background: #f7f7f7; border-left: 4px solid #d4ac0d; padding: 16px; margin: 20px 0;">
          <table style="font-size: 16px; color: #333; line-height: 1.8;">
            <tr><td style="padding-right: 12px;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding-right: 12px;"><strong>Phone:</strong></td><td><a href="tel:${dialable}" style="color: #1a5276;">${phone}</a></td></tr>
            ${email ? `<tr><td style="padding-right: 12px;"><strong>Email:</strong></td><td><a href="mailto:${email}" style="color: #1a5276;">${email}</a></td></tr>` : ""}
          </table>
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 12px;">
            <strong>What they need:</strong><br />${message}
          </p>
        </div>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          <strong>Call them back soon</strong> — folks usually contact more than
          one provider, and the first to respond most often gets the job.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 14px; color: #888;">
          Mariposa Local Services — Your trusted local directory
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send lead notification:", error);
    throw error;
  }

  return data;
}

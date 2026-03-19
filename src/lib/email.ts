import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  const { data, error } = await resend.emails.send({
    from: "Mariposa Local Services <onboarding@resend.dev>",
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

  const { data, error } = await resend.emails.send({
    from: "Mariposa Local Services <onboarding@resend.dev>",
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

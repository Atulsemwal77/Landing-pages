// utils/emailTemplates.js

// Basic HTML escaping
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple html -> text fallback
function htmlToText(html = "") {
  return html
    .replace(/<\/tr>/g, "\n")
    .replace(/<\/t[dh]>/g, " | ")
    .replace(/<(?:.|\n)*?>/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Returns { html, text }
 * - name: recipient name (string)
 * - pdfUrl: public URL to the PDF (string)
 * - whatsappLink: whatsapp invite link (string)
 * - telegramLink: telegram invite link (string, optional)
 * - companyName, contactEmail, unsubscribeUrl optional
 */
function replyTemplate({
  name,
  pdfUrl,
  whatsappLink,
  telegramLink = "",
  companyName = "Freelance Portal",
  contactEmail = "support@freelance-portal.com",
  unsubscribeUrl = "",
}) {
  const safeName = escapeHtml(name || "friend");
  const safePdf = escapeHtml(pdfUrl || "#");
  const safeWhatsapp = escapeHtml(whatsappLink || "#");
  const safeTelegram = escapeHtml(telegramLink || "");
  const year = new Date().getFullYear();

  const preheader =
    "Thanks for reaching out — here’s a free PDF to get you started plus our WhatsApp community link.";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${escapeHtml(companyName)} — Resource</title>
    <style>
      /* Basic safe inline styles for most clients - keep small */
      body { margin:0; padding:0; background:#f6f8fb; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:#111827; }
      a { color:inherit; text-decoration:none; }
      .btn { display:inline-block; padding:12px 18px; border-radius:10px; font-weight:600; text-decoration:none; }
      .btn-primary { background:linear-gradient(90deg,#7c3aed,#ec4899); color:#fff; }
      .btn-whatsapp { background:#25D366; color:#fff; }
      .btn-telegram { background:#0088cc; color:#fff; }
      .card { background:#ffffff; border-radius:12px; box-shadow:0 8px 30px rgba(15,23,42,0.06); overflow:hidden; }
      .container { width:100%; max-width:640px; margin:0 auto; padding:20px; }
      .footer { color:#94a3b8; font-size:13px; }
      .muted { color:#6b7280; }
      @media (max-width:480px) {
        .container { padding:12px; }
        .btn { padding:10px 14px; font-size:15px; }
      }
    </style>
  </head>
  <body>
    <!-- Preheader: shown in inbox preview -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;">${escapeHtml(preheader)}</div>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:20px 12px;">
          <div class="container">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card">
              <tr>
                <td style="padding:28px;">
                  <!-- Header -->
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                    <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(90deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
                      FP
                    </div>
                    <div>
                      <div style="font-weight:700;font-size:16px;color:#0f172a;">${escapeHtml(companyName)}</div>
                      <div class="muted" style="font-size:13px;">Verified leads & freelancer resources</div>
                    </div>
                  </div>

                  <!-- Greeting -->
                  <h2 style="font-size:20px;margin:18px 0 8px 0;color:#0f172a;">Hi ${safeName},</h2>
                  <p style="margin:0 0 16px 0;color:#374151;">
                    Thanks for reaching out — we received your message and will get back to you shortly.
                  </p>

                  <!-- Resource CTA -->
                  <p style="margin:10px 0 18px 0;color:#374151;">
                    Meanwhile, here’s a helpful guide to price your services and win better clients:
                  </p>
                  <p style="margin:0 0 20px 0;">
                    <a class="btn btn-primary" href="${safePdf}" target="_blank" rel="noopener noreferrer">Download: Freelancer Pricing Guide (PDF)</a>
                  </p>

                  <!-- Community CTAs -->
                  <p style="margin:0 0 8px 0;color:#374151;">Join our community for faster updates and peer support:</p>
                  <p style="margin:8px 0 18px 0;display:flex;gap:8px;flex-wrap:wrap;">
                    <a class="btn btn-whatsapp" href="${safeWhatsapp}" target="_blank" rel="noopener noreferrer">Join WhatsApp Group</a>
                    ${safeTelegram ? `<a class="btn btn-telegram" href="${safeTelegram}" target="_blank" rel="noopener noreferrer">Join Telegram</a>` : ""}
                  </p>

                  <!-- Fallback link & contact -->
                  <p style="font-size:13px;color:#6b7280;margin-top:6px;">
                    If the button doesn’t work, open this link: <br/>
                    <a href="${safePdf}" target="_blank" rel="noopener noreferrer">${safePdf}</a>
                  </p>

                  <hr style="border:none;border-top:1px solid #eef2ff;margin:22px 0;" />

                  <p style="margin:0;color:#6b7280;font-size:13px;">
                    Need help? Reply to this email or contact us at
                    <a href="mailto:${escapeHtml(contactEmail)}" style="color:#374151">${escapeHtml(contactEmail)}</a>.
                  </p>

                  <p class="footer" style="margin:10px 0 0 0;">
                    © ${year} ${escapeHtml(companyName)}${unsubscribeUrl ? ` • <a href="${escapeHtml(unsubscribeUrl)}" style="color:#94a3b8">Unsubscribe</a>` : ""}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  // plain text fallback
  const text = htmlToText(
    `Hi ${safeName},

Thanks for reaching out — we received your message and will get back to you shortly.

Download: ${safePdf}
WhatsApp: ${safeWhatsapp}
${safeTelegram ? `Telegram: ${safeTelegram}` : ""}

If you need help, reply to this email or contact ${contactEmail}.

Regards,
${companyName}
`
  );

  return { html, text };
}

module.exports = { replyTemplate };

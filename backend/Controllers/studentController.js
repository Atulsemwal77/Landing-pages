const Student = require("../Models/StudentModal");
const sendEmail = require("../Middleware/sendMail");

const pdfUrl =
  "https://docs.google.com/document/d/1EW9S14bTu6zY871uDsaf-HxjrA2p-dl7YUcLsVMQvG4/edit?usp=sharing";
const whatsappLink = "https://chat.whatsapp.com/IQ8aJHlJC0U1YI9OaZ8Gid";
const telegramLink = "https://t.me/nnhire";
// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: students });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST create student
exports.createStudent = async (req, res) => {
  try {
    const { name, num, email, education, location, interest } = req.body;

    if (!name || !num || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number, and email are required",
      });
    }

    const student = new Student({
      name,
      num,
      email,
      education,
      location,
      interest,
    });

    await student.save();

    try {
      // Create a clean, consistent email template
       const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Sarkari Parikha</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="padding:32px 32px 24px;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px 12px 0 0;">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">Welcome to Sarkari Parikha! 🎉</h1>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding:32px;">
                  <h2 style="margin:0 0 16px;color:#111827;font-size:20px;font-weight:600;">Hi ${student.name},</h2>
                  
                  <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
                    Thank you for joining <strong>Sarkari Parikha</strong>! We're excited to have you on board.
                  </p>
                  
                  <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
                    We'll send verified government job leads, exam resources, and helpful updates directly to <strong>${student.email}</strong>.
                  </p>

                  <!-- CTA Buttons -->
                  <div style="margin:32px 0;padding:24px;background-color:#f3f4f6;border-radius:8px;text-align:center;">
                    <p style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:600;">Get Started with These Resources:</p>
                    
                    <a href="${pdfUrl}" target="_blank" style="display:inline-block;margin:8px 4px;padding:12px 24px;background:linear-gradient(90deg,#7c3aed,#ec4899);color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                      📄 Download Study Guide
                    </a>
                    
                    <br/>
                    
                    <a href="${whatsappLink}" target="_blank" style="display:inline-block;margin:8px 4px;padding:12px 24px;background-color:#25D366;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                      💬 Join WhatsApp Group
                    </a>
                    
                    ${telegramLink ? `
                    <a href="${telegramLink}" target="_blank" style="display:inline-block;margin:8px 4px;padding:12px 24px;background-color:#0088cc;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
                      ✈️ Join Telegram Channel
                    </a>
                    ` : ''}
                  </div>

                  <!-- What to Expect -->
                  <div style="margin:24px 0;padding:20px;background-color:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px;">
                    <p style="margin:0;color:#92400e;font-size:14px;line-height:1.5;">
                      <strong>💡 What to expect:</strong><br/>
                      • Daily job notifications & exam alerts<br/>
                      • Free study materials & preparation tips<br/>
                      • Community support from fellow aspirants
                    </p>
                  </div>

                  <p style="margin:24px 0 0;color:#6b7280;font-size:14px;line-height:1.5;">
                    If you have any questions or need assistance, feel free to reach out. We're here to help you succeed!
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:24px 32px;background-color:#f9fafb;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;">
                  <p style="margin:0 0 8px;color:#111827;font-size:14px;font-weight:600;">Best regards,</p>
                  <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">Team Sarkari Parikha</p>
                  
                  <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.4;">
                    <em>If buttons don't work, copy this link:</em><br/>
                    <a href="${pdfUrl}" style="color:#7c3aed;text-decoration:none;">${pdfUrl}</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

      await sendEmail(
        student.email,
        "Welcome to Sarkari Parikha - Your Journey Starts Here! 🚀",
        emailTemplate
      );
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr);
      // Optionally: Log to monitoring service (e.g., Sentry, LogRocket)
      // You might want to queue this for retry or notify admins
    }

    return res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

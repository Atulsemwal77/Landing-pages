const Student = require("../itLandingPage/studentModal");
const sendEmail = require("../Middleware/sendMail");

const pdfUrl =
  "https://docs.google.com/document/d/1EW9S14bTu6zY871uDsaf-HxjrA2p-dl7YUcLsVMQvG4/edit?usp=sharing";
const whatsappLink = "https://chat.whatsapp.com/IQ8aJHlJC0U1YI9OaZ8Gid";
const telegramLink = "https://t.me/nnhire";
const logo =
  "https://res.cloudinary.com/deqqsyymm/image/upload/v1764219652/download_laafbv.jpg";

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
    const { name, num, email, skill, bio } = req.body;

    if (!name || !num || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number, and email are required",
      });
    }

    // const exist = await Student.findOne({ email });
    // if (exist) {
    //   return res
    //     .status(409)
    //     .json({ success: false, message: "Email already exists" });
    // }

    const student = new Student({
      name,
      num,
      email,
      skill,
      bio,
    });

    await student.save();

    try {
      const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to It Landing Page</title>
</head>
<body style="margin:0;padding:0;background-color:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;padding:30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="padding:0 24px;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px 12px 0 0;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Welcome to It Landing page  🎉</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 24px;">
              <h2 style="margin:0 0 10px;color:#111827;font-size:18px;font-weight:600;">Hi ${
                student.name
              },</h2>
              
              <p style="margin:0 0 10px;color:#374151;font-size:15px;line-height:1.5;">
                Thank you for joining <strong>It Landing page</strong>! We're excited to have you on board.
              </p>
              
              <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.5;">
                We'll send verified government job leads, exam resources, and helpful updates directly to <strong>${
                  student.email
                }</strong>.
              </p>

              <!-- CTA Buttons -->
              <div style="margin:20px 0;padding:18px;background-color:#f3f4f6;border-radius:8px;text-align:center;">
                <p style="margin:0 0 12px;color:#111827;font-size:15px;font-weight:600;">Get Started with These Resources:</p>
                
                <a href="${pdfUrl}" target="_blank" style="display:inline-block;margin:6px;padding:10px 20px;background:linear-gradient(90deg,#7c3aed,#ec4899);color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  📄 Download Study Guide
                </a>

                <br />
                
                <a href="${whatsappLink}" target="_blank" style="display:inline-block;margin:6px;padding:10px 20px;background-color:#25D366;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  💬 Join WhatsApp Group
                </a>

                ${
                  telegramLink
                    ? `
                <a href="${telegramLink}" target="_blank" style="display:inline-block;margin:6px;padding:10px 20px;background-color:#0088cc;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
                  ✈️ Join Telegram Channel
                </a>
                `
                    : ""
                }
              </div>

              <!-- What to Expect -->
              <div style="margin:16px 0;padding:16px;background-color:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px;">
                <p style="margin:0;color:#92400e;font-size:13px;line-height:1.4;">
                  <strong>💡 What to expect:</strong><br/>
                  • Daily job notifications & exam alerts<br/>
                  • Free study materials & preparation tips<br/>
                  • Community support from fellow aspirants
                </p>
              </div>

              <p style="margin:16px 0 0;color:#6b7280;font-size:13px;line-height:1.4;">
                If you have any questions or need assistance, feel free to reach out. We're here to help you succeed!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 24px;background-color:#f9fafb;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 6px;color:#111827;font-size:13px;font-weight:600;">Best regards,</p>
              <p style="margin:0 0 12px;color:#6b7280;font-size:13px;">Team It Landing page</p>
              
              <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.4;">
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
        "Welcome to It Landing page  - Your Journey Starts Here! 🚀",
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

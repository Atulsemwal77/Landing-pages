const Student = require("../freelancer/studentModal");
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
      // Create a clean, consistent email template

      const emailTemplate = `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">

      <!-- Logo Section -->
      <div style="text-align:center; padding:20px 0; background:#ffffff;">
        <img src="${logo}" alt="Logo" style="max-width:150px; height:auto;" />
      </div>

      <!-- Header -->
      <div style="background:#4b7bec; padding:20px; text-align:center; color:white;">
        <h2 style="margin:0;">Thank You for Connecting With Us!</h2>
      </div>

      <!-- Body -->
      <div style="padding:25px; color:#333; line-height:1.6;">
        <p>Hi,${student.name}</p>
        <p>Thank you for connecting with us! 🎉  
        We appreciate your interest and we're excited to share valuable resources with you.</p>

        <h3 style="margin-top:20px;">🎁 Free PDF Resource</h3>
        <p>Click the button below to download your free PDF:</p>

        <!-- PDF Button -->
        <div style="text-align:center; margin:20px 0;">
          <a href="${pdfUrl}" 
            style="background:#4b7bec; padding:12px 20px; color:white; text-decoration:none; border-radius:6px; display:inline-block;">
            📄 Download Free PDF
          </a>
        </div>

        <h3>📌 Join Our Community</h3>
        <p>Stay updated with important content, updates, and opportunities:</p>

        <!-- WhatsApp Button -->
        <div style="text-align:center; margin:15px 0;">
          <a href="${whatsappLink}" 
            style="background:#25D366; padding:12px 20px; color:white; text-decoration:none; border-radius:6px; display:inline-block;">
            📱 Join WhatsApp Group
          </a>
        </div>

        <!-- Telegram Button -->
        <div style="text-align:center; margin-bottom:25px;">
          <a href="${telegramLink}" 
            style="background:#0088cc; padding:12px 20px; color:white; text-decoration:none; border-radius:6px; display:inline-block;">
            🚀 Join Telegram Channel
          </a>
        </div>

        <p>If you have any questions, feel free to reply to this email.  
        We're here to help!</p>

        <p style="margin-top:25px;">Regards,<br><strong>Freelancerlanding page</strong></p>
      </div>

      <!-- Footer -->
      <div style="background:#f1f1f1; text-align:center; padding:15px; font-size:13px; color:#777;">
        © ${new Date().getFullYear()} Freelancer lnading page All Rights Reserved.
      </div>
    </div>
  </div> `;

      await sendEmail(
        student.email,
        "Welcome to freelancer  - Your Journey Starts Here! 🚀",
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

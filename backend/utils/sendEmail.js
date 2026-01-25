import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, link) => {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
  await transporter.sendMail({
    from: `"Skill Qualifier" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `
<html>
  <body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <!-- Container -->
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:12px; padding:32px;
                   box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:16px;">
                <h1 style="margin:0; font-size:26px; color:#111827; font-weight:700;">
                  Skill Qualifier
                </h1>
                <p style="margin:6px 0 0; font-size:14px; color:#6b7280;">
                  Verify your email to get started
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:16px 0;">
                <hr style="border:none; border-top:1px solid #e5e7eb;" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td>
                <h2 style="font-size:20px; color:#111827; margin:0 0 12px;">
                  Verify your email address
                </h2>

                <p style="font-size:15px; color:#374151; line-height:1.6; margin:0 0 16px;">
                  Hello,
                </p>

                <p style="font-size:15px; color:#374151; line-height:1.6; margin:0 0 20px;">
                  Thanks for signing up with <strong>Skill Qualifier</strong>.
                  Please confirm your email address to activate your account.
                </p>

                <!-- CTA -->
                <div style="text-align:center; margin:32px 0;">
                  <a href="${link}"
                    style="background:#4f46e5; color:#ffffff; text-decoration:none;
                           padding:14px 28px; font-size:15px; font-weight:600;
                           border-radius:8px; display:inline-block;">
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#6b7280; margin:0 0 8px;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; color:#2563eb; word-break:break-all; margin:0 0 24px;">
                  ${link}
                </p>

                <p style="font-size:13px; color:#6b7280; line-height:1.6; margin:0;">
                  If you didn’t create an account with Skill Qualifier, you can safely ignore this email.
                </p>

                <p style="font-size:14px; color:#374151; margin:28px 0 0;">
                  Regards,<br />
                  <strong>Skill Qualifier Team</strong>
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <p style="font-size:12px; color:#9ca3af; margin-top:16px;">
            © Skill Qualifier. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  });
  console.log("email sent");

};

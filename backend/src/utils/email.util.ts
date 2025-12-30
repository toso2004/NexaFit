import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

//
export const sendEmailVerification = async ({
  email, 
  token
}: {
  email: string, 
  token: string
}) => {
  try{
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
      }
    })

    const verificationURL = `${process.env.UI_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      from: "dreamkitchenstores@gmail.com",
      to: email,
      subject: "Email verification",
      html: emailVerificationHtml(verificationURL),
    })

  }catch(error){
    throw error;
  }
        
}

export const sendForgotPasswordEmail = async (
{
  email, 
  token
}: {
  email: string, 
  token: string
}) =>{
  try{
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "false",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
      }
    })

    const passwordReset = `${process.env.UI_URL}/forgot-password?token=${token}`;

    transporter.sendMail({
      from: "dreamkitchenstores@gmail.com",
      to: email,
      subject: "Reset password",
      html: passwordResetHtml(passwordReset),
    })

  }catch(error){
    throw error;
  }

}

export const emailVerificationHtml = (verificationUrl: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verify Your Email - Dream Kitchen Stores</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5; color:#333;">
  
    <table align="center" cellpadding="0" cellspacing="0" width="100%"
      style="max-width:600px; margin:40px auto; background:#ffffff;
      border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <tr>
        <td align="center" style="background-color:#c62828; padding:24px;">
          <h1 style="margin:0; font-size:24px; color:#ffffff;">
            Dream Kitchen Stores
          </h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px; text-align:center;">
          <h2 style="margin-bottom:16px; font-size:22px; color:#c62828;">
            Verify Your Email Address
          </h2>
          <p style="font-size:16px; line-height:1.6; margin-bottom:24px;">
            Thank you for signing up with Dream Kitchen Stores.
            Please confirm your email address to activate your account.
          </p>

          <a href="${verificationUrl}"
            style="background-color:#c62828; color:#ffffff; text-decoration:none;
            padding:14px 28px; border-radius:6px; font-size:16px; font-weight:bold;
            display:inline-block;">
            Verify Email
          </a>

          <p style="margin-top:24px; font-size:14px; color:#666;">
            If the button doesn’t work, copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all; font-size:13px; color:#c62828;">
            ${verificationUrl}
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="background-color:#fafafa; padding:20px; font-size:12px; color:#777;">
          <p style="margin:0;">&copy; ${new Date().getFullYear()} Dream Kitchen Stores. All rights reserved.</p>
          <p style="margin:4px 0 0 0;">
            You received this email because you created an account with us.
          </p>
        </td>
      </tr>

    </table>
  
  </body>
  </html>
  `;
};

export const passwordResetHtml= (resetUrl: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Reset Your Password - Dream Kitchen Stores</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5; color:#333;">
  
    <table align="center" cellpadding="0" cellspacing="0" width="100%"
      style="max-width:600px; margin:40px auto; background:#ffffff;
      border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.08); overflow:hidden;">
      
      <!-- Header -->
      <tr>
        <td align="center" style="background-color:#c62828; padding:24px;">
          <h1 style="margin:0; font-size:24px; color:#ffffff;">
            Dream Kitchen Stores
          </h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px; text-align:center;">
          <h2 style="margin-bottom:16px; font-size:22px; color:#c62828;">
            Reset Your Password
          </h2>
          <p style="font-size:16px; line-height:1.6; margin-bottom:24px;">
            We received a request to reset your password.
            Click the button below to choose a new one.
          </p>

          <a href="${resetUrl}"
            style="background-color:#c62828; color:#ffffff; text-decoration:none;
            padding:14px 28px; border-radius:6px; font-size:16px; font-weight:bold;
            display:inline-block;">
            Reset Password
          </a>

          <p style="margin-top:24px; font-size:14px; color:#666;">
            If you did not request a password reset, you can safely ignore this email.
          </p>

          <p style="margin-top:16px; font-size:14px; color:#666;">
            Or copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all; font-size:13px; color:#c62828;">
            ${resetUrl}
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="background-color:#fafafa; padding:20px; font-size:12px; color:#777;">
          <p style="margin:0;">&copy; ${new Date().getFullYear()} Dream Kitchen Stores. All rights reserved.</p>
          <p style="margin:4px 0 0 0;">
            This link will expire for security reasons.
          </p>
        </td>
      </tr>

    </table>
  
  </body>
  </html>
  `;
};



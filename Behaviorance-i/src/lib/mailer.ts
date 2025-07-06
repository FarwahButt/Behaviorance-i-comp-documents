import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // TEMP for debugging
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Mail server connection error:', error);
  } else {
    console.log('Server is ready to send email:', success);
  }
});

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}
 
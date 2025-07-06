// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const { email, otp } = await req.json();

//   if (!email || !otp) {
//     return NextResponse.json({ success: false, error: 'Missing data' }, { status: 400 });
//   }

//   console.log(`📧 OTP to ${email}: ${otp}`); // For dev: simulate sending email
//   return NextResponse.json({ success: true });
// }

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ success: false, error: 'Missing email or OTP' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Behaviourance" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code for Signup',
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Welcome to Behaviourance</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 2px; color: #2b6cb0;">${otp}</h1>
          <p>Use this OTP to complete your signup.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}

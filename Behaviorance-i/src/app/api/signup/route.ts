import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { name, email, password, otp } = await req.json();

  if (!name || !email || !password || !otp) {
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }

  try {
    const pool = await getConnection();

    const exists = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE Email = @email');

    if (exists.recordset.length > 0) {
      return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
    }

    await pool
      .request()
      .input('name', name)
      .input('email', email)
      .input('password', password)
      .input('otp', otp)
      .input('terms', true)
      .query(`
        INSERT INTO Users (Name, Email, Password, OTP, Terms_Agreed)
        VALUES (@name, @email, @password, @otp, @terms)
      `);

    return NextResponse.json({ success: true, message: 'User registered' });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

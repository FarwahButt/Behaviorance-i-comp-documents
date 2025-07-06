import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('email', email)
      .input('password', password)
      .query(`SELECT * FROM Users WHERE Email = @email AND Password = @password`);

    const user = result.recordset[0];

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.Terms_Agreed) {
      return NextResponse.json({ success: false, error: 'Terms not accepted. Please sign up properly.' }, { status: 403 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

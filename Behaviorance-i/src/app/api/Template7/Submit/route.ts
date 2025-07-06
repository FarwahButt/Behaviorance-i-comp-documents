// app/api/Template7/Submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function POST(req: NextRequest) {
  const { userId, answers } = await req.json();

  if (!userId || !Array.isArray(answers) || answers.length !== 13) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const conn = await getConnection();
    const request = conn.request().input('User_id', mssql.Int, userId);

    for (let i = 0; i < 13; i++) {
      request.input(`ans${i + 1}`, mssql.NVarChar, answers[i]);
    }

    await request.query(`
      INSERT INTO Domain7_Answer (
        User_id, ans1, ans2, ans3, ans4, ans5,
        ans6, ans7, ans8, ans9, ans10, ans11, ans12, ans13
      )
      VALUES (
        @User_id, @ans1, @ans2, @ans3, @ans4, @ans5,
        @ans6, @ans7, @ans8, @ans9, @ans10, @ans11, @ans12, @ans13
      )
    `);

    await conn.request()
  .input('User_id', mssql.Int, userId)
  .input('Template_number', mssql.Int, 7) // ← replace with dynamic number
  .query(`
    INSERT INTO User_Template_Status (User_id, Template_number, Domain_name)
    SELECT @User_id, @Template_number, Domain_Name
    FROM SurveyDomains
    WHERE Domain_id = @Template_number
  `);


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DB Insert Error:", err);
    return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
  }
}

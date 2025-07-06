// import { NextRequest, NextResponse } from 'next/server';
// import { getConnection } from '@/lib/db';
// import * as mssql from 'mssql';

// export async function POST(req: NextRequest) {
//   const { userId, answers } = await req.json();

//   if (!userId || !Array.isArray(answers) || answers.length !== 15) {
//     return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//   }

//   try {
//     const conn = await getConnection();
//     const request = conn.request().input('User_id', mssql.Int, userId);

//     for (let i = 0; i < 15; i++) {
//       request.input(`ans${i + 1}`, mssql.NVarChar, answers[i]);
//     }

//     await request.query(`
//       INSERT INTO Domain3_Answer (
//         User_id, ans1, ans2, ans3, ans4, ans5,
//         ans6, ans7, ans8, ans9, ans10,
//         ans11, ans12, ans13, ans14, ans15
//       )
//       VALUES (
//         @User_id, @ans1, @ans2, @ans3, @ans4, @ans5,
//         @ans6, @ans7, @ans8, @ans9, @ans10,
//         @ans11, @ans12, @ans13, @ans14, @ans15
//       )
//     `);
//    await conn.request()
//   .input('User_id', mssql.Int, userId)
//   .input('Template_number', mssql.Int, 3) // ← replace with dynamic number
//   .query(`
//     INSERT INTO User_Template_Status (User_id, Template_number, Domain_name)
//     SELECT @User_id, @Template_number, Domain_Name
//     FROM SurveyDomains
//     WHERE Domain_id = @Template_number
//   `);


//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Insert Error:", err);
//     return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, answers } = body;

  if (!userId || typeof answers !== 'object') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const conn = await getConnection();
    const request = conn.request().input('User_id', mssql.Int, userId);

    // Bind answers dynamically
    for (let i = 1; i <= 15; i++) {
      request.input(`ans${i}`, mssql.Text, answers[`ans${i}`]);
      request.input(`ans${i}_score`, mssql.Int, answers[`ans${i}_score`]);
    }

    // Insert into Domain3_Answer table
    await request.query(`
      INSERT INTO Domain3_Answer (
        User_id,
        ans1, ans1_score,
        ans2, ans2_score,
        ans3, ans3_score,
        ans4, ans4_score,
        ans5, ans5_score,
        ans6, ans6_score,
        ans7, ans7_score,
        ans8, ans8_score,
        ans9, ans9_score,
        ans10, ans10_score,
        ans11, ans11_score,
        ans12, ans12_score,
        ans13, ans13_score,
        ans14, ans14_score,
        ans15, ans15_score
      )
      VALUES (
        @User_id,
        @ans1, @ans1_score,
        @ans2, @ans2_score,
        @ans3, @ans3_score,
        @ans4, @ans4_score,
        @ans5, @ans5_score,
        @ans6, @ans6_score,
        @ans7, @ans7_score,
        @ans8, @ans8_score,
        @ans9, @ans9_score,
        @ans10, @ans10_score,
        @ans11, @ans11_score,
        @ans12, @ans12_score,
        @ans13, @ans13_score,
        @ans14, @ans14_score,
        @ans15, @ans15_score
      )
    `);

    // Optional: update User_Template_Status
    await conn.request()
      .input('User_id', mssql.Int, userId)
      .input('Template_number', mssql.Int, 3) // Template 3
      .query(`
        INSERT INTO User_Template_Status (User_id, Template_number, Domain_name)
        SELECT @User_id, @Template_number, Domain_Name
        FROM SurveyDomains
        WHERE Domain_id = @Template_number
      `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Insert error:", err);
    return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
  }
}

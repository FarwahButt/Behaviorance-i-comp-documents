// // app/api/Template2/Submit/route.ts
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
//       INSERT INTO Domain2_Answer (
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

//  await conn.request()
//   .input('User_id', mssql.Int, userId)
//   .input('Template_number', mssql.Int, 2) // ← replace with dynamic number
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
// } firsr code


// // app/api/Template2/Submit/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getConnection } from '@/lib/db';
// import * as mssql from 'mssql';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { userId, answers } = body;

//     // Basic validation
//     if (!userId || typeof answers !== 'object') {
//       return NextResponse.json({ error: 'Invalid input: userId or answers missing' }, { status: 400 });
//     }

//     // Check if all expected keys exist in answers (ans1..ans15 and ans1_score..ans15_score)
//     for (let i = 1; i <= 15; i++) {
//       if (
//         !answers.hasOwnProperty(`ans${i}`) ||
//         !answers.hasOwnProperty(`ans${i}_score`)
//       ) {
//         return NextResponse.json({ error: `Missing answer or score for question ${i}` }, { status: 400 });
//       }
//     }

//     const conn = await getConnection();
//     const request = conn.request().input('User_id', mssql.Int, userId);

//     // Bind answers & scores dynamically
//     for (let i = 1; i <= 15; i++) {
//       request.input(`ans${i}`, mssql.NVarChar, answers[`ans${i}`]);
//       request.input(`ans${i}_score`, mssql.Int, answers[`ans${i}_score`]);
//     }

//     // Insert into Domain2_Answer (make sure table & columns exist)
//     await request.query(`
//       INSERT INTO Domain2_Answer (
//         User_id,
//         ans1, ans1_score,
//         ans2, ans2_score,
//         ans3, ans3_score,
//         ans4, ans4_score,
//         ans5, ans5_score,
//         ans6, ans6_score,
//         ans7, ans7_score,
//         ans8, ans8_score,
//         ans9, ans9_score,
//         ans10, ans10_score,
//         ans11, ans11_score,
//         ans12, ans12_score,
//         ans13, ans13_score,
//         ans14, ans14_score,
//         ans15, ans15_score
//       )
//       VALUES (
//         @User_id,
//         @ans1, @ans1_score,
//         @ans2, @ans2_score,
//         @ans3, @ans3_score,
//         @ans4, @ans4_score,
//         @ans5, @ans5_score,
//         @ans6, @ans6_score,
//         @ans7, @ans7_score,
//         @ans8, @ans8_score,
//         @ans9, @ans9_score,
//         @ans10, @ans10_score,
//         @ans11, @ans11_score,
//         @ans12, @ans12_score,
//         @ans13, @ans13_score,
//         @ans14, @ans14_score,
//         @ans15, @ans15_score
//       )
//     `);

//     // Record submission in User_Template_Status table
//     await conn.request()
//       .input('User_id', mssql.Int, userId)
//       .input('Template_number', mssql.Int, 2) // Domain 2
//       .query(`
//         INSERT INTO User_Template_Status (User_id, Template_number, Domain_name)
//         SELECT @User_id, @Template_number, Domain_Name
//         FROM SurveyDomains
//         WHERE Domain_id = @Template_number
//       `);

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error('Submit API error:', err, err.stack);
//     return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
//   }
// }




// app/api/Template2/Submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, answers } = body;

  // Basic validation
  if (!userId || typeof answers !== 'object') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    const conn = await getConnection();
    const request = conn.request().input('User_id', mssql.Int, userId);

    // Add all 15 answers (text and score)
    for (let i = 1; i <= 15; i++) {
      request.input(`ans${i}`, mssql.Text, answers[`ans${i}`]);
      request.input(`ans${i}_score`, mssql.Int, answers[`ans${i}_score`]);
    }

    // Insert into Domain2_Answer
    await request.query(`
      INSERT INTO Domain2_Answer (
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

    // Record in User_Template_Status (optional)
    await conn.request()
      .input('User_id', mssql.Int, userId)
      .input('Template_number', mssql.Int, 2)
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

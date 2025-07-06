// import { NextResponse } from 'next/server'; 
// import { getConnection } from '@/lib/db'; 
// import sql from 'mssql'; 
 
// export async function POST(req: Request) { 
//   try { 
//     const body = await req.json(); 
//     const { User_id } = body; 
 
//     if (!User_id || typeof User_id !== 'number') { 
//       return NextResponse.json({ success: false, error: 'Valid User_id is required' }, { status: 400 }); 
//     } 
 
//     // Fill missing answers with empty strings 
//     for (let i = 1; i <= 20; i++) { 
//       if (!body[`ans${i}`]) { 
//         body[`ans${i}`] = ''; 
//       } 
//     } 
 
//     const pool = await getConnection(); 
//     const request = pool.request().input('User_id', sql.Int, User_id); 
 
//     // Dynamically add inputs 
//     for (let i = 1; i <= 20; i++) { 
//       request.input(`ans${i}`, sql.NVarChar, body[`ans${i}`]); 
//     } 
 
//     // Dynamically build insert query 
//     const columns = Array.from({ length: 20 }, (_, i) => `ans${i + 1}`).join(', '); 
//     const values = Array.from({ length: 20 }, (_, i) => `@ans${i + 1}`).join(', '); 
 
//     await request.query(` 
//       INSERT INTO Userknow_Answer (User_id, ${columns}) 
//       VALUES (@User_id, ${values}) 
//     `); 
 
//     return NextResponse.json({ success: true, message: 'Answers saved successfully' }); 
 
//   } catch (error) { 
//     console.error('❌ Error saving answers:', error); 
//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 }); 
//   } 
// } 

 
// import { NextResponse } from 'next/server'; 
// import { getConnection } from '@/lib/db'; 
// import sql from 'mssql'; 
 
// export async function POST(req: Request) { 
//   try { 
//     const body = await req.json(); 
 
//     const { 
//       User_id, 
//       ans1, ans2, ans3, ans4, ans5, 
//       ans6, ans7, ans8, ans9, ans10, 
//       ans11, ans12, ans13, ans14, ans15, 
//       ans16, ans17, ans18, ans19, ans20 
//     } = body; 
 
//     if (!User_id) { 
//       return NextResponse.json({ success: false, error: 'User_id is required' }, { status: 400 }); 
//     } 
 
//     const pool = await getConnection(); 
 
//     await pool.request() 
//       .input('User_id', sql.Int, User_id) 
//       .input('ans1', sql.Text, ans1) 
//       .input('ans2', sql.Text, ans2) 
//       .input('ans3', sql.Text, ans3) 
//       .input('ans4', sql.Text, ans4) 
//       .input('ans5', sql.Text, ans5) 
//       .input('ans6', sql.Text, ans6) 
//       .input('ans7', sql.Text, ans7) 
//       .input('ans8', sql.Text, ans8) 
//       .input('ans9', sql.Text, ans9) 
//       .input('ans10', sql.Text, ans10) 
//       .input('ans11', sql.Text, ans11) 
//       .input('ans12', sql.Text, ans12) 
//       .input('ans13', sql.Text, ans13) 
//       .input('ans14', sql.Text, ans14) 
//       .input('ans15', sql.Text, ans15) 
//       .input('ans16', sql.Text, ans16) 
//       .input('ans17', sql.Text, ans17) 
//       .input('ans18', sql.Text, ans18) 
//       .input('ans19', sql.Text, ans19) 
//       .input('ans20', sql.Text, ans20) 
//       .query(` 
//         INSERT INTO Userknow_Answer ( 
//           User_id, ans1, ans2, ans3, ans4, ans5, 
//           ans6, ans7, ans8, ans9, ans10, 
//           ans11, ans12, ans13, ans14, ans15, 
//           ans16, ans17, ans18, ans19, ans20 
//         ) VALUES ( 
//           @User_id, @ans1, @ans2, @ans3, @ans4, @ans5, 
//           @ans6, @ans7, @ans8, @ans9, @ans10, 
//           @ans11, @ans12, @ans13, @ans14, @ans15, 
//           @ans16, @ans17, @ans18, @ans19, @ans20 
//         ) 
//       `); 
 
//     return NextResponse.json({ success: true, message: 'Answers saved successfully' }); 
//   } catch (error) { 
//     console.error('❌ Error saving answers:', error); 
//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 }); 
//   } 
// } hafsa

// import { NextResponse } from 'next/server'; 

// import { getConnection } from '@/lib/db'; 

// import sql from 'mssql'; 

 

// export async function POST(req: Request) { 

//   try { 

//     const body = await req.json(); 

//     const { 

//       User_id, 

//       ans1, ans2, ans3, ans4, ans5, 

//       ans6, ans7, ans8, ans9, ans10, 

//       ans11, ans12, ans13, ans14, ans15, 

//       ans16, ans17, ans18, ans19, ans20 

//     } = body; 

 

//     if (!User_id) { 

//       return NextResponse.json({ success: false, error: 'User_id is required' }, { status: 400 }); 

//     } 

 

//     const answersArray = [ 

//       ans1, ans2, ans3, ans4, ans5, 

//       ans6, ans7, ans8, ans9, ans10, 

//       ans11, ans12, ans13, ans14, ans15, 

//       ans16, ans17, ans18, ans19, ans20 

//     ]; 

 

//     if (answersArray.some((a) => !a)) { 

//       return NextResponse.json({ success: false, error: 'All 20 answers must be provided' }, { status: 400 }); 

//     } 

 

//     const pool = await getConnection(); 

 

//     await pool.request() 

//       .input('User_id', sql.Int, User_id) 

//       .input('ans1', sql.NVarChar(sql.MAX), ans1) 

//       .input('ans2', sql.NVarChar(sql.MAX), ans2) 

//       .input('ans3', sql.NVarChar(sql.MAX), ans3) 

//       .input('ans4', sql.NVarChar(sql.MAX), ans4) 

//       .input('ans5', sql.NVarChar(sql.MAX), ans5) 

//       .input('ans6', sql.NVarChar(sql.MAX), ans6) 

//       .input('ans7', sql.NVarChar(sql.MAX), ans7) 

//       .input('ans8', sql.NVarChar(sql.MAX), ans8) 

//       .input('ans9', sql.NVarChar(sql.MAX), ans9) 

//       .input('ans10', sql.NVarChar(sql.MAX), ans10) 

//       .input('ans11', sql.NVarChar(sql.MAX), ans11) 

//       .input('ans12', sql.NVarChar(sql.MAX), ans12) 

//       .input('ans13', sql.NVarChar(sql.MAX), ans13) 

//       .input('ans14', sql.NVarChar(sql.MAX), ans14) 

//       .input('ans15', sql.NVarChar(sql.MAX), ans15) 

//       .input('ans16', sql.NVarChar(sql.MAX), ans16) 

//       .input('ans17', sql.NVarChar(sql.MAX), ans17) 

//       .input('ans18', sql.NVarChar(sql.MAX), ans18) 

//       .input('ans19', sql.NVarChar(sql.MAX), ans19) 

//       .input('ans20', sql.NVarChar(sql.MAX), ans20) 

//       .query(` 

//         INSERT INTO Userknow_Answer ( 

//           User_id, ans1, ans2, ans3, ans4, ans5, 

//           ans6, ans7, ans8, ans9, ans10, 

//           ans11, ans12, ans13, ans14, ans15, 

//           ans16, ans17, ans18, ans19, ans20 

//         ) VALUES ( 

//           @User_id, @ans1, @ans2, @ans3, @ans4, @ans5, 

//           @ans6, @ans7, @ans8, @ans9, @ans10, 

//           @ans11, @ans12, @ans13, @ans14, @ans15, 

//           @ans16, @ans17, @ans18, @ans19, @ans20 

//         ) 

//       `); 

 

//     return NextResponse.json({ success: true, message: 'Answers saved successfully' }); 

//   } catch (error) { 

//     console.error('❌ Error saving answers:', error); 

//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 }); 

//   } 

// } 
// // app/api/submit-answers/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getConnection } from '@/lib/db';
// import * as mssql from 'mssql';

// export async function POST(req: NextRequest) {
//   const { userId, answers } = await req.json();

//   if (!userId || !answers || Object.keys(answers).length !== 20) {
//     return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
//   }

//   try {
//     const conn = await getConnection();

//     const request = conn.request().input('User_id', mssql.Int, userId);

//     // Insert all 20 answers as individual inputs
//     for (let i = 1; i <= 20; i++) {
//       request.input(`ans${i}`, mssql.NVarChar, answers[i]);
//     }

//     await request.query(`
//       INSERT INTO Userknow_Answer (
//         User_id, ans1, ans2, ans3, ans4, ans5,
//         ans6, ans7, ans8, ans9, ans10,
//         ans11, ans12, ans13, ans14, ans15,
//         ans16, ans17, ans18, ans19, ans20
//       )
//       VALUES (
//         @User_id, @ans1, @ans2, @ans3, @ans4, @ans5,
//         @ans6, @ans7, @ans8, @ans9, @ans10,
//         @ans11, @ans12, @ans13, @ans14, @ans15,
//         @ans16, @ans17, @ans18, @ans19, @ans20
//       )
//     `);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("DB Insert Error:", err);
//     return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'myuser',
  password: 'MySecurePass123',
  server: 'localhost',
  database: 'fyp',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function POST(req: Request) {
  let pool;
  try {
    const body = await req.json();
    const { userId, answers } = body;

    if (!userId || !answers) {
      return NextResponse.json({ error: 'Missing userId or answers' }, { status: 400 });
    }

    const answerOptions: string[] = [];
    const answerScores: number[] = [];

    for (let i = 1; i <= 20; i++) {
      if (!answers[i]) {
        return NextResponse.json({ error: `Missing answer for question ${i}` }, { status: 400 });
      }
      answerOptions.push(answers[i].selectedOption);
      answerScores.push(answers[i].score);
    }

    pool = await sql.connect(config);
    const requestQuery = pool.request();

    requestQuery.input('userId', sql.Int, userId);
    for (let i = 1; i <= 20; i++) {
      requestQuery.input(`ans${i}`, sql.NVarChar(sql.MAX), answerOptions[i - 1]);
      requestQuery.input(`ans${i}_score`, sql.Int, answerScores[i - 1]);
    }

    const query = `
      INSERT INTO Userknow_Answer (
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
        ans15, ans15_score,
        ans16, ans16_score,
        ans17, ans17_score,
        ans18, ans18_score,
        ans19, ans19_score,
        ans20, ans20_score
      ) VALUES (
        @userId,
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
        @ans15, @ans15_score,
        @ans16, @ans16_score,
        @ans17, @ans17_score,
        @ans18, @ans18_score,
        @ans19, @ans19_score,
        @ans20, @ans20_score
      )
    `;

    await requestQuery.query(query);

    await pool.close();

    return NextResponse.json({ message: 'Answers and scores saved successfully' });
  } catch (error: any) {
    if (pool) await pool.close();
    console.error('Insert error:', error);
    return NextResponse.json(
      { error: 'Database insert failed', details: error.message || error },
      { status: 500 }
    );
  }
}

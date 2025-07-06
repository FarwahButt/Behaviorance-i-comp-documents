// import { NextResponse } from 'next/server';

// export async function GET() {
//   const questions = [
//     {
//       question: 'I always write down my passwords to help me remember them.',
//       options: [
//         'Yes, I write them down.',
//         'No, I use a password manager or memory.',
//         'Sometimes, for complex passwords.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Creating strong passwords is not usually worth the effort.',
//       options: [
//         'Yes, I prefer simple passwords.',
//         'No, strong passwords are important.',
//         'Sometimes, if a website requires it.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you use passphrases instead of simple passwords?',
//       options: [
//         'Yes, I use long passphrases.',
//         'No, I prefer short passwords.',
//         'Sometimes, if a system allows it.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you use different passwords for different accounts and devices?',
//       options: [
//         'Yes, I use a unique password for each account.',
//         'No, I reuse passwords across accounts.',
//         'Sometimes, but not for all accounts.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Once I create a password, I tend to never change it.',
//       options: [
//         'Yes, I keep using the same one.',
//         'No, I change it regularly.',
//         'Sometimes, if I suspect a breach.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I do not change my passwords unless I have to.',
//       options: [
//         'Yes, I only change them when necessary.',
//         'No, I change them regularly.',
//         'Sometimes, if I suspect a security issue.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I do not include special characters in my password if it’s not required.',
//       options: [
//         'Yes, I avoid special characters.',
//         'No, I always include special characters.',
//         'Sometimes, if I want extra security.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you use multi-factor authentication (MFA) for your accounts?',
//       options: [
//         'Yes, I always use MFA.',
//         'No, I only use passwords.',
//         'Sometimes, for important accounts.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you store your passwords in a secure location?',
//       options: [
//         'Yes, I use a password manager.',
//         'No, I write them down or save them in notes.',
//         'Sometimes, for complex passwords.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you regularly review and update your passwords?',
//       options: [
//         'Yes, I review and update them frequently.',
//         'No, I keep them the same for years.',
//         'Sometimes, if I remember.',
//         'I don’t know.',
//       ],
//     },
//   ];

//   return NextResponse.json(questions);
// }


import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('domainId', mssql.Int, 5) // 🔄 domain 5
      .query(`
        SELECT 
          q.Question_id,
          q.Question_Text,
          o.Option_Text
        FROM Questions q
        JOIN Factors f ON q.Factor_id = f.Factor_id
        JOIN Options o ON o.Question_id = q.Question_id
        WHERE f.Domain_id = @domainId
        ORDER BY q.Question_id, o.Option_id
      `);

    const questionsMap: Record<number, { question: string; options: string[] }> = {};

    result.recordset.forEach(row => {
      if (!questionsMap[row.Question_id]) {
        questionsMap[row.Question_id] = {
          question: row.Question_Text,
          options: [],
        };
      }
      questionsMap[row.Question_id].options.push(row.Option_Text);
    });

    const questions = Object.values(questionsMap);

    return NextResponse.json(questions);
  } catch (error) {
    console.error('DB fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

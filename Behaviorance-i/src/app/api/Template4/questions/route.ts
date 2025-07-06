// import { NextResponse } from 'next/server';

// export async function GET() {
//   const questions = [
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
//       question: 'Have you ever changed a password because it was too weak?',
//       options: [
//         'Yes, I have changed weak passwords.',
//         'No, I keep them as they are.',
//         'Sometimes, if a website forces me.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you update your passwords regularly, even if there is no sign of compromise?',
//       options: [
//         'Yes, I change them periodically.',
//         'No, I only change them if necessary.',
//         'Sometimes, when I remember.',
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
//       question: 'Do you select hard-to-guess passwords (with multiple character types, without dictionary words, etc.)?',
//       options: [
//         'Yes, I always use strong passwords.',
//         'No, I use simple passwords.',
//         'Sometimes, if the website requires it.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you create passwords that are at least 12 characters long?',
//       options: [
//         'Yes, I always do.',
//         'No, I prefer shorter passwords.',
//         'Sometimes, depending on the site.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you avoid using common words and phrases in your passwords?',
//       options: [
//         'Yes, I never use common words.',
//         'No, I use easy-to-remember words.',
//         'Sometimes, if I add extra characters.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you create passwords that include numbers and symbols?',
//       options: [
//         'Yes, I always do.',
//         'No, I use only letters.',
//         'Sometimes, if required.',
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
//       question: 'Have you ever reused a password for multiple accounts?',
//       options: [
//         'Yes, I reuse passwords frequently.',
//         'No, I always use unique passwords.',
//         'Sometimes, but only for unimportant accounts.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you use password generators to create strong passwords?',
//       options: [
//         'Yes, I use password generators.',
//         'No, I create passwords myself.',
//         'Sometimes, when required.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Have you ever used a password manager to generate passwords?',
//       options: [
//         'Yes, I use a password manager.',
//         'No, I create passwords manually.',
//         'Sometimes, for complex passwords.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you test your passwords for strength using online tools?',
//       options: [
//         'Yes, I check my password strength.',
//         'No, I assume they are strong.',
//         'Sometimes, if I create a new one.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you check if your passwords have been compromised in data breaches?',
//       options: [
//         'Yes, I check using online tools.',
//         'No, I don’t check for breaches.',
//         'Sometimes, if I hear about a breach.',
//         'I don’t know.',
//       ],
//     },
//   ];

//   return NextResponse.json(questions);
// }


// app/api/Template4/questions/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db'; // aapka DB connection function
import * as mssql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('domainId', mssql.Int, 4) // domain 4 ke questions ke liye
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

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
//       question: 'Do you store your passwords in a secure location?',
//       options: [
//         'Yes, I use a password manager.',
//         'No, I write them down or save them in notes.',
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
//       question: 'Once I create a password, I tend to never change it.',
//       options: [
//         'Yes, I keep using the same one.',
//         'No, I change it regularly.',
//         'Sometimes, if I suspect a breach.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'When I hear about websites that have been hacked, I wait to change my passwords until I have been personally notified.',
//       options: [
//         'Yes, I only change my password if I receive a notification.',
//         'No, I change my password as soon as I hear about a breach.',
//         'Sometimes, if I think my account is at risk.',
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
//       question: 'Do you regularly review and update your passwords?',
//       options: [
//         'Yes, I review and update them frequently.',
//         'No, I keep them the same for years.',
//         'Sometimes, if I remember.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Rather than logging out of websites, I usually just navigate elsewhere or close the window when I’m done.',
//       options: [
//         'Yes, I don’t log out.',
//         'No, I always log out properly.',
//         'Sometimes, when using shared devices.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you select different passwords for different accounts and devices?',
//       options: [
//         'Yes, I use a unique password for each account.',
//         'No, I reuse passwords across accounts.',
//         'Sometimes, but not for all accounts.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'If I comply with information security policies, the chance of information security breaches occurring will be reduced.',
//       options: [
//         'Yes, it significantly reduces the risk.',
//         'No, it doesn’t make much difference.',
//         'Sometimes, but it depends on the situation.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Careful compliance with information security policies helps to avoid security problems.',
//       options: [
//         'Yes, following policies is effective.',
//         'No, security problems happen regardless.',
//         'Sometimes, but not always.',
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
//       question: 'Do you use passphrases instead of simple passwords?',
//       options: [
//         'Yes, I use long passphrases.',
//         'No, I prefer short passwords.',
//         'Sometimes, if a system allows it.',
//         'I don’t know.',
//       ],
//     },
//   ];

//   return NextResponse.json(questions);
// }



// app/api/Template3/questions/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db'; // your DB connection utility
import * as mssql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('domainId', mssql.Int, 3) // domain 3 (Template 3)
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

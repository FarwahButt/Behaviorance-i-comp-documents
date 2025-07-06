// // src/app/api/Template1/questions/route.ts
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const questions = [
//     {
//       question: 'I frequently click links in email messages to see what they are, regardless of who sent the message.',
//       options: [
//         'Yes, I click without checking.',
//         'No, I always verify first.',
//         'Sometimes, if it looks trustworthy.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'When someone sends me a link, I open it without first verifying where it goes.',
//       options: [
//         'Yes, I open links without checking.',
//         'No, I always verify links before clicking.',
//         'Sometimes, if it looks trustworthy.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I know what website I’m visiting based on its look and feel, rather than by looking at the URL bar.',
//       options: [
//         'Yes, I rely on the website’s appearance.',
//         'No, I always check the URL.',
//         'Sometimes, if the website looks familiar.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you verify links (e.g., in the URL bar or by mouseover) to ensure that you are accessing the intended websites?',
//       options: [
//         'Yes, I always check links before clicking.',
//         'No, I click without checking.',
//         'Sometimes, if I’m unsure about the source.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I usually do not pay attention to where I’m downloading software from.',
//       options: [
//         'Yes, I download from anywhere.',
//         'No, I only download from trusted sources.',
//         'Sometimes, but I check reviews.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you check the extensions (e.g., .exe, .pdf) of files you download?',
//       options: [
//         'Yes, I always check before downloading.',
//         'No, I download without checking.',
//         'Sometimes, if I suspect something unusual.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you turn on download notifications in your browsers?',
//       options: [
//         'Yes, I have them enabled.',
//         'No, I keep them disabled.',
//         'Sometimes, depending on the browser.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I tend to ignore computer security stories in the news because they don’t impact me.',
//       options: [
//         'Yes, I don’t follow security news.',
//         'No, I keep myself updated.',
//         'Sometimes, if it’s important.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you verify that the person you are communicating with online is really the person you intend to communicate with?',
//       options: [
//         'Yes, always.',
//         'No, I assume they are the right person.',
//         'Sometimes, if I have doubts.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Frequently checking the access control settings on social networking websites isn’t worth the time it takes.',
//       options: [
//         'Yes, I don’t check them.',
//         'No, I regularly check them.',
//         'Sometimes, when I update my profile.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Changing the privacy settings on social media sites is inconvenient.',
//       options: [
//         'Yes, it’s time-consuming.',
//         'No, it’s important and necessary.',
//         'Sometimes, but I still do it.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'It is inconvenient to check the security of an email with attachments.',
//       options: [
//         'Yes, it’s inconvenient.',
//         'No, it’s necessary and easy.',
//         'Sometimes, depending on the email.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you report account breaches or losses to the appropriate people?',
//       options: [
//         'Yes, I report immediately.',
//         'No, I don’t report them.',
//         'Sometimes, if I think it’s serious.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Having my computer infected by a virus as a result of opening a suspicious email attachment is a serious problem for me.',
//       options: [
//         'Yes, it’s a major concern.',
//         'No, I don’t worry about it.',
//         'Sometimes, depending on the situation.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I submit information to websites without first verifying that it will be sent securely (e.g., SSL, “https://”, a lock icon).',
//       options: [
//         'Yes, I don’t check security before submitting.',
//         'No, I always check for secure connections.',
//         'Sometimes, if the website seems trustworthy.',
//         'I don’t know.',
//       ],
//     },
//   ];

//   return NextResponse.json(questions);
// }



// app/api/Template1/questions/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db'; // your DB connection
import * as mssql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('domainId', mssql.Int, 1) // domain 1
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

// import { NextResponse } from 'next/server';

// export async function GET() {
//   const questions = [
//     {
//       question: 'When I discover a computer security problem at work, I’m likely to promptly report it to my employer.',
//       options: [
//         'Yes, I always report it.',
//         'No, I assume someone else will fix it.',
//         'Sometimes, if I think it’s serious.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I frequently visit websites even when my web browser warns me against it.',
//       options: [
//         'Yes, I ignore warnings.',
//         'No, I avoid such websites.',
//         'Sometimes, if I need to.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'When my computer wants me to reboot after applying an update or installing software, I put it off.',
//       options: [
//         'Yes, I delay it as much as possible.',
//         'No, I reboot immediately.',
//         'Sometimes, if I’m in the middle of work.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'My colleagues at work update their computers regularly.',
//       options: [
//         'Yes, they update regularly.',
//         'No, they rarely update.',
//         'Sometimes, depending on the situation.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I frequently let others use my computing devices (e.g., smartphone, tablet, laptop).',
//       options: [
//         'Yes, I allow anyone to use them.',
//         'No, I keep them private.',
//         'Sometimes, with trusted people.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you lock your computer when you are away from it?',
//       options: [
//         'Yes, I always lock it.',
//         'No, I leave it unlocked.',
//         'Sometimes, if I remember.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'I believe other employees in my organization back up their computers regularly.',
//       options: [
//         'Yes, they back up regularly.',
//         'No, they don’t back up frequently.',
//         'Sometimes, but not always.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you back up the data on your devices?',
//       options: [
//         'Yes, I back up regularly.',
//         'No, I don’t back up my data.',
//         'Sometimes, when I think about it.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Do you avoid storing data that you do not need?',
//       options: [
//         'Yes, I regularly clean up unnecessary data.',
//         'No, I store all data regardless of need.',
//         'Sometimes, if I remember to do so.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'Loss of data resulting from hacking is a serious problem for me.',
//       options: [
//         'Yes, it’s a big issue.',
//         'No, it’s not a concern.',
//         'Sometimes, depending on the type of data.',
//         'I don’t know.',
//       ],
//     },
//     {
//       question: 'At work, having my confidential information accessed by someone without my consent or knowledge is a serious problem for me.',
//       options: [
//         'Yes, it’s a major concern.',
//         'No, it doesn’t bother me.',
//         'Sometimes, but not always.',
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
//       question: 'I circumvent my employer’s computer usage policies when they prevent me from completing a task.',
//       options: [
//         'Yes, I bypass restrictions.',
//         'No, I always follow policies.',
//         'Sometimes, if necessary for work.',
//         'I don’t know.',
//       ],
//     },
//   ];

//   return NextResponse.json(questions);
// }




// app/api/Template2/questions/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db'; // aapka DB connection function
import * as mssql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('domainId', mssql.Int, 2) // domain 2 ke questions ke liye
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


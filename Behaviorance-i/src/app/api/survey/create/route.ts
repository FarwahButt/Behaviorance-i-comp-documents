// // app/api/survey/create/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getConnection } from '@/lib/db';
// import { v4 as uuidv4 } from 'uuid';
// import * as mssql from 'mssql';

// export async function POST(req: NextRequest) {
//   const { title, description, questions } = await req.json();

//   if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
//     return NextResponse.json({ error: 'Invalid input. Title and questions are required.' }, { status: 400 });
//   }

//   let conn: mssql.ConnectionPool;
//   let transaction: mssql.Transaction | undefined;

//   try {
//     conn = await getConnection();
//     transaction = new mssql.Transaction(conn);
//     await transaction.begin();

//     const surveyId = uuidv4();

//     await transaction
//       .request()
//       .input('id', mssql.UniqueIdentifier, surveyId)
//       .input('title', mssql.NVarChar, title)
//       .input('description', mssql.NVarChar, description || null)
//       .query(`INSERT INTO Surveys (id, title, description) VALUES (@id, @title, @description)`);

//     for (const q of questions) {
//       const questionId = uuidv4();
//       await transaction
//         .request()
//         .input('id', mssql.UniqueIdentifier, questionId)
//         .input('surveyId', mssql.UniqueIdentifier, surveyId)
//         .input('text', mssql.NVarChar, q.text)
//         .input('type', mssql.NVarChar, q.type)
//         .input('options', mssql.NVarChar, q.options ? q.options.join(',') : null)
//         .query(`INSERT INTO Questions (id, surveyId, text, type, options) VALUES (@id, @surveyId, @text, @type, @options)`);
//     }

//     await transaction.commit();
//     return NextResponse.json({ surveyId }, { status: 200 });
//   } catch (err) {
//     if (transaction) await transaction.rollback();
//     console.error('Error creating survey:', err);
//     return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
//   }
// }

// app/api/survey/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function POST(req: NextRequest) {
  const { title, description, questions, userId, startDate, endDate } = await req.json();

  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: 'Survey title and at least one question are required.' }, { status: 400 });
  }

  let conn: mssql.ConnectionPool;
  let transaction: mssql.Transaction  | null = null;

  try {
    conn = await getConnection();
    transaction = new mssql.Transaction(conn);
    await transaction.begin();

    // 1. Insert into CustomSurveys
    const surveyResult = await transaction
      .request()
      .input('Survey_name', mssql.NVarChar, title)
      .input('Survey_description', mssql.NVarChar, description || null)
      .input('Start_date', mssql.DateTime, startDate || new Date())
      .input('User_id', mssql.Int, userId || null)
      .query(`
        INSERT INTO CustomSurveys (Survey_name, Survey_description, Start_date, User_id)
        OUTPUT INSERTED.Custom_survey_id
        VALUES (@Survey_name, @Survey_description, @Start_date, @User_id)
      `);

    const customSurveyId = surveyResult.recordset[0].Custom_survey_id;

    // 2. Insert questions and options
    for (const q of questions) {
      const questionResult = await transaction
        .request()
        .input('Question_Text', mssql.NVarChar, q.text)
        .input('Response_Type', mssql.NVarChar, q.type)
        .input('Factor_id', mssql.Int, q.factorId || null) // Optional: depends if you're using factors
        .query(`
          INSERT INTO Questions (Question_Text, Response_Type, Factor_id)
          OUTPUT INSERTED.Question_id
          VALUES (@Question_Text, @Response_Type, @Factor_id)
        `);

      const questionId = questionResult.recordset[0].Question_id;

    
if (Array.isArray(q.options)) {
  for (let i = 0; i < q.options.length; i++) {
    const optText = q.options[i];
    await transaction
      .request()
      .input('question_id', mssql.Int, questionId)
      .input('option_text', mssql.NVarChar, optText)
      .input('option_value', mssql.Int, i) // auto: 0,1,2,3...
      .query(`
        INSERT INTO options (question_id, option_text, option_value)
        VALUES (@question_id, @option_text, @option_value)
      `);
  }
}


      // 2c. Link to CustomSurvey_Questions
      await transaction
        .request()
        .input('Custom_survey_id', mssql.Int, customSurveyId)
        .input('Question_id', mssql.Int, questionId)
        .query(`
          INSERT INTO CustomSurvey_Questions (Custom_survey_id, Question_id)
          VALUES (@Custom_survey_id, @Question_id)
        `);
    }

    await transaction.commit();
    return NextResponse.json({ success: true, surveyId: customSurveyId });
  } catch (err) {
    console.error('Error creating survey:', err);
    if (transaction !== null) {
        await transaction.rollback();
    }
    return NextResponse.json({ error: 'Failed to create survey' }, { status: 500 });
  }
}

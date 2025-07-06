// import { NextRequest, NextResponse } from 'next/server';
// import { getConnection } from '@/lib/db';
// import * as mssql from 'mssql';

// export async function GET(req: NextRequest) {
//   const userId = Number(req.nextUrl.searchParams.get('userId'));

//   if (!userId) {
//     return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
//   }

//   try {
//     const conn = await getConnection();
//     const result = await conn
//       .request()
//       .input('User_id', mssql.Int, userId)
//       .query(`
//         SELECT DISTINCT Template_number
//         FROM User_Template_Status
//         WHERE User_id = @User_id
//       `);

//     return NextResponse.json(result.recordset);
//   } catch (error) {
//     console.error('Error fetching completed templates:', error);
//     return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import * as mssql from 'mssql';

export async function GET(req: NextRequest) {
  const userId = Number(req.nextUrl.searchParams.get('userId'));

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const conn = await getConnection();
    const result = await conn
      .request()
      .input('User_id', mssql.Int, userId)
      .query(`
        SELECT 
          uts.Template_number,
          sd.Domain_name,
          uts.Completed_At
        FROM User_Template_Status uts
        JOIN SurveyDomains sd ON uts.Template_number = sd.Domain_id
        WHERE uts.User_id = @User_id
        ORDER BY uts.Template_number
      `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error fetching completed templates:', error);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}

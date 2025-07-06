// import { NextResponse } from 'next/server';

// export async function GET() {
//   const questions = [
    
     
    
//   {
//     Id: 1,
//     Question: "What is phishing?",
//     Option_a: "A type of fish",
//     Option_b: "A cybersecurity threat",
//     Option_c: "A programming language",
//     Option_d: "None of the above"
//   },
//   {
//     Id: 2,
//     Question: "Which one is a strong password?",
//     Option_a: "password123",
//     Option_b: "123456",
//     Option_c: "MyDog123",
//     Option_d: "K!8z$9Lp@1"
//   },
//   {
//     Id: 3,
//     Question: "What does a firewall do?",
//     Option_a: "Cools down the computer",
//     Option_b: "Prevents unauthorized access",
//     Option_c: "Speeds up the internet",
//     Option_d: "Blocks pop-up ads"
//   },
//   {
//     Id: 4,
//     Question: "Which of the following is a type of malware?",
//     Option_a: "HTTP",
//     Option_b: "Trojan Horse",
//     Option_c: "HTML",
//     Option_d: "ISP"
//   },
//   {
//     Id: 5,
//     Question: "What is two-factor authentication?",
//     Option_a: "Logging in with two devices",
//     Option_b: "Using two passwords",
//     Option_c: "An extra step for verifying identity",
//     Option_d: "Sharing passwords with a friend"
//   },
//   {
//     Id: 6,
//     Question: "Which is a safe browsing practice?",
//     Option_a: "Clicking all pop-ups",
//     Option_b: "Sharing passwords via email",
//     Option_c: "Using HTTPS websites",
//     Option_d: "Disabling antivirus"
//   },
//   {
//     Id: 7,
//     Question: "Which device can be affected by malware?",
//     Option_a: "Only desktop computers",
//     Option_b: "Only mobile phones",
//     Option_c: "Only tablets",
//     Option_d: "Any digital device"
//   },
//   {
//     Id: 8,
//     Question: "What is ransomware?",
//     Option_a: "Free antivirus software",
//     Option_b: "A type of phishing email",
//     Option_c: "Malware that demands payment",
//     Option_d: "A type of firewall"
//   },
//   {
//     Id: 9,
//     Question: "Which file extension is suspicious in emails?",
//     Option_a: ".pdf",
//     Option_b: ".exe",
//     Option_c: ".docx",
//     Option_d: ".jpg"
//   },
//   {
//     Id: 10,
//     Question: "What should you do if you receive a suspicious email?",
//     Option_a: "Open it quickly",
//     Option_b: "Reply with your information",
//     Option_c: "Click all the links",
//     Option_d: "Report and delete it"
//   },
//   {
//     Id: 11,
//     Question: "What is a VPN used for?",
//     Option_a: "Enhancing display resolution",
//     Option_b: "Speeding up downloads",
//     Option_c: "Hiding your online activity",
//     Option_d: "Connecting to printers"
//   },
//   {
//     Id: 12,
//     Question: "What is social engineering?",
//     Option_a: "Building social apps",
//     Option_b: "Manipulating people to give up confidential info",
//     Option_c: "Coding in social media",
//     Option_d: "A virus"
//   },
//   {
//     Id: 13,
//     Question: "Which action protects your data the most?",
//     Option_a: "Sharing passwords with friends",
//     Option_b: "Using one password for all accounts",
//     Option_c: "Using a password manager",
//     Option_d: "Writing passwords on a sticky note"
//   },
//   {
//     Id: 14,
//     Question: "What does HTTPS indicate?",
//     Option_a: "The site loads faster",
//     Option_b: "It has better graphics",
//     Option_c: "It is secured with encryption",
//     Option_d: "It is a mobile-friendly site"
//   },
//   {
//     Id: 15,
//     Question: "What does antivirus software do?",
//     Option_a: "Makes your device waterproof",
//     Option_b: "Fixes hardware problems",
//     Option_c: "Detects and removes malware",
//     Option_d: "Improves screen quality"
//   },
//   {
//     Id: 16,
//     Question: "Which one is a secure action?",
//     Option_a: "Leaving your screen unlocked",
//     Option_b: "Using public Wi-Fi without protection",
//     Option_c: "Logging out from public computers",
//     Option_d: "Saving passwords in browsers"
//   },
//   {
//     Id: 17,
//     Question: "What is the purpose of software updates?",
//     Option_a: "To slow down your computer",
//     Option_b: "To add viruses",
//     Option_c: "To fix bugs and improve security",
//     Option_d: "To remove data"
//   },
//   {
//     Id: 18,
//     Question: "What is identity theft?",
//     Option_a: "Using a fake ID at a party",
//     Option_b: "Stealing someone’s online identity",
//     Option_c: "Hacking into printers",
//     Option_d: "Changing your email address"
//   },
//   {
//     Id: 19,
//     Question: "Why should you back up your data?",
//     Option_a: "To free up storage",
//     Option_b: "To sell it later",
//     Option_c: "To prevent data loss",
//     Option_d: "To copy viruses"
//   },
//   {
//     Id: 20,
//     Question: "What does 'Do not share OTP' mean?",
//     Option_a: "You should share it",
//     Option_b: "Only send it to strangers",
//     Option_c: "Keep it confidential for security",
//     Option_d: "Ignore the message"
//   }
// ]

    
  

//   return NextResponse.json(questions);
// }

// import { NextResponse } from 'next/server';
// import sql from 'mssql';

// // SQL Server config
// const config = {
//   user: 'myuser',
//   password: 'MySecurePass123',
//   server: 'localhost', // e.g. 'localhost' or IP
//   database: 'fyp',
//   options: {
//     encrypt: false, // agar Azure use karte ho to true karna
//     trustServerCertificate: true, // dev environment ke liye
//   },
// };

// export async function GET() {
//   try {
//     // Connect to DB
//     await sql.connect(config);

//     // Query all questions
//     const result = await sql.query('SELECT * FROM Userknow_questions');

//     // Return data as JSON
//     return NextResponse.json(result.recordset);

//   } catch (error) {
//     console.error('DB error:', error);
//     return NextResponse.json({ error: 'Database connection or query failed.' }, { status: 500 });
//   }
// }
// import { NextResponse } from 'next/server';
// import sql from 'mssql';

// // SQL Server config
// const config = {
//   user: 'myuser',
//   password: 'MySecurePass123',
//   server: 'localhost', // e.g. 'localhost' or IP
//   database: 'fyp',
//   options: {
//     encrypt: false, // for Azure, set true
//     trustServerCertificate: true, // dev environment
//   },
// };

// export async function GET() {
//   try {
//     // Connect to DB
//     await sql.connect(config);

//     // Query all questions with option scores included
//     const result = await sql.query(`
//       SELECT
//         Id,
//         Question,
//         Option_a,
//         Option_b,
//         Option_c,
//         Option_d,
//         Option_A_Score,
//         Option_B_Score,
//         Option_C_Score,
//         Option_D_Score,
//         Correct_option,
//         Difficulty_level
//       FROM Userknow_questions
//       ORDER BY Id
//     `);

//     // Return data as JSON
//     return NextResponse.json(result.recordset);

//   } catch (error) {
//     console.error('DB error:', error);
//     return NextResponse.json({ error: 'Database connection or query failed.' }, { status: 500 });
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

export async function GET() {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT 
        Id, Question, Option_a, Option_b, Option_c, Option_d,
        Option_A_Score, Option_B_Score, Option_C_Score, Option_D_Score,
        Difficulty_level 
      FROM Userknow_questions
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('DB error in /api/questions:', error);
    return NextResponse.json(
      { error: 'Database connection or query failed.' },
      { status: 500 }
    );
  }
}

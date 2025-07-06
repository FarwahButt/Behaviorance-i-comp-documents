import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'Remembering multiple strong passwords is difficult for me.',
      options: [
        'Yes, it is hard to remember them.',
        'No, I manage them well.',
        'Sometimes, if they are too complex.',
        'I don’t know.',
      ],
    },
    {
      question: 'Using unique passwords for every account is too difficult.',
      options: [
        'Yes, I reuse passwords to keep it simple.',
        'No, I create unique passwords.',
        'Sometimes, for important accounts.',
        'I don’t know.',
      ],
    },
    {
      question: 'Using two-factor authentication (2FA) is a hassle for me.',
      options: [
        'Yes, it takes too much effort.',
        'No, I find it useful and necessary.',
        'Sometimes, depending on the situation.',
        'I don’t know.',
      ],
    },
    {
      question: 'Keeping software updated is inconvenient because it disrupts my work.',
      options: [
        'Yes, it interrupts my tasks.',
        'No, it’s essential for security.',
        'Sometimes, but I update anyway.',
        'I don’t know.',
      ],
    },
    {
      question: 'Setting up and using a VPN is too complicated.',
      options: [
        'Yes, it is confusing.',
        'No, it is straightforward and important.',
        'Sometimes, depending on the service.',
        'I don’t know.',
      ],
    },
    {
      question: 'Regularly reviewing my security settings takes too much time.',
      options: [
        'Yes, I don’t have time for it.',
        'No, I make time because it’s necessary.',
        'Sometimes, if I hear about a security threat.',
        'I don’t know.',
      ],
    },
    {
      question: 'Avoiding public Wi-Fi for security reasons is impractical for me.',
      options: [
        'Yes, I need to use public Wi-Fi.',
        'No, I take precautions or avoid it.',
        'Sometimes, depending on my location.',
        'I don’t know.',
      ],
    },
    {
      question: 'Reading and understanding security policies is too complicated.',
      options: [
        'Yes, they are too technical.',
        'No, I make an effort to understand them.',
        'Sometimes, if they are written clearly.',
        'I don’t know.',
      ],
    },
    {
      question: 'Logging out of accounts every time I finish using them is inconvenient.',
      options: [
        'Yes, I don’t like logging out.',
        'No, it’s necessary for security.',
        'Sometimes, depending on the device I use.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}


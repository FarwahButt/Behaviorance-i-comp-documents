import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'Do you report phishing emails to your email provider or organization?',
      options: [
        'Yes, I report them immediately.',
        'No, I just delete them.',
        'Sometimes, if they seem dangerous.',
        'I don’t know.',
      ],
    },
    {
      question: 'My coworkers report security incidents to IT or the relevant department.',
      options: [
        'Yes, they always report incidents.',
        'No, they ignore them.',
        'Sometimes, if it seems serious.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use two-factor authentication (2FA) to protect your accounts?',
      options: [
        'Yes, I use 2FA for all important accounts.',
        'No, I don’t use 2FA.',
        'Sometimes, if required.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you regularly update your software and applications to fix security vulnerabilities?',
      options: [
        'Yes, I update them as soon as updates are available.',
        'No, I don’t update them.',
        'Sometimes, when I remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'My colleagues take security training seriously and apply it in their work.',
      options: [
        'Yes, they take it seriously.',
        'No, they ignore it.',
        'Sometimes, depending on the situation.',
        'I don’t know.',
      ],
    },
    {
      question: 'My colleagues lock their computers when stepping away from their desks.',
      options: [
        'Yes, they always lock them.',
        'No, they leave them open.',
        'Sometimes, if they remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'Most employees in my workplace avoid clicking on suspicious links in emails.',
      options: [
        'Yes, they are careful.',
        'No, they sometimes fall for scams.',
        'Some are cautious, others are not.',
        'I don’t know.',
      ],
    },
    {
      question: 'Other employees in my workplace use strong passwords for their accounts.',
      options: [
        'Yes, they use strong passwords.',
        'No, they use weak passwords.',
        'Some do, while others don’t.',
        'I don’t know.',
      ],
    },
    {
      question: 'My colleagues avoid using public Wi-Fi for work-related activities.',
      options: [
        'Yes, they avoid it.',
        'No, they use it without precautions.',
        'Some do, some don’t.',
        'I don’t know.',
      ],
    },
    {
      question: 'My coworkers regularly check for software updates on their devices.',
      options: [
        'Yes, they always update.',
        'No, they don’t update often.',
        'Sometimes, if prompted.',
        'I don’t know.',
      ],
    },
    {
      question: 'My colleagues lock their computers when stepping away from their desks.',
      options: [
        'Yes, they always lock them.',
        'No, they leave them open.',
        'Sometimes, if they remember.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}


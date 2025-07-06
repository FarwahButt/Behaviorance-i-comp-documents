import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'Do you avoid storing data that you do not need?',
      options: [
        'Yes, I regularly clean up unnecessary data.',
        'No, I store all data regardless of need.',
        'Sometimes, if I remember to do so.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you back up the data on your devices?',
      options: [
        'Yes, I back up regularly.',
        'No, I don’t back up my data.',
        'Sometimes, when I think about it.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you lock your computer when you are away from it?',
      options: [
        'Yes, I always lock it.',
        'No, I leave it unlocked.',
        'Sometimes, if I remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you select the strictest security settings (e.g., app permissions or browser options) that are practical?',
      options: [
        'Yes, I use the strictest settings possible.',
        'No, I use default settings.',
        'Sometimes, depending on the situation.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you select hard-to-guess passwords (with multiple character types, without dictionary words, etc.)?',
      options: [
        'Yes, I always use strong passwords.',
        'No, I use simple passwords.',
        'Sometimes, if the website requires it.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you select different passwords for different accounts and devices?',
      options: [
        'Yes, I use a unique password for each account.',
        'No, I reuse passwords across accounts.',
        'Sometimes, but not for all accounts.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you encrypt sensitive files before storing or sharing them?',
      options: [
        'Yes, I always encrypt them.',
        'No, I don’t encrypt files.',
        'Sometimes, if the data is highly confidential.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use secure cloud storage services for sensitive data?',
      options: [
        'Yes, I use encrypted cloud storage.',
        'No, I use any available storage.',
        'Sometimes, depending on the sensitivity of data.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you review app permissions before granting access to personal data?',
      options: [
        'Yes, I always review them.',
        'No, I allow all permissions.',
        'Sometimes, for important apps.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use multi-factor authentication for securing important accounts?',
      options: [
        'Yes, I enable it on all accounts.',
        'No, I don’t use MFA.',
        'Sometimes, for financial or work accounts.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you avoid sharing sensitive data over unsecured channels (e.g., email, public chat)?',
      options: [
        'Yes, I always use secure methods.',
        'No, I share data without concern.',
        'Sometimes, depending on urgency.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}

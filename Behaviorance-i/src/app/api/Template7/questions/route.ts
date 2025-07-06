import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'I am careful to never share confidential documents stored on my home or work computers.',
      options: [
        'Yes, I never share them.',
        'No, I share them if needed.',
        'Sometimes, with trusted people.',
        'I don’t know.',
      ],
    },
    {
      question: 'I believe other employees in my organization back up their computers regularly.',
      options: [
        'Yes, they back up regularly.',
        'No, they don’t back up frequently.',
        'Sometimes, but not always.',
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
      question: 'Do you verify the integrity of backed-up data?',
      options: [
        'Yes, I check my backups regularly.',
        'No, I assume they are fine.',
        'Sometimes, when I remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you enable automatic backup settings on your devices?',
      options: [
        'Yes, I use automatic backups.',
        'No, I manually back up data.',
        'Sometimes, when I remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'Loss of data resulting from hacking is a serious problem for me.',
      options: [
        'Yes, it’s a big issue.',
        'No, it’s not a concern.',
        'Sometimes, depending on the type of data.',
        'I don’t know.',
      ],
    },
    {
      question: 'At work, having my confidential information accessed by someone without my consent or knowledge is a serious problem for me.',
      options: [
        'Yes, it’s a major concern.',
        'No, it doesn’t bother me.',
        'Sometimes, but not always.',
        'I don’t know.',
      ],
    },
    {
      question: 'Backing up a computer regularly is inconvenient.',
      options: [
        'Yes, it takes too much time.',
        'No, I find it easy and necessary.',
        'Sometimes, depending on my workload.',
        'I don’t know.',
      ],
    },
    {
      question: 'My organization distributes security newsletters or articles regarding data protection.',
      options: [
        'Yes, regularly.',
        'No, never.',
        'Sometimes, but not frequently.',
        'I don’t know.',
      ],
    },
    {
      question: 'My organization’s IT helpdesk sends out alert messages/emails concerning security.',
      options: [
        'Yes, regularly.',
        'No, never.',
        'Sometimes, depending on security issues.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use cloud storage for backing up important files?',
      options: [
        'Yes, I use cloud storage.',
        'No, I only store locally.',
        'Sometimes, for critical files.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you store multiple copies of important data in different locations?',
      options: [
        'Yes, I keep multiple copies.',
        'No, I store data in only one place.',
        'Sometimes, if the data is critical.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use an external hard drive or USB for offline backups?',
      options: [
        'Yes, I use offline backups.',
        'No, I only store online.',
        'Sometimes, for important files.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}


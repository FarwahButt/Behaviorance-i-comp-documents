import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'Do you encrypt sensitive files before storing them in the cloud?',
      options: [
        'Yes, I always encrypt them.',
        'No, I upload them as they are.',
        'Sometimes, if the data is highly sensitive.',
        'I don’t know.',
      ],
    },
    {
      question: 'When my computer wants me to reboot after applying an update or installing software, I put it off.',
      options: [
        'Yes, I delay it as much as possible.',
        'No, I reboot immediately.',
        'Sometimes, if I’m in the middle of work.',
        'I don’t know.',
      ],
    },
    {
      question: 'I avoid updating software because I worry it might cause issues.',
      options: [
        'Yes, I avoid updates.',
        'No, I always update.',
        'Sometimes, if the update has known issues.',
        'I don’t know.',
      ],
    },
    {
      question: 'Have you ever delayed installing an important security update?',
      options: [
        'Yes, I often delay updates.',
        'No, I install them immediately.',
        'Sometimes, if I’m busy.',
        'I don’t know.',
      ],
    },
    {
      question: 'My colleagues at work update their computers regularly.',
      options: [
        'Yes, they update regularly.',
        'No, they rarely update.',
        'Sometimes, depending on the situation.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you verify the source of software updates before installing them?',
      options: [
        'Yes, I always check the source.',
        'No, I install updates without verification.',
        'Sometimes, if I have concerns.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you check update logs or patch notes before installing updates?',
      options: [
        'Yes, I always review them.',
        'No, I install updates without checking.',
        'Sometimes, if it’s a major update.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you enable automatic updates on your computer and mobile devices?',
      options: [
        'Yes, I always enable updates.',
        'No, I disable them.',
        'Sometimes, if the update seems important.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you update security tools (e.g., antivirus, firewalls) regularly?',
      options: [
        'Yes, I update them frequently.',
        'No, I don’t update them.',
        'Sometimes, when I remember.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you manually check for software updates instead of waiting for automatic updates?',
      options: [
        'Yes, I regularly check for updates.',
        'No, I only install automatic updates.',
        'Sometimes, if I suspect an outdated version.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you restart your system after installing security updates?',
      options: [
        'Yes, I restart immediately.',
        'No, I avoid restarting.',
        'Sometimes, if it’s required.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you update third-party applications (e.g., browsers, media players) along with your operating system?',
      options: [
        'Yes, I update everything regularly.',
        'No, I only update my operating system.',
        'Sometimes, if an app prompts me.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you use unsupported or outdated software on your computer?',
      options: [
        'Yes, I use outdated software.',
        'No, I always update my software.',
        'Sometimes, if I have no other option.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you install beta or early-access software updates?',
      options: [
        'Yes, I like testing new features.',
        'No, I only install stable updates.',
        'Sometimes, if I trust the developer.',
        'I don’t know.',
      ],
    },
    {
      question: 'Have you ever faced issues due to skipping software updates?',
      options: [
        'Yes, I have faced security issues.',
        'No, I never had problems.',
        'Sometimes, but nothing serious.',
        'I don’t know.',
      ],
    },
    {
      question: 'Do you regularly update firmware for your devices (e.g., routers, smart devices)?',
      options: [
        'Yes, I keep firmware updated.',
        'No, I never update firmware.',
        'Sometimes, if there is a major security risk.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}


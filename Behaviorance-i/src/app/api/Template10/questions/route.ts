import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question:
        'Having my computer infected by a virus as a result of opening a suspicious email attachment is a serious problem for me.',
      options: [
        'Yes, it would cause major issues.',
        'No, I can manage it.',
        'Sometimes, depending on the virus.',
        'I don’t know.',
      ],
    },
    {
      question:
        'If my personal data were stolen, it would negatively impact my financial or personal security.',
      options: [
        'Yes, it would be a big issue.',
        'No, it wouldn’t affect me.',
        'Sometimes, depending on the data stolen.',
        'I don’t know.',
      ],
    },
    {
      question:
        'At work, having my confidential information accessed by someone without my consent or knowledge is a serious problem for me.',
      options: [
        'Yes, it would be a major concern.',
        'No, it’s not a big issue.',
        'Sometimes, depending on the type of information.',
        'I don’t know.',
      ],
    },
    {
      question:
        'Having my work device compromised would impact my ability to perform my job.',
      options: [
        'Yes, it would be a big issue.',
        'No, I could still work.',
        'Sometimes, depending on the level of compromise.',
        'I don’t know.',
      ],
    },
    {
      question: 'Loss of data resulting from hacking is a serious problem for me.',
      options: [
        'Yes, it’s a major concern.',
        'No, I can recover easily.',
        'Sometimes, depending on the data lost.',
        'I don’t know.',
      ],
    },
    {
      question:
        'If my login credentials were stolen, it would cause a significant disruption in my work or personal life.',
      options: [
        'Yes, it would be a big issue.',
        'No, it wouldn’t affect me.',
        'Sometimes, depending on the data stolen.',
        'I don’t know.',
      ],
    },
    {
      question:
        'I believe a security breach in my organization can lead to major financial losses.',
      options: [
        'Yes, it’s a serious risk.',
        'No, it won’t cause much harm.',
        'Sometimes, depending on the nature of the breach.',
        'I don’t know.',
      ],
    },
    {
      question:
        'A cyberattack on my company could impact job security and overall business operations.',
      options: [
        'Yes, it would be a major threat.',
        'No, it wouldn’t have much impact.',
        'Sometimes, depending on the severity of the attack.',
        'I don’t know.',
      ],
    },
    {
      question:
        'I believe that falling for a phishing attack could expose sensitive company or personal information.',
      options: [
        'Yes, it would be a major concern.',
        'No, phishing isn’t a big risk.',
        'Sometimes, depending on the nature of the attack.',
        'I don’t know.',
      ],
    },
    {
      question: 'I consider ransomware attacks to be a major security threat.',
      options: [
        'Yes, ransomware is a serious issue.',
        'No, it’s not a big problem.',
        'Sometimes, depending on the target.',
        'I don’t know.',
      ],
    },
    {
      question:
        'If my company suffered a data breach, I would be worried about my personal information being exposed.',
      options: [
        'Yes, it’s a major concern.',
        'No, it wouldn’t affect me.',
        'Sometimes, if my data is involved.',
        'I don’t know.',
      ],
    },
    {
      question: 'A malware infection on my computer would cause serious disruption.',
      options: [
        'Yes, it would create major problems.',
        'No, I could recover easily.',
        'Sometimes, depending on the infection.',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}

import { NextResponse } from 'next/server';

export async function GET() {
  const questions = [
    {
      question: 'What are the key indicators of a high-quality secondary study in cybersecurity behavioral research?',
      options: [
        'Use of systematic review guidelines',
        'Inclusion of diverse primary sources',
        'Transparent methodology reporting',
        'I don’t know.',
      ],
    },
    {
      question: 'What methodologies are most associated with high-quality secondary studies?',
      options: [
        'Meta-analysis techniques',
        'Qualitative thematic analysis',
        'Structured systematic reviews',
        'I don’t know.',
      ],
    },
    {
      question: 'What are the overall quality trends in published secondary studies in cybersecurity behavioral research?',
      options: [
        'Improving over time',
        'Declining over time',
        'No significant change',
        'I don’t know.',
      ],
    },
    {
      question: 'How has the quality of published secondary studies in cybersecurity behavioral research changed over time?',
      options: [
        'Improved with better methodologies',
        'Declined due to low-quality studies',
        'Remained the same',
        'I don’t know.',
      ],
    },
    {
      question: 'What quality trends are observed concerning the researched themes in cybersecurity behavioral research?',
      options: [
        'Higher quality in journals',
        'Higher quality in conferences',
        'No difference in quality',
        'I don’t know.',
      ],
    },
    {
      question: 'How does the quality of secondary studies differ between conferences and journals in cybersecurity behavioral research?',
      options: [
        'Stronger research on user awareness',
        'Improved studies on password security',
        'More structured phishing-related studies',
        'I don’t know.',
      ],
    },
    {
      question: 'How do funding sources impact the quality of secondary studies in cybersecurity behavioral research?',
      options: [
        'Can introduce bias',
        'Helps improve research depth',
        'Has no significant effect',
        'I don’t know.',
      ],
    },
    {
      question: 'How do peer-review processes influence the quality of secondary studies?',
      options: [
        'Ensures credibility',
        'Slows down publication speed',
        'Does not always prevent errors',
        'I don’t know.',
      ],
    },
    {
      question: 'What are the most common flaws found in low-quality secondary studies?',
      options: [
        'Lack of methodological rigor',
        'Limited sample size in included studies',
        'Failure to control for bias',
        'I don’t know.',
      ],
    },
    {
      question: 'How does the use of outdated primary studies affect the quality of secondary research?',
      options: [
        'Reduces relevance',
        'Does not impact findings',
        'Can still provide useful historical insights',
        'I don’t know.',
      ],
    },
    {
      question: 'What role do citation metrics play in assessing the quality of secondary cybersecurity research?',
      options: [
        'Higher citations indicate credibility',
        'Citation count does not reflect quality',
        'Can be misleading due to self-citation',
        'I don’t know.',
      ],
    },
    {
      question: 'How do systematic reviews compare to traditional literature reviews in quality?',
      options: [
        'More structured and reliable',
        'No significant difference',
        'Traditional reviews are more flexible',
        'I don’t know.',
      ],
    },
    {
      question: 'How do data visualization techniques impact the quality of cybersecurity secondary research?',
      options: [
        'Improve clarity of findings',
        'Do not significantly impact quality',
        'Can sometimes mislead if improperly used',
        'I don’t know.',
      ],
    },
    {
      question: 'What role does reproducibility play in assessing research quality?',
      options: [
        'Essential for validation',
        'Not always necessary',
        'Only important in experimental studies',
        'I don’t know.',
      ],
    },
  ];

  return NextResponse.json(questions);
}




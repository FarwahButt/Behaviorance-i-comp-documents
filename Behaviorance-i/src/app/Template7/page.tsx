'use client';

import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  options: string[];
}

export default function TemplatePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/Template7/questions');
        if (!res.ok) {
          throw new Error(`Failed to fetch questions: ${res.status}`);
        }

        const data: Question[] = await res.json();
        setQuestions(data);
        setAnswers(Array(data.length).fill(''));
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (index: number, selected: string) => {
    const updated = [...answers];
    updated[index] = selected;
    setAnswers(updated);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch('/api/Template7/Submit', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ answers }),
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to submit answers');
  //     }

  //     alert('Answers submitted successfully!');
  //   } catch (error) {
  //     console.error('Submit error:', error);
  //     alert('Failed to submit answers.');
  //   }
  // };
  const handleSubmit = async () => {
  const userId = Number(localStorage.getItem("userId"));
  if (!userId) {
    alert("User not logged in.");
    return;
  }

  if (answers.length !== 13 || answers.includes("")) {
    alert("Please answer all 13 questions.");
    return;
  }

  try {
    const res = await fetch('/api/Template7/Submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    });

    if (!res.ok) {
      throw new Error('Failed to submit answers');
    }

    alert('Answers submitted successfully!');
  } catch (error) {
    console.error('Submit error:', error);
    alert('Failed to submit answers.');
  }
};


  if (loading || questions.length === 0) {
    return <div className="text-center py-10">Loading questions...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
   
       Data Protection & Backup
      </h1>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6 bg-blue-950 text-white shadow-md p-4 rounded">
          <p className="mb-4 font-medium">
            {qIndex + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, optIndex) => (
              <label key={optIndex} className="block">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={opt}
                  checked={answers[qIndex] === opt}
                  onChange={() => handleChange(qIndex, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-950text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}



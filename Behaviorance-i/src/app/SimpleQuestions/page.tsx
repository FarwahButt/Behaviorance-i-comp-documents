
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navsuccess from '../components/navsuccess';
import Link from 'next/link';
interface Question {
  Id: number;
  Question: string;
  Option_a: string;
  Option_b: string;
  Option_c: string;
  Option_d: string;
  Option_A_Score: number;
  Option_B_Score: number;
  Option_C_Score: number;
  Option_D_Score: number;
  Difficulty_level: string;
}

export default function SampleQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{
    [key: number]: { selectedOption: string; score: number };
  }>({});
  const router = useRouter();

  useEffect(() => {
    fetch('/api/questions')
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
        setLoading(false);
      });
  }, []);

  const handleOptionChange = (questionId: number, selectedOption: string) => {
    const question = questions.find((q) => q.Id === questionId);
    if (!question) return;

    const scoreMap: { [key: string]: number } = {
      a: question.Option_A_Score,
      b: question.Option_B_Score,
      c: question.Option_C_Score,
      d: question.Option_D_Score,
    };

    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selectedOption, score: scoreMap[selectedOption] || 0 },
    }));
  };

  const handleSubmit = async () => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('User not logged in');
      return;
    }

    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered < 20) {
      alert(`You must answer all 20 questions (you answered ${totalAnswered}).`);
      return;
    }

    try {
      const res = await fetch('/api/submit-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers }),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Answers submitted successfully!');
        router.push('/survey2'); // 🔁 Redirect after validation
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Submission failed.');
    }
  };

  return (
    <div>
      <Navsuccess />
      <h1 className="text-2xl font-bold mb-4 mt-6 text-center">
        Unlock Your Cybersecurity Potential
      </h1>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 bg-blue-950 text-white">
          {questions.map((q, index) => (
            <div key={q.Id} className="border p-4 rounded shadow">
              <h2 className="font-semibold mb-2 mt-4">
                Q{index + 1}: {q.Question}
              </h2>
              <div className="space-y-1">
                {['a', 'b', 'c', 'd'].map((opt) => {
                  const optionKey = `Option_${opt}` as keyof Question;
                  const optionText = q[optionKey];
                  return (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={`question-${q.Id}`}
                        value={opt}
                        checked={answers[q.Id]?.selectedOption === opt}
                        onChange={() => handleOptionChange(q.Id, opt)}
                        className="mr-2"
                      />
                      {opt.toUpperCase()}. {optionText}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
<div className="flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-6 mb-4 mr-4 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Answers
            </button>
          </div>
  
        </form>
      )}
    </div>
  );
}


// 'use client';

// import React, { useEffect, useState } from 'react';

// interface Question {
//   question: string;
//   options: string[];
// }

// export default function TemplatePage() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await fetch('/api/Template3/questions');
//         if (!res.ok) {
//           throw new Error(`Failed to fetch questions: ${res.status}`);
//         }

//         const data: Question[] = await res.json();
//         setQuestions(data);
//         setAnswers(Array(data.length).fill(''));
//       } catch (err) {
//         console.error('Error fetching questions:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleChange = (index: number, selected: string) => {
//     const updated = [...answers];
//     updated[index] = selected;
//     setAnswers(updated);
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const res = await fetch('/api/Template3/Submit', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ answers }),
//   //     });

//   //     if (!res.ok) {
//   //       throw new Error('Failed to submit answers');
//   //     }

//   //     alert('Answers submitted successfully!');
//   //   } catch (error) {
//   //     console.error('Submit error:', error);
//   //     alert('Failed to submit answers.');
//   //   }
//   // };
//   const handleSubmit = async () => {
//   const userId = Number(localStorage.getItem("userId"));

//   if (!userId) {
//     alert("User not logged in.");
//     return;
//   }

//   if (answers.length !== 15 || answers.includes("")) {
//     alert("Please answer all 15 questions.");
//     return;
//   }

//   try {
//     const res = await fetch('/api/Template3/Submit', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userId, answers }),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to submit answers");
//     }

//     alert("Answers submitted successfully!");
//   } catch (error) {
//     console.error("Submit error:", error);
//     alert("Failed to submit answers.");
//   }
// };

//   if (loading || questions.length === 0) {
//     return <div className="text-center py-10">Loading questions...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//           Passwords & Authentication
//       </h1>

//       {questions.map((q, qIndex) => (
//         <div key={qIndex} className="mb-6 bg-blue-950 text-white shadow-md p-4 rounded">
//           <p className="mb-4 font-medium">
//             {qIndex + 1}. {q.question}
//           </p>
//           <div className="space-y-2">
//             {q.options.map((opt, optIndex) => (
//               <label key={optIndex} className="block">
//                 <input
//                   type="radio"
//                   name={`question-${qIndex}`}
//                   value={opt}
//                   checked={answers[qIndex] === opt}
//                   onChange={() => handleChange(qIndex, opt)}
//                   className="mr-2"
//                 />
//                 {opt}
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="text-center mt-8">
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  options: string[];
}

interface Answer {
  text: string;
  score: number;
}

export default function TemplatePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/Template3/questions');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data: Question[] = await res.json();
        setQuestions(data);
        setAnswers(Array(data.length).fill({ text: '', score: -1 }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const handleChange = (index: number, selected: string, score: number) => {
    const updated = [...answers];
    updated[index] = { text: selected, score };
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const userId = Number(localStorage.getItem('userId'));
    const domainId = 3; // update dynamically if needed

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    const incomplete = answers.some(a => a.text === '' || a.score === -1);
    if (incomplete) {
      alert('Please answer all questions.');
      return;
    }

    try {
      // Save answers
      const res = await fetch('/api/Template3/Submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          answers: answers
            .map((a, i) => ({
              [`ans${i + 1}`]: a.text,
              [`ans${i + 1}_score`]: a.score,
            }))
            .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        }),
      });

      if (!res.ok) throw new Error('Submit failed');

      // Get suggestion
      const suggestionRes = await fetch('http://localhost:8001/get-domain-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, domain_id: domainId }),
      });

      if (!suggestionRes.ok) throw new Error('Suggestion fetch failed');

      const data = await suggestionRes.json();
      setSuggestion(data.suggestion);

      // Reset answers to clear radio button selections
      setAnswers(Array(questions.length).fill({ text: '', score: -1 }));
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  if (loading) return <div>Loading questions...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Passwords & Authentication
      </h1>

      {questions.map((q, i) => (
        <div key={i} className="mb-6 bg-blue-950 text-white shadow-md p-4 rounded">
          <p className="mb-4 font-medium">
            {i + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={opt}
                  checked={answers[i]?.text === opt}
                  onChange={() => handleChange(i, opt, idx)}
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
          className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {suggestion && (
        <div
          className="mt-16 max-w-4xl mx-auto p-8 rounded-xl shadow-lg border border-blue-800 text-white"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #000000)',
          }}
        >
          <h2 className="text-4xl font-serif font-semibold mb-6 text-center underline decoration-blue-400">
            Your Suggestion
          </h2>

          <p className="text-2xl leading-relaxed">{suggestion}</p>
        </div>
      )}
    </div>
  );
}

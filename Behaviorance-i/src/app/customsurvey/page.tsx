'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type QuestionType = 'text' | 'multiple-choice';

type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
};

export default function CreateSurveyPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: uuidv4(),
        text: '',
        type: 'text',
        options: ['']
      }
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    if (updated[qIndex].options) {
      updated[qIndex].options![oIndex] = value;
    }
    setQuestions(updated);
  };

//   const addOption = (qIndex: number) => {
//     const updated = [...questions];
//     if (!updated[qIndex].options) updated[qIndex].options = [];
//     updated[qIndex].options!.push('');
//     setQuestions(updated);
//   };

  const addOption = (qIndex: number) => {
  const updated = [...questions];
  if (!updated[qIndex].options) updated[qIndex].options = [];

  if (updated[qIndex].options.length >= 4) {
    alert("You can only add up to 4 options.");
    return;
  }

  updated[qIndex].options.push('');
  setQuestions(updated);
};


  const handleSubmit = async () => {
  const userId = Number(localStorage.getItem("userId"));
  if (!userId) {
    alert("User not logged in.");
    return;
  }

  const payload = {
    title,
    description,
    questions,
    userId, // ← include this in API request
  };

    const res = await fetch('/api/survey/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Survey created! ID: ' + result.surveyId);
    } else {
      alert('Error: ' + result.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Survey</h1>

      <div className="mb-4">
        <label className="block font-semibold">Title</label>
        <input
          className="w-full border rounded px-3 py-2 mt-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2 mt-1"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Questions</h2>
      {questions.map((q, index) => (
        <div key={q.id} className="border p-4 rounded mb-4 bg-gray-50">
          <label className="block font-medium">Question Text</label>
          <input
            className="w-full border rounded px-3 py-2 mb-2"
            value={q.text}
            onChange={e => updateQuestion(index, 'text', e.target.value)}
          />

          <label className="block font-medium">Question Type</label>
          <select
            className="w-full border rounded px-3 py-2 mb-2"
            value={q.type}
            onChange={e => updateQuestion(index, 'type', e.target.value as QuestionType)}
          >
            <option value="text">Text</option>
            <option value="multiple-choice">Multiple Choice</option>
          </select>

          {q.type === 'multiple-choice' && (
            <div>
              <label className="block font-medium">Options</label>
              {q.options?.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  className="w-full border rounded px-3 py-2 mb-1"
                  value={opt}
                  onChange={e => updateOption(index, oIndex, e.target.value)}
                  placeholder={`Option ${oIndex + 1}`}
                />
              ))}
              <button
                            type="button"
                            onClick={() => addOption(index)}
                            className={`mt-1 ${
                                q.options && q.options.length >= 4
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600'
                            }`}
                            disabled={q.options && q.options.length >= 4}
                            >
                            + Add Option
                            </button>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-6"
      >
        + Add Question
      </button>

      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
}
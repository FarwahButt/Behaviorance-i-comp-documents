"use client";
import { useState } from "react";


type Topic = {
  name: string;
  definition: string;
  purpose: string;
  usage: string;
};

export default function Mainpg() {
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  
  const topics: Topic[] = [
    {
      name: "Phishing",
      definition: "A type of cyber attack where attackers deceive individuals into providing sensitive information by impersonating trustworthy entities.",
      purpose: "To trick the target into revealing personal information, such as passwords, credit card numbers, or social security numbers.",
      usage: "Commonly used through email, SMS, or fake websites that resemble legitimate services.",
    },
    {
      name: "Malware",
      definition: "Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems.",
      purpose: "To damage or gain unauthorized access to the victim's data or computer system.",
      usage: "Malware can be spread through email attachments, malicious websites, or downloadable software.",
    },
    {
      name: "Data Breaches",
      definition: "An incident where sensitive, protected, or confidential data is accessed or disclosed without authorization.",
      purpose: "To exploit sensitive information, often for identity theft, fraud, or espionage.",
      usage: "Data breaches commonly occur in organizations when hackers infiltrate systems or through insider threats.",
    },
    {
      name: "Secure Passwords",
      definition: "Strong, unique passwords that protect user accounts from unauthorized access.",
      purpose: "To prevent unauthorized access to accounts and systems, reducing the risk of identity theft or data breaches.",
      usage: "Secure passwords typically include a mix of letters, numbers, and symbols, and should not be reused across different platforms.",
    },
    {
      name: "Two-Factor Authentication",
      definition: "A security process in which the user provides two forms of identification before accessing an account.",
      purpose: "To add an extra layer of security by requiring two forms of verification (something you know and something you have).",
      usage: "Used in banking apps, email services, and social media accounts to prevent unauthorized access.",
    },
    {
      name: "Social Engineering",
      definition: "A manipulation technique that exploits human psychology to gain confidential information or access to systems.",
      purpose: "To trick individuals into disclosing personal information or providing access to restricted areas or systems.",
      usage: "Often used in phishing schemes, phone calls, or even physical attempts to gain unauthorized access.",
    },
    {
      name: "Ransomware",
      definition: "A type of malicious software that encrypts the victim's files and demands payment (ransom) for their release.",
      purpose: "To extort money from victims by holding their data hostage.",
      usage: "Ransomware attacks often occur through email attachments, malicious ads, or compromised websites.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center overflow-y-scroll">
      
      <div className="bg-gradient-to-r from-black to-blue-950  py-10 w-full"></div>

      
      <div className="bg-gradient-to-r from-black to-blue-950 text-white w-full flex items-center justify-between py-16 px-8 mb-12 ">
        <div className="text-left w-full md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">Cyber Security Awareness</h1>
          <p className="text-lg mb-6">
            Protect yourself and your organization from cyber threats. Learn about phishing, malware, secure passwords, and more to ensure your digital safety.
          </p>
          <button className="mt-4 px-8 py-3 bg-white hover:bg-yellow-600 text-black rounded-full">
            Explore Cyber Security Survey
          </button>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src="image2.jpg" alt="Cyber Security" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        </div>

      
<div className="my-12 w-11/12 max-w-4xl bg-white rounded-lg shadow-lg p-6">
  <h2 className="text-3xl font-semibold text-center mb-6">Topics to Explore</h2>
  <div className="flex flex-wrap justify-center gap-8">
    {topics.map((topic, index) => (
      <div
        key={index}
        onClick={() => setSelectedTopic(topic.name)}
        className={`cursor-pointer flex items-center justify-center w-36 h-36 rounded-full border-2 border-blue-500 text-center text-sm font-medium p-4 transition-all duration-300 ${
          selectedTopic === topic.name
            ? "bg-blue-500 text-white transform scale-110"
            : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {topic.name}
      </div>
    ))}
  </div>
</div>


<div className="w-11/12 max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-16">
  {selectedTopic ? (
    (() => {
      const topicDetails = topics.find((topic) => topic.name === selectedTopic);
      return topicDetails ? (
        <div>
          <h3 className="text-xl font-bold mb-4">{topicDetails.name}</h3>
          <p className="text-gray-600 mb-3">
            <strong>Definition: </strong>{topicDetails.definition}
          </p>
          <p className="text-gray-600 mb-3">
          <strong>Purpose: </strong>{topicDetails.purpose}
                </p>
                <p className="text-gray-600">
                  <strong>Usage: </strong>{topicDetails.usage}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Topic not found.</p>
            );
          })()
        ) : (
          <p className="text-gray-500 text-center">Select a topic to learn more.</p>
        )}
      </div>

      
      <div className="h-20"></div>
    </div>
  );
}

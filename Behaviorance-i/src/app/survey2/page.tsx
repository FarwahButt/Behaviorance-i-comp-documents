'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

interface DomainSuggestionResponse {
  user_cluster: number;
  suggested_domains: string[];
}

const allDomains = [
  "Security Awareness & Safe Practices and Verification",
  "Device Security",
  "Passwords & Authentication",
  "Password Generation",
  "Password Management",
  "Account and Data Securement",
  "Data Protection & Backup",
  "Software Updates and System Maintenance",
  "Proactive Awareness",
  "Perceived Severity (PS)",
  "Perceived Barriers (PB)",
  "Quality Trends in Cybersecurity Behavioral Research"
];

const descriptions = [
  "Awareness and verification-related behaviors",
  "Protection of devices from threats",
  "User authentication security",
  "Secure methods of creating passwords",
  "Secure handling of passwords",
  "Protection of accounts and data",
  "Backup strategies and data safety",
  "Regular software updates and maintenance",
  "Awareness of cybersecurity threats",
  "How serious users perceive threats",
  "Challenges faced in cybersecurity compliance",
  "Trends in user behavior regarding security"
];

export default function SuggestedDomainsPage() {
  const [suggestedDomains, setSuggestedDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const userId = localStorage.getItem("userId");
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      return;
    }
    console.log(userId)

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/suggest-domains/?user_id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch from backend");
        const data: DomainSuggestionResponse = await res.json();
        setSuggestedDomains(data.suggested_domains);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const remainingDomains = allDomains.filter(domain => !suggestedDomains.includes(domain));

  return (
    <div className="bg-blue-950 min-h-screen">
      <Navbar onSurveyClick={() => {}} />

      <div className="p-8">
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <h1 className="text-2xl text-white font-bold mb-6">🎯 Top 3 Suggested Domains</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedDomains.map(domain => {
                const index = allDomains.indexOf(domain);
                return (
                  <div key={domain} className="bg-white p-4 rounded shadow-md">
                    <h2 className="font-semibold text-lg mb-2">{domain}</h2>
                    <p className="text-gray-600 mb-4">{descriptions[index]}</p>
                    <Link href={`/Template${index + 1}`}>
                      <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Start Survey
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>

            <h2 className="text-xl text-white font-semibold mt-10 mb-4">📋 Other Available Domains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingDomains.map(domain => {
                const index = allDomains.indexOf(domain);
                return (
                  <div key={domain} className="bg-white p-4 rounded shadow-md">
                    <h2 className="font-semibold text-lg mb-2">{domain}</h2>
                    <p className="text-gray-600 mb-4">{descriptions[index]}</p>
                    <Link href={`/Template${index + 1}`}>
                      <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Start Survey
                      </button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

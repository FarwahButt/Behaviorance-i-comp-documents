
'use client';

import React, { useEffect, useState } from "react";
import Navsuccess from "../components/navsuccess";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [completedTemplates, setCompletedTemplates] = useState<any[]>([]);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId"));
    if (!userId) return;

    const fetchStatus = async () => {
      const res = await fetch(`/api/user/completedTemplates?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();

        // ✅ Filter unique Template_number records
        const unique = data.reduce((acc: any[], curr: any) => {
          if (!acc.find(item => item.Template_number === curr.Template_number)) {
            acc.push(curr);
          }
          return acc;
        }, []);

        setCompletedTemplates(unique);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div>
      <Navsuccess />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col relative">
          <nav>
            <ul className="space-y-2">
              <ul className="ml-5 text-gray-500">
                <div className="flex items-center hover:text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  Starred
                </div>
                <div className="hover:text-gray-700 cursor-pointer hover:bg-gray-100 pl-8 pb-4 rounded-md">
                  Shared with me
                </div>
              </ul>
            </ul>
          </nav>
          <hr className="border-t-2 border-gray-300" />
          <div className="mt-3">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-900 cursor-pointer hover:bg-gray-100 pl-6 pb-4 rounded-md"
            >
              Your Folders
            </div>
          </div>
          {isDropdownOpen && (
            <div className="top-16 left-4 bg-white shadow-lg rounded-md w-56 z-50">
              <ul className="divide-y divide-gray-200">
                <li className="p-2 hover:bg-gray-50 flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span className="material-icons text-gray-500">
                      View all Projects
                    </span>
                  </span>
                </li>
                <li className="p-2 hover:bg-gray-50 text-blue-600 flex items-center space-x-2">
                  <span>Create Subfolder</span>
                </li>
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-1 bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Completed Domains
          </h2>

          {completedTemplates.length === 0 ? (
            <p className="text-gray-500">No domains completed yet.</p>
          ) : (
            <ul className="space-y-6">
              {completedTemplates.map((item: any) => {
                const completedDate = new Date(item.Completed_At);
                const formattedDate = completedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <li
                    key={`domain-${item.Template_number}`} // ✅ unique key
                    className="bg-green-50 p-4 rounded-md shadow-sm"
                  >
                    <div className="text-2xl font-extrabold text-green-800">
                      Domain {item.Template_number} - {item.Domain_name}
                    </div>
                    <div className="text-base text-gray-600 mt-1">
                      Completed on: {formattedDate}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

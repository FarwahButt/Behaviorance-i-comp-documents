import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC<{
  onSurveyClick: () => void;
  
}> = ({ onSurveyClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSurveyClick = () => {
    setIsSidebarOpen(true);
    onSurveyClick(); // Trigger survey navigation
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Behaivorance-I</h1>
          <div className="space-x-4">
            <button
              onClick={handleSurveyClick}
              className="hover:underline bg-gray-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-auto mr-2"
            >
              Custom Survey
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg p-4 z-50">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold text-white mt-4">
              Create Your Own Survey
            </h2>
            <button
              onClick={handleCloseSidebar}
              className="text-gray-500 hover:text-gray-800 text-xl mt-4"
            >
              ✖
            </button>
          </div>
          <Link href={"/customsurvey"}>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
            Get Started
          </button>
          </Link>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleCloseSidebar}
        />
      )}
    </div>
  );
};

export default Navbar;

import React from "react";
import BackButton from "../BackButton";

const Statistics = () => {
  return (
    <div className="relative min-h-screen  text-white flex flex-col items-center justify-center">
      {/* Back Button - Positioned at Top Left */}
      <div className="absolute top-0 left-0 pl-6 lg:hidden xl:hidden ">
        <BackButton />
      </div>

      {/* Main Content */}
      <h2 className="text-3xl font-bold mb-4">📊 Statistics Component</h2>
      <p className="text-lg">
        This is some random test content to verify if the Statistics component is mounting properly.
      </p>

      {/* Test Data Box */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md w-[80%] text-center">
        <h3 className="text-2xl font-semibold text-[var(--orange)]">Test Data</h3>
        <ul className="mt-4 space-y-2">
          <li>✅ Data Point 1: 150 Users</li>
          <li>✅ Data Point 2: 78 Projects</li>
          <li>✅ Data Point 3: 23 Contributions</li>
          <li>✅ Data Point 4: 5-Star Ratings</li>
        </ul>
      </div>
    </div>
  );
};

export default Statistics;


// const calculateCompletionTime = (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   return Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Convert ms to days
// };

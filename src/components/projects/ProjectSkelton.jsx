import React from "react";

const ProjectSkeleton = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[80%] max-w-[900px] animate-pulse">
        {/* Skeleton for project title */}
        <div className="h-6 w-2/3 bg-gray-700 rounded mb-4"></div>
        
        {/* Skeleton for images */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-40 bg-gray-700 rounded"></div>
          <div className="h-40 bg-gray-700 rounded"></div>
          <div className="h-40 bg-gray-700 rounded"></div>
        </div>

        {/* Skeleton for tech stack */}
        <div className="h-4 w-1/2 bg-gray-700 rounded my-4"></div>

        {/* Skeleton for description */}
        <div className="h-16 w-full bg-gray-700 rounded mb-4"></div>

        {/* Skeleton for buttons */}
        <div className="flex gap-4">
          <div className="h-10 w-24 bg-gray-700 rounded"></div>
          <div className="h-10 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;

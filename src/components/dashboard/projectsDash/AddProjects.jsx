import React from "react";
import { useGlobalState } from "../../../context/GlobalStateContext";
import AddProjectsForm from "./AddProjectForm";
const AddProjects = () => {
  const { setActiveComponent } = useGlobalState(); // Assuming you're using global state to manage navigation

  return (
    <div className="p-6  width-[20px] bg-gray-100 rounded-lg shadow-md">
      <button
        onClick={() => setActiveComponent("addProjectForm")}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Add New Project
      </button>
    </div>
  );
};

export default AddProjects;

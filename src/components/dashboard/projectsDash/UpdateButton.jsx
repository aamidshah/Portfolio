const UpdateButton = ({ HandleClick }) => {

  
  return (
    <button
      onClick={HandleClick} // No need for an extra function wrapper
      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-2 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out flex items-center space-x-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 3l9 9-9 9M4 12H21" />
      </svg>
      <span>Edit Project</span>
    </button>
  );
};

export default UpdateButton;

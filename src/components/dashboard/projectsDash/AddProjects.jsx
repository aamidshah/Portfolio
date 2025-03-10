import { Pencil, Trash, Plus } from "lucide-react";

const AddButton = ({ HandleClick }) => {

  
  return (
    <button
      onClick={HandleClick} // No need for an extra function wrapper
    className="flex items-center gap-2 px-4 py-2  text-sm font-medium transition-all duration-200 bg-gray-200 hover:bg-gray-300  rounded-full px-2  cursor-pointer">
      Add
      <Plus size={13} />
    </button>
  );
};

export default AddButton;

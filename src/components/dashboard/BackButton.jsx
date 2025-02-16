import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useGlobalState } from "../../context/GlobalStateContext";

const BackButton = () => {
  const { setShowSidebar } = useGlobalState();

  return (
    <button
      onClick={() => setShowSidebar(true)}
      className="lg:hidden flex items-center gap-1 text-white cursor-pointer hover:!text-[var(--orange)] mt-2"
    >
      <IoArrowBack className="text-xl font-bold" /> Back
    </button>
  );
};

export default BackButton;

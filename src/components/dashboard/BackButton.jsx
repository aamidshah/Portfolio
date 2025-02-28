import React from "react";
import { IoArrowBack } from "react-icons/io5";
import useGlobalStateStore from "../../store/useProjectStore";
const BackButton = () => {
  const { setShowSidebar } = useGlobalStateStore();

  return (
    <button
      onClick={() => setShowSidebar(true)}
      className="lg:hidden flex  items-center gap-1 text-white cursor-pointer hover:!text-[var(--orange)] mt-2"
    >
      <IoArrowBack className="text-xl font-bold" /> Back
    </button>
  );
};

export default BackButton;

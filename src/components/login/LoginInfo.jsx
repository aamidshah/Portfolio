import React from "react";
import { FaUser } from "react-icons/fa";

const LoginInfo = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer p-4 rounded-md transition">
      <FaUser className="text-xl text-orange hover:!text-[var(--darkOrange)] " />
      {/* <span className="text-sm pt-2">Login</span> */}
    </div>
  );
};

export default LoginInfo;

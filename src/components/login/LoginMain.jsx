



import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import AuthScreen from "./AuthScreen";
import useAuthStore from "../../store/authStore";
import ProfileModal from "./ProfileInfo";
import useGlobalStateStore from "../../store/useProjectStore";

const LoginMain = () => {
  const { isAuthenticated, user, getUser } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {setActiveComponent} = useGlobalStateStore()
  // Fetch user data when the component mounts
  useEffect(() => {
    if (isAuthenticated && !user) {
      getUser();
    }
  }, [isAuthenticated, user, getUser]);

  return (
    <div className="absolute flex bottom-4  left-4 w-[calc(100%-32px)]">
      <AuthScreen />
      {isAuthenticated ? (
        <div className="flex items-center ">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="User"
              onClick={() => setActiveComponent("profile")}

              className="w-10 h-10  ml-4 rounded-full object-cover hover:border-amber-200 border-2 border-gray-300"
            />
            <span className="ml-4 text-sm font-bold">profile</span>
           
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-sm font-bold">Login</h1>
        </div>
      )}

      {/* {isModalOpen && <ProfileInfo  isOpen={isModalOpen}  closeModal={() => setIsModalOpen(false)} />} */}
    </div>
  );
};

export default LoginMain;


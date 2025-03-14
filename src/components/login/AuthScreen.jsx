import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Logout Icon
import useGlobalStateStore from "../../store/useProjectStore";
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const AuthScreen = () => {
  const { setActiveComponent } = useGlobalStateStore();
  const { isAuthenticated,setAuth,logout } = useAuthStore()
  
  const handleAuthForm = () => {
    setActiveComponent("authScreen"); // ✅ Set activeComponent to display AuthForm

    setAuth(false); // Ensure state updates correctly
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to log out");

      logout(); // ✅ Call Zustand's logout function
      toast.success("Logged out successfully!");
      setActiveComponent(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again!");
    }
  };

  

  return (
    <div className="flex items-center gap-4 cursor-pointer p-4 rounded-md transition">
      {isAuthenticated ? (
        <FaSignOutAlt 
        size={25}
          className="text-xl text-red-500 hover:text-red-600"
          onClick={handleLogout}
        />
      
        
      ) : (
        <FaUser
          className="text-xl text-orange hover:!text-[var(--darkOrange)]"
          onClick={handleAuthForm}
        />
      )}
    </div>
  );
};

export default AuthScreen;

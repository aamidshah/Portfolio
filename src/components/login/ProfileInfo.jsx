import { useState, useEffect, useRef } from "react";
import { FaPen } from "react-icons/fa";
import useGlobalStateStore from "../../store/useProjectStore";
import useAuthStore from "../../store/authStore";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSettings = () => {
  const { setActiveComponent } = useGlobalStateStore();
  const { getUser, updateUser, verifyPassword, logout } = useAuthStore();
  
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const inputRefs = useRef({}); // Store refs for each input field

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await getUser();
    if (response.success && response.user) {
      setUserData(response.user);
      setFormData(response.user);
    } else if (response.error) {
      handleLogout();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAll = async () => {
    if (!password) {
      toast.error("Please enter your password to confirm changes.");
      return;
    }
    setError(null);
    setMessage(null);

    const passwordCheck = await verifyPassword(password);
    if (!passwordCheck || !passwordCheck.success) {
      toast.error("Incorrect password. Please try again.");
      return;
    }

    const updateResponse = await updateUser(formData);
    if (updateResponse && updateResponse.success) {
      toast.success("Profile updated successfully!");
      setPassword("");
      fetchUserData();
    } else {
      toast.error(updateResponse?.message || "Failed to update profile.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, profilePicture: reader.result });
          toast.success("Profile picture updated successfully!");

        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        toast.error("Image compression failed. Try again.");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info("Logged out successfully.");

    setActiveComponent(null);
  };

  const handleEditClick = (key) => {
    if (inputRefs.current[key]) {
      inputRefs.current[key].focus();
      inputRefs.current[key].classList.add("border-blue-400"); // Highlight effect
      setTimeout(() => {
        inputRefs.current[key].classList.remove("border-blue-400"); // Remove highlight after a second
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-6 bg-gray-300">
      <button onClick={() => setActiveComponent(null)} className="self-start text-blue-500 mb-4 flex items-center">
        &larr; <span className="ml-2">Go Back</span>
      </button>
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

      <div className="relative w-32 h-32 mb-6">
        <img
          src={formData.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-gray-300"
        />
        <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md">
          <FaPen size={14} />
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 gap-4">
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
          <p className="text-lg  00 text-gray-500">Name</p>
          <input
            type="text"
            value={formData.username || ""}
            disabled
            className="p-2 rounded w-full cursor-not-allowed"
          />
        </div>
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">Email</p>
          <input
            type="text"
            value={formData.email || ""}
            disabled
            className="p-2 rounded w-full  cursor-not-allowed"
          />
        </div>
        {["bio", "socialLinks"].map((key) => (
          <div key={key} className="p-4 !bg-gray-200 rounded-lg flex justify-between items-center">
            <div className="w-full">
              <p className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <input
                ref={(el) => (inputRefs.current[key] = el)}
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="p-2 rounded w-[70%] focus:outline-none focus:ring-2  text-lg focus:ring-blue-400 transition-all duration-200"
              />
            </div>
            <FaPen className="text-gray-400 hover:text-blue-500 cursor-pointer" onClick={() => handleEditClick(key)} />
          </div>
        ))}
     
      </div>

      <div className="w-full max-w-3xl mt-4 p-4 !bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Enter Password to Save Changes</h3>
      <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>

      <button
        onClick={handleSaveAll}
        className="w-full max-w-3xl bg-green-500 text-white p-3 rounded-lg shadow-md mt-4 hover:bg-green-600 transition"
      >
        Update Info
      </button>

      <button onClick={handleLogout} className="mt-6 text-blue-500 hover:underline">
        Logout
      </button>
    </div>
  );
};

export default ProfileSettings;

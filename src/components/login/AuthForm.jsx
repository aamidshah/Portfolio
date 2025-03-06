import { useState,useEffect } from "react";
import useAuthStore from "../../store/authStore";
import useGlobalStateStore from "../../store/useProjectStore";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { toast } from "react-toastify";
import Modal from "./Modal";
const AuthForm = () => {
  const { setActiveComponent, setAuth } = useGlobalStateStore();
  const { login, signup } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // Stores message and type
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Message disappears after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

   
    try {
      const { username, email, password } = formData;
      let response = isSignUp 
        ? await signup(username, email, password) 
        : await login(email, password);
  
      
      if (!response || !response.success) {
        throw new Error(response.message || "Enter Valid Credentials!");
      }
      toast.success(response.message, { position: "top-right" });

      setAuth(true);
      setFormData({ username: "", email: "", password: "" }); // Reset form
      setActiveComponent("projects");

    } catch (error) {
      toast.error(error.message || "Something went wrong!", { position: "top-right" });
      setAuth(false);
      setActiveComponent("authScreen");

    }

    setLoading(false);
  };
  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/login.jpg')",
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

      {/* Auth Form */}
      <div className="relative p-6 rounded-2xl shadow-xl w-80 bg-transparent backdrop-blur-md border border-gray-300 dark:border-gray-600">
        <h2 className="text-2xl font-semibold text-white text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
    <p className="text-gray-300 text-center mb-4">
        {isSignUp ? (
          <>
            Create an account to get started.{" "}
            {showMessage && (
              <span className="text-red-500 font-semibold">
                You can only register if you are part of a project.
              </span>
            )}
          </>
        ) : (
          "Enter your credentials to continue."
        )}
      </p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-3 p-3 border rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />


{message.text && (
  <p className={`text-center mt-2 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
    {message.text}
  </p>
)}

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-2 text-gray-300 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <strong
            className="text-blue-400 font-bold cursor-pointer hover:text-blue-500"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </strong>
        </p>

        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
          onClick={() => setActiveComponent(null)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default AuthForm;


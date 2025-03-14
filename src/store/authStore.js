import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import axios from "axios";

const useAuthStore = create((set,get) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),
  setAuth: (auth) => {
    set({ isAuthenticated: auth });

    if (auth) {
      localStorage.setItem("auth", "true"); // ✅ Persist auth state
    } else {
      localStorage.removeItem("auth");
    }
  },
  

  updateUser: async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { success: false, message: "User not authenticated." };
      }

      const response = await fetch(`${BASE_URL}/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Update failed." };
      }

      const newUserData = await response.json();

      // Update store and localStorage
      set({ user: newUserData.user });
      localStorage.setItem("user", JSON.stringify(newUserData.user));

      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, message: "Something went wrong. Try again!" };
    }
  },

verifyPassword: async (password) => {  
    try {
        const token = localStorage.getItem("token"); // Retrieve the token
        if (!token) {
            return { success: false, message: "User not authenticated." };
        }

        const response = await axios.post(
            `${BASE_URL}/auth/verifyprofile`, 
            { password }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in header
                }
            }
        );

        return response.data;
    } catch (error) {
        return error.response?.data || { success: false, message: "Unauthorized" };
    }
},


  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Raw response:", response); // Log raw response

   
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        return { success: false, message: "Invalid server response." };
      }
      if (!response.ok) {
        return { success: false, message: data.message || "Login failed." };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, isAuthenticated: true });

      return { success: true, message: "Login successful!" };
    } catch (error) {
      return { success: false, message: "Something went wrong. Try again!" };
    }
  },


//   signup: async (username, email, password) => {
//     try {
//         // 1️⃣ Fetch all projects
//         const projectsResponse = await fetch(`${BASE_URL}/projects`);
//         if (!projectsResponse.ok) {
//             throw new Error("Failed to fetch project contributors.");
//         }

//         const projects = await projectsResponse.json();
//         console.log("✅ Projects Data Fetched:", projects);

//         // 2️⃣ Normalize contributors and check username
//         const isContributor = projects.some((project) =>
//           Array.isArray(project.contributors) &&
//         project.contributors.some(contributor => contributor.toLowerCase() === username.toLowerCase())
//       );
//       console.log("Project contributors:", isContributor),

//         console.log(`🔍 Contributor check for '${username}':`, isContributor);

//         if (!isContributor) {
//             return { success: false, message: "❌ You are not authorized to register!" };
//         }

//         // 3️⃣ Proceed with Registration
//         console.log("🔹 Sending registration data:", { username, email, password });

//         const response = await fetch(`${BASE_URL}/auth/register`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, email, password }),
//         });

//         let data;
//         try {
//             data = await response.json();
//         } catch (jsonError) {
//             console.error("❌ JSON Parse Error:", jsonError);
//             return { success: false, message: "Invalid server response." };
//         }

//         if (!response.ok) {
//             console.error("❌ Server Error:", data);
//             return { success: false, message: data.message || "Signup failed." };
//         }

//         return { success: true, message: "🎉 Account created successfully! Please log in." };
//     } catch (error) {
//         console.error("❌ Signup error:", error);
//         return { success: false, message: "Something went wrong. Try again!" };
//     }
// },
// signup: async (username, email, password) => {
//   try {
//       // 1️⃣ Fetch all projects to check if the user is a contributor
//       const projectsResponse = await fetch(`${BASE_URL}/projects`);
//       if (!projectsResponse.ok) {
//           throw new Error("Failed to fetch project contributors.");
//       }

//       const projects = await projectsResponse.json();
//       console.log("✅ Projects Data Fetched:", projects);

//       // 2️⃣ Check if the username exists in any project's contributors array
//       const isContributor = projects.some((project) =>
//           Array.isArray(project.contributors) &&
//           project.contributors.some(contributor => contributor.toLowerCase() === username.toLowerCase())
//       );

//       console.log(`🔍 Contributor check for '${username}':`, isContributor);

//       if (!isContributor) {
//           return { success: false, message: "❌ You are not authorized to register!" };
//       }

//       // 3️⃣ Proceed with Registration
//       console.log("🔹 Sending registration data:", { username, email, password });

//       const response = await fetch(`${BASE_URL}/auth/register`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, email, password }),
//       });

//       let data;
//       try {
//           data = await response.json();
//       } catch (jsonError) {
//           console.error("❌ JSON Parse Error:", jsonError);
//           return { success: false, message: "Invalid server response." };
//       }

//       // 4️⃣ Handle API Response
//       if (!response.ok) {
//           console.error("❌ Server Error:", data);

//           // 🔥 Explicitly check for username and email errors
//           if (data.message === "Username already taken!") {
//               return { success: false, message: "❌ Username is already taken. Try another!" };
//           }
//           if (data.message === "Email already in use!") {
//               return { success: false, message: "❌ Email is already registered!" };
//           }

//           return { success: false, message: data.message || "Signup failed. Try again later." };
//       }

//       console.log("✅ Registration successful:", data);
//       return { success: true, message: "🎉 Account created successfully! Please log in." };

//   } catch (error) {
//       console.error("❌ Signup error:", error);
//       return { success: false, message: "Something went wrong. Try again!" };
//   }
// },
signup: async (username, email, password) => {
  try {

      // 1️⃣ Fetch all projects to check if the user is a contributor
      const projectsResponse = await fetch(`${BASE_URL}/projects`);
      
      if (!projectsResponse.ok) {
          throw new Error(`Failed to fetch project contributors. Status: ${projectsResponse.status}`);
      }

      const projects = await projectsResponse.json();

      // 2️⃣ Check if the username exists in any project's contributors array
      const isContributor = projects.some((project) =>
          Array.isArray(project.contributors) &&
          project.contributors.some(contributor => contributor.toLowerCase() === username.toLowerCase())
      );


      if (!isContributor) {
          return { success: false, message: "❌ You are not authorized to register!" };
      }

      // 3️⃣ Proceed with Registration
      const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
      });

      const responseText = await response.text(); // Read response as text first

      let data;
      try {
          // data = await response.json();
          data = JSON.parse(responseText); // Try parsing JSON

          console.log("🔹 Parsed Data:", data);
      } catch (jsonError) {
          console.error("❌ JSON Parse Error:", responseText);
          return { success: false, message: "Invalid server response." };
      }

      // 4️⃣ Handle API Response
      if (!response.ok) {
          console.error("❌ Server Error:", data);

          if (data.message?.toLowerCase().includes("username already taken")) {
              return { success: false, message: "❌ Username is already taken. Try another!" };
          }
          if (data.message?.toLowerCase().includes("email already in use")) {
              return { success: false, message: "❌ Email is already registered!" };
          }

          return { success: false, message: data.message || "Signup failed. Try again later." };
      }

      console.log("✅ Registration successful:", data);
      return { success: true, message: "🎉 Account created successfully! Please log in." };

  } catch (error) {
      console.error("❌ Signup error:", error);
      return { success: false, message: "Something went wrong. Try again!" };
  }
},
getUser: async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "No authentication token found." };
    }

    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: "Failed to fetch user data." };
    }

    const userData = await response.json();
    set({ user: userData.user });

    return { success: true, user: userData.user };
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return { success: false, message: "An error occurred while fetching user data." };
  }
},


  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
    return { success: true, message: "Logged out successfully!" };
  },
}));

export default useAuthStore;


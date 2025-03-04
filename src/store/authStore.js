import { create } from "zustand";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


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


  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Raw response:", response); // Log raw response

    //   const data = await response.json().catch(() => null); // Catch JSON parsing errors
    //   console.log("Response Data:", data);
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
      console.log("🚀 Signup initiated for:", { username, email });

      // 1️⃣ Fetch all projects to check if the user is a contributor
      console.log("🔹 Fetching project contributors...");
      const projectsResponse = await fetch(`${BASE_URL}/projects`);
      
      if (!projectsResponse.ok) {
          throw new Error(`Failed to fetch project contributors. Status: ${projectsResponse.status}`);
      }

      const projects = await projectsResponse.json();
      console.log("✅ Projects Data Fetched");

      // 2️⃣ Check if the username exists in any project's contributors array
      const isContributor = projects.some((project) =>
          Array.isArray(project.contributors) &&
          project.contributors.some(contributor => contributor.toLowerCase() === username.toLowerCase())
      );

      console.log(`🔍 Contributor check for '${username}': ${isContributor}`);

      if (!isContributor) {
          return { success: false, message: "❌ You are not authorized to register!" };
      }

      // 3️⃣ Proceed with Registration
      console.log("🔹 Sending registration data...");
      const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
      });

      console.log("🔹 Full API Response:", response);
      console.log("🔹 Response Status:", response.status);
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

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
    return { success: true, message: "Logged out successfully!" };
  },
}));

export default useAuthStore;


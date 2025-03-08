import { create } from 'zustand';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const useSkillStore = create((set, get) => ({
  skills: [],
  loading: false,
  error: null,
  selectedSkill: null, // Add this state

  setSelectedSkill: (skill) => set({ selectedSkill: skill }), // <-- Function to update selected skill

  fetchSkills: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Full API Response:", response);
      console.log("Response Data:", response.data);
  
      // ✅ Ensure response data is an array
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format: expected an array but got something else");
      }
  
      set({ skills: response.data, loading: false });
  
      return response.data; // ✅ Return the fetched skills
    } catch (error) {
      console.error("Error fetching skills:", error.message, error.response?.data);
      set({ error: error.response?.data?.message || "Failed to fetch skills", loading: false });
  
      return []; // ✅ Return an empty array in case of error
    }
  },
  
  
  
  

  // Add, update, and delete functions remain the same...


  addSkill: async (skillData, token) => {
    set({ loading: true, error: null });
  
    try {
      const { data } = await axios.post(`${BASE_URL}/skills`, skillData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("✅ Skill added:", data); // Debugging log
  
      await get().fetchSkills(); // Refresh skills list
  
      set({ loading: false });
    } catch (error) {
      console.error("❌ Error adding skill:", error.response?.data || error.message);
      set({ error: error.response?.data?.message || "Failed to add skill", loading: false });
    }
  },

  updateSkill: async (id, updatedSkill, token) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${BASE_URL}/skills/${id}`, updatedSkill, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        skills: state.skills.map((skill) =>
          skill._id === id ? response.data : skill
        ),
        loading: false,
        selectedSkill: null, // Clear the selected skill after updating
      }));
    } catch (error) {
      console.error("Error updating skill:", error.response?.data || error.message);
      set({ error: error.response?.data?.message || "Failed to update skill", loading: false });
    }
  },

  deleteSkill: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        skills: state.skills.filter((skill) => skill._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Error deleting skill:", error.response?.data || error.message);
      set({ error: error.response?.data?.message || "Failed to delete skill", loading: false });
    }
  },
}));

export default useSkillStore;

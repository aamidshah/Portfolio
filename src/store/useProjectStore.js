import {create} from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const useGlobalStateStore = create((set,get) => ({
  activeComponent: null,
  setActiveComponent: (component) => set({ activeComponent: component }),

  isAuthenticated: false, // Default: Not logged in
  setAuth: (status) => set({ isAuthenticated: status }),
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),

  projects: [],
  setProjects: (projects) => set({ projects }),

  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  isUpdating: false,
  setIsUpdating: (isUpdating) => set({ isUpdating }),

  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  reviews: [],
  setReviews: (reviews) => set({ reviews }),

  averageRating: 0,
  setAverageRating: (averageRating) => set({ averageRating }),

  // fetchProjects
  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      console.log("Projects fetched successfully:", response.data);
      set({ projects: response.data });
      
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      set({ loading: false });
    }
  },


  handleDelete: async (id) => {
    const { isAuthenticated, token } = useAuthStore.getState(); // ✅ Access auth state

    if (!isAuthenticated) {
      console.error("User is not authenticated!");
      toast.error("You need to log in to delete a project!");
      return;
    }

    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token for authentication
        },
      });

      set((state) => ({
        projects: state.projects.filter((project) => project._id !== id),
      }));

      toast.success("Project deleted successfully!");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthorized! Please log in.");
        } else if (error.response.status === 403) {
          toast.error("Forbidden! You don't have permission to delete this project.");
        } else {
          toast.error("Failed to delete project. Please try again.");
        }
      } else {
        toast.error("An error occurred while deleting the project.");
      }
      console.error("Error deleting project:", error);
    } finally {
      set({ loading: false });
    }
  },
  
  handleUpdateSuccess: async () => {
    set({ loading: true });
    await get().fetchProjects();
    set({
      isUpdating: false,
      selectedProjectId: null,
      selectedProject: null,
      activeComponent: "projects",
      loading: false,
    });
  },

  updateProjectRating: (projectId, newRating) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project._id === projectId ? { ...project, averageRating: newRating } : project
      ),
    })),




  
}));



export default useGlobalStateStore;
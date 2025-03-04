import {create} from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';
import { toast } from 'react-toastify';
import AuthScreen from '../components/login/AuthScreen';
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
  setReviews: (reviews) => {
    if (!Array.isArray(reviews)) {
      console.error("Invalid reviews data, expected an array but got:", reviews);
      return;
    }
    
    set({ reviews }); // ✅ Directly update state with the new array
    // console.log("After setting reviews:", get().reviews);
  },
  
 
  averageRating: {},
  // setAverageRating: (projectId, newRating) => {
  //   if (!projectId) {
  //     console.warn("❌ setAverageRating called with undefined projectId.");
  //     return;
  //   }
  
  //   set((state) => {
  //     // Ensure the project exists before updating it
  //     const existingProject = state.projects.find((p) => p._id === projectId);
  //     if (!existingProject) {
  //       console.warn(`⚠️ Project with ID ${projectId} not found in state. Skipping update.`);
  //       return state; // Return unchanged state
  //     }
  
  //     return {
  //       selectedProject:
  //         state.selectedProject && state.selectedProject._id === projectId
  //           ? { ...state.selectedProject, averageRating: newRating }
  //           : state.selectedProject,
  
  //       projects: state.projects.map((project) =>
  //         project._id === projectId
  //           ? { ...project, averageRating: newRating }
  //           : project
  //       ),
  
  //       averageRatings: {
  //         ...state.averageRatings,
  //         [projectId]: newRating,
  //       },
  //     };
  //   });
  // },
  
  
  
  // setAverageRating: (projectId, newRating) => {
  //   set((state) => ({
  //     selectedProject: state.selectedProject?._id === projectId
  //       ? { ...state.selectedProject, averageRating: newRating }
  //       : state.selectedProject,

  //     projects: state.projects.map((project) =>
  //       project._id === projectId ? { ...project, averageRating: newRating } : project
  //     ),

  //     averageRatings: { ...state.averageRatings, [projectId]: newRating }, // Track ratings per project
  //   }));
  // },
  // fetchProjects
  
  setAverageRating: (projectId, newRating) => {
    if (!projectId) {
      console.warn("❌ setAverageRating called with undefined projectId.");
      return;
    }
  
    set((state) => {
      // 1. Update selectedProject if it matches the projectId
      let updatedSelectedProject = state.selectedProject;
      if (state.selectedProject && state.selectedProject._id === projectId) {
        updatedSelectedProject = { ...state.selectedProject, averageRating: newRating };
      }
  
      // 2. Update projects array
      const updatedProjects = state.projects.map((project) =>
        project._id === projectId ? { ...project, averageRating: newRating } : project
      );
  
      // 3. Update averageRatings object (crucial fix)
      const updatedAverageRatings = {
        ...state.averageRatings,
        [projectId]: newRating,
      };
  
      return {
        selectedProject: updatedSelectedProject,
        projects: updatedProjects,
        averageRatings: updatedAverageRatings, // Correct key: averageRatings
      };
    });
  
    console.log("✅ Updated Zustand state with new averageRating:", projectId, newRating);
  },
    
  
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
    const { setActiveComponent } = get();
    if (!isAuthenticated) {
      console.error("User is not authenticated!");
      toast.error("You need to log in to delete a project!");
      setActiveComponent("authScreen")
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
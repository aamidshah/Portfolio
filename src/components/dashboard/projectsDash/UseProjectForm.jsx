import { useState, useEffect } from "react";

import axios from "axios"; // For making API requests

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useGlobalStateStore from "../../../store/useProjectStore";
import useAuthStore from "../../../store/authStore";
// toast.configure();
const BASE_URL = import.meta.env.VITE_API_URL;

const useProjectForm = (
  setActiveComponent,
  setSelectedProject,
  onUpdateSuccess,
  selectedProject,
  setSelectedProjectId,
  setIsUpdating,
  projectId
) => {
  // const { selectedProject, setSelectedProject } = useProjectStore(); // Get from store
  const { token } = useAuthStore()
  const [technologyUsage, setTechnologyUsage] = useState([]);

  const [project, setProject] = useState({
    title: "",

    description: "",

    techStack: "",

    liveDemo: "",

    githubLink: "",

    image: null,

    features: [],

    featureInput: "",

    category: "",

    complexity: "",

    contributors: "",

    status: "In Progress",

    startDate: "",

    endDate: "",

    estimatedTime: "",

    technologyUsage: {},
  });

  useEffect(() => {
    if (projectId) {
      axios

        .get(`${BASE_URL}/projects/${projectId}`)

        .then((response) => {
          const fetchedProject = response.data;

          setProject({
            title: fetchedProject.name || "",

            description: fetchedProject.description || "",

            // techStack: fetchedProject.technologies || "",

            liveDemo: fetchedProject.link || "",

            githubLink: fetchedProject.gitLink || "",

            image: fetchedProject.image || [], // Store image URL from DB

            features: fetchedProject.features || [],

            featureInput: "",

            category: fetchedProject.category || "",

            complexity: fetchedProject.complexity || "",

            contributors: fetchedProject.contributors.join(", ") || "", // Assuming contributors is an array

            status: fetchedProject.status || "Project Status",

            startDate: fetchedProject.startDate || "",

            endDate: fetchedProject.endDate || "",

            estimatedTime: fetchedProject.estimatedTime || "",

            technologyUsage: fetchedProject.technologyUsage || {},
          });
        })

        .catch((error) => {
          console.error("Error fetching project data:", error);
        });
    }
    // console.log("Project fetched:"
  }, [projectId, setProject]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFeatureAdd = () => {
    if (project.featureInput.trim() !== "") {
      setProject((prev) => ({
        ...prev,

        features: [...prev.features, prev.featureInput],

        featureInput: "",
      }));
    }
  };

  const handleFeatureRemove = (index) => {
    setProject((prev) => ({
      ...prev,

      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleTechnologyUsageRemove = (techName) => {
    setProject((prev) => {
      const updatedTech = { ...prev.technologyUsage };
      delete updatedTech[techName]; // Remove key from object

      return {
        ...prev,
        technologyUsage: updatedTech,
      };
    });
  };

  const handleCancel = () => {
    try {
      if (!projectId) {
        setProject({
          title: "",

          description: "",

          // techStack: "",

          liveDemo: "",

          githubLink: "",

          image: null,

          features: [],

          featureInput: "",

          category: "",

          complexity: "",

          contributors: "",

          status: "In Progress",

          startDate: "",

          endDate: "",

          estimatedTime: "",

          technologyUsage: {
            React: 50,

            TailwindCSS: 20,

            "Framer Motion": 15,

            JavaScript: 15,
          },
        });

        setActiveComponent("projects");
      } else if (projectId) {
        setProject({
          title: "",

          description: "",

          // technologies: "",

          link: "",

          gitLink: "",

          image: null,

          features: [],

          featureInput: "",

          category: "",

          complexity: "",

          contributors: "",

          status: "",

          startDate: "",

          endDate: "",

          estimatedTime: "",

          technologyUsage: {
            React: 50,

            TailwindCSS: 20,

            "Framer Motion": 15,

            JavaScript: 15,
          },
        });

        setActiveComponent("projects");

        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };
  const handleUsageChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 100) {
      setProject({ ...project, usage: value });
    } else {
      alert("Proficiency should be a number between 0 and 100.");
    }
  };

  const handleTechnologyAdd = () => {
    if (!project.technology || !project.usage) {
      alert("Please enter both technology name and usage percentage.");
      return;
    }

    setProject((prev) => ({
      ...prev,
      technologyUsage: {
        ...prev.technologyUsage,
        [project.technology]: parseInt(project.usage, 10) || 0, // Ensure it's a number
      },
      technology: "", // Reset fields
      usage: "",
    }));
  };
  // const convertGoogleDriveLink = (url) => {
  //   const match = url.match(/(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|docs\.google\.com\/uc\?id=)([-\w]{25,})/);
  //   if (match) {
  //     const fileId = match[1];
  //     return `https://lh3.googleusercontent.com/d/${fileId}=s500`;
  //   }
  //   console.error("Invalid Google Drive Link:", url);
  //   return null;
  // };

  const convertGoogleDriveLink = (url) => {
    if (!url) {
      console.error("Invalid URL: URL is empty or undefined.");
      return null;
    }

    try {
      let fileId;

      // Google Drive Link Conversion
      const googleDriveMatch = url.match(
        /(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|docs\.google\.com\/uc\?id=)([-\w]{25,})/
      );
      if (googleDriveMatch) {
        fileId = googleDriveMatch[1];
        return `https://lh3.googleusercontent.com/d/${fileId}=s500`;
      }

      // Google Drive Direct Sharing Link Conversion
      if (url.includes("drive.google.com") && url.includes("export=download")) {
        const urlParams = new URL(url).searchParams;
        fileId = urlParams.get("id");
        if (fileId) return `https://lh3.googleusercontent.com/d/${fileId}=s500`;
      }

      // Dropbox Link Conversion (Changing `www.dropbox.com` to `dl.dropboxusercontent.com`)
      if (url.includes("dropbox.com")) {
        return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
      }

      // OneDrive Link Conversion (Preview-friendly URL)
      if (url.includes("onedrive.live.com")) {
        return url.replace("redir?", "download?");
      }

      // If it's already a valid image URL, return as is
      if (url.match(/\.(jpeg|jpg|gif|png|svg|webp|bmp|tiff)$/i)) {
        return url;
      }

      console.warn("Unsupported or Invalid Image URL:", url);
      return null;
    } catch (error) {
      console.error("Error processing image URL:", error);
      return null;
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.value.trim();
    console.log("Original Image URL:", image);

    const convertedUrl = convertGoogleDriveLink(image);
    console.log("Converted Image URL:", convertedUrl);

    if (convertedUrl) {
      setProject((prev) => {
        const updatedProject = { ...prev, image: convertedUrl };
        console.log("Updated Project State:", updatedProject);
        return updatedProject;
      });
    } else {
      alert("Invalid Google Drive URL. Please check and try again.");
    }
  };

  const handleSubmit = async (e, onUpdateSuccess) => {
    e.preventDefault();
    console.log("Submitting Data:", project); // Debugging
    if (!token) {
      toast.error("You need to log in to add or update a project!");
      return;
    }
    console.log("Token before request:", token);


    const technologyUsageObject = Object.entries(
      project.technologyUsage
    ).reduce((acc, [name, usage]) => {
      acc[name] = parseInt(usage, 10) || 0; // Ensure numeric values
      return acc;
    }, {});

    const newProject = {
      name: project.title,

      description: project.description,

      link: project.liveDemo,

      gitLink: project.githubLink,

      image: Array.isArray(project.image) ? project.image : [project.image],
      features: Array.isArray(project.features) ? project.features : [],

      year: new Date().getFullYear(),

      category: project.category,

      complexity: project.complexity,

      contributors: [
        ...new Set(
          project.contributors
            .split(",")
            .map((name) => name.trim().replace(/"/g, ""))
        ),
      ],

      status: project.status,

      startDate: project.startDate,

      endDate: project.endDate,

      estimatedTime: project.estimatedTime,

      technologyUsage: technologyUsageObject,
    };
    try {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`, // Send token in request headers
              "Content-Type": "application/json",
          },
      };

    
      if (!projectId) {
        // For adding a new project

        const response = await axios.post(`${BASE_URL}/projects`, newProject,config);

        console.log("Response:", response.data.image);

        toast.success("Project added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setProject({
          title: "",

          description: "",

          liveDemo: "",

          githubLink: "",

          image: null,

          features: [],

          featureInput: "",

          category: "",

          complexity: "",

          contributors: "",

          status: "In Progress",

          startDate: "",

          endDate: "",

          estimatedTime: "",

          technologyUsage: {
            React: 50,

            TailwindCSS: 20,

            "Framer Motion": 15,

            JavaScript: 15,
          },
        });
        console.log("Submitting project:", newProject);
        console.log("Response:", response);

        setActiveComponent("projects");
      } else if (projectId) {
        const response = await axios.put(
          `${BASE_URL}/projects/${projectId}`,

          newProject,
          config
        );

        console.log(response.data);

        toast.success("Project updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setProject({
          title: "",

          description: "",

          liveDemo: "",

          githubLink: "",

          image: null,

          features: [],

          featureInput: "",

          category: "",

          complexity: "",

          contributors: "",

          status: "In Progress",

          startDate: "",

          endDate: "",

          estimatedTime: "",

          technologyUsage: {
            React: 50,

            TailwindCSS: 20,

            "Framer Motion": 15,

            JavaScript: 15,
          },
        });
        console.log("Submitting project:", newProject);

        onUpdateSuccess();

        setIsUpdating(false);

        setActiveComponent("projects");

        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired! Please log in again.");}
     else{ toast.error("Failed to submit project. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }}

  return {
    project,

    handleChange,

    handleImageChange,

    handleFeatureAdd,

    handleFeatureRemove,

    handleSubmit,
    handleTechnologyUsageRemove,
    setProject,
    technologyUsage,
    handleUsageChange,
    handleTechnologyAdd,
    setSelectedProject,

    handleCancel,

    // onUpdateSuccess
  };
};

export default useProjectForm;

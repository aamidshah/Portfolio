import { useState, useEffect } from "react";

import axios from "axios"; // For making API requests

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

    technologyUsage: {
     
    },
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

            status: fetchedProject.status || "In Progress",

            startDate: fetchedProject.startDate || "",

            endDate: fetchedProject.endDate || "",

            estimatedTime: fetchedProject.estimatedTime || "",

            technologyUsage: fetchedProject.technologyUsage || {
              
            },
          });
        })

        .catch((error) => {
          console.error("Error fetching project data:", error);
        });
    }
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
        technologyUsage: updatedTech
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
const convertGoogleDriveLink = (url) => {
  const match = url.match(/(?:drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|docs\.google\.com\/uc\?id=)([-\w]{25,})/);
  if (match) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}=s500`;
  }
  console.error("Invalid Google Drive Link:", url);
  return null;
};


const handleImageChange = (e) => {
  const image = e.target.value.trim();
  console.log("Original Image URL:", image);

  const convertedUrl = convertGoogleDriveLink(image);
  console.log("Converted Image URL:", convertedUrl);

  if (convertedUrl) {
    setProject(prev => {
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
    console.log("Submitting Data:", project);  // Debugging

    const technologyUsageObject = Object.entries(project.technologyUsage).reduce((acc, [name, usage]) => {
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

      contributors: [...new Set(project.contributors.split(",").map(name => name.trim().replace(/"/g, "")))],

      status: project.status,

      startDate: project.startDate,

      endDate: project.endDate,

      estimatedTime: project.estimatedTime,

      technologyUsage:technologyUsageObject,
    };

    

    try {
      if (!projectId) {
        // For adding a new project

        const response = await axios.post(
          `${BASE_URL}/projects`,
          newProject,
         
        )

      console.log(response.data);

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
        console.log("Response:" , response);

        setActiveComponent("projects");
      } else if (projectId) {
        const response = await axios.put(
          `${BASE_URL}/projects/${projectId}`,

          newProject
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

      toast.error("Failed to submit project. Try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

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

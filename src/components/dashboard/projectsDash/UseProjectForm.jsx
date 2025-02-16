import { useState } from "react";
import projectsData from "/public/projectsData.json";

const useProjectForm = (setActiveComponent) => {
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
    difficulty: "",
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

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProject({ ...project, image: URL.createObjectURL(file) });
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored projects
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const allProjects = [...projectsData, ...storedProjects];
    const maxId = allProjects.length > 0 ? Math.max(...allProjects.map((p) => p.id || 0)) : 0;
    const newProjectId = maxId + 1;

    const newProject = {
      id: newProjectId,
      name: project.title,
      description: project.description,
      technologies: project.techStack,
      link: project.liveDemo,
      gitLink: project.githubLink,
      image: project.image ? [project.image] : [],
      features: project.features,
      year: new Date().getFullYear(),
      align: storedProjects.length % 2 === 0 ? "left" : "right",
      category: project.category,
      difficulty: project.difficulty,
      contributors: project.contributors.split(",").map((name) => name.trim()),
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      estimatedTime: project.estimatedTime,
      technologyUsage: project.technologyUsage,
    };

    // Save new project
    localStorage.setItem("projects", JSON.stringify([newProject, ...storedProjects]));
    console.log("Projects id:", newProjectId);

    // Reset form
    setProject({
      title: "",
      description: "",
      techStack: "",
      liveDemo: "",
      githubLink: "",
      image: null,
      features: [],
      featureInput: "",
      category: "",
      difficulty: "",
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

    // Notify ProjectList to re-render
    window.dispatchEvent(new Event("storage"));

    // Go back to projects list
    setActiveComponent("projects");
  };

  return {
    project,
    handleChange,
    handleImageChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleSubmit,
    setProject,
  };
};

export default useProjectForm;

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(null); // Tracks active section
const [isOpen, setIsOpen] = useState(false); // Tracks if the mobile menu is open
const [showSidebar, setShowSidebar] = useState(false);
const [projectId, setProjectId] = useState(null); // Global project ID

  return (
    <GlobalStateContext.Provider value={{ activeComponent, setActiveComponent,isOpen,setIsOpen,showSidebar,setShowSidebar, projectId,
      setProjectId, }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

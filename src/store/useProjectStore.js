import {create} from 'zustand';

  const useGlobalStateStore = create((set) => ({
  activeComponent: null,
  setActiveComponent: (component) => set({ activeComponent: component }),
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));

export default useGlobalStateStore;
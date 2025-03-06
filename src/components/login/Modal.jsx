import { useEffect, useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true); // Show modal when component mounts

    const timer = setTimeout(() => {
      setShowModal(false); // Hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <span className="text-red-500 font-semibold">
              You can only register if you are part of a project.
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

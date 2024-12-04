import React, { useState, useEffect } from "react";


type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserDetailsModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {

  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation to finish before hiding
      return () => clearTimeout(timer);
    }
  }, [isOpen]);



  
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center  duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-5xl p-8 transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Add New User
        </h2>

       

        {/* Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black rounded-lg py-2 px-6 hover:bg-gray-400 focus:outline-none transition-all"
          >
            Close
          </button>
          <button
            type="submit"
           
            className="bg-blue-500 text-white rounded-lg py-2 px-6 hover:bg-blue-600 focus:outline-none transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;

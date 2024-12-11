import React, { useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle modal open and close animation timing
  useEffect(() => {
    let timeout = null;

    if (isOpen) {
      setIsVisible(true);
    } else {
      timeout = setTimeout(() => setIsVisible(false), 300); // Wait for the animation to finish
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`modal-overlay ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
};

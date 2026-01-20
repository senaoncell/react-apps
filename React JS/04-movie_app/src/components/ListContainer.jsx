import { useState } from "react";

// Container component that can open and close the list
export default function ListContainer({ children }) {
  // State that holds the open/closed status of the list
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        // The isOpen value is reversed when the button is clicked
        onClick={() => setIsOpen((val) => !val)}
      >
        {/* Shows an up arrow if the list is open, a down arrow if it's closed */}
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}
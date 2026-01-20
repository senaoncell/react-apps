import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Modal component (children: content, open: open/closed status)
export default function Modal({ children, open }) {
    // A reference is created to access the dialog HTML element
    const dialog = useRef();

  useEffect(() => {
    // Accessing the dialog element
    const modal = dialog.current;

    if (open) {
      modal.showModal(); //If open is true, the modal opens
    } else {
      modal.close(); // If `open` is false, the modal is closed
    }
  }, [open]); // Only triggered when `open` changes

  // Renders the modal into the element with the ID #modal in the DOM
  return createPortal(
    <dialog ref={dialog} className="modal-box">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
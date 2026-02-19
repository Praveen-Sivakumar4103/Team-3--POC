import React from "react";
import "./Modal.css";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Success 🎉</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

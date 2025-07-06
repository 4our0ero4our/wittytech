import React from "react";

export default function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
                {children}
            </div>
        </div>
    );
}

import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }: any) => {
    const handleCloseClick = (e: any) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            &times;
                        </a>
                    </div>
                    {title && <h2 className="desc">{title}</h2>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as any
    );
};

export default Modal;

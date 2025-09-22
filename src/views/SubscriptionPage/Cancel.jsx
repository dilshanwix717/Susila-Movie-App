import React from "react";
import { FaExclamationTriangle } from "react-icons/fa"; // For error icon

const Cancel = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#000" }}>
            <div className="text-center" style={{ color: "#fff", maxWidth: "400px" }}>
                {/* Error Icon with Animation */}
                <FaExclamationTriangle size={80} color="#e50914" className="animate__animated animate__shakeX" />

                {/* Main Heading */}
                <h3 className="fw-bold fs-2 mt-4 animate__animated animate__fadeIn" style={{ color: "#e50914" }}>
                    Payment Canceled
                </h3>

                {/* Subtitle */}
                <p className="mt-3 mb-5 animate__animated animate__fadeIn" style={{ color: "#bbb" }}>
                    Oops! Something went wrong with your payment. Please try again later.
                </p>

                {/* Call-to-action Button */}
                <a
                    href="/"
                    className="btn btn-lg mt-4 px-5 py-3 animate__animated animate__pulse"
                    style={{ backgroundColor: '#e50914', color: '#fff', borderRadius: "30px" }}
                >
                    Go To Homepage
                </a>
            </div>
        </div>
    );
};

export default Cancel;

import React, { useEffect, useState } from 'react';
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { executePaymentSuccess } from "../../api/endPoints";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const Success = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the button

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const userDocRef = doc(db, "webAppUsers", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setSessionId(userData?.subscription?.sessionId || "");
                    console.log(userData);
                } else {
                    console.log("No such user data found in Firestore");
                }
            } else {
                setUserId("");
                setSessionId("");
            }
        });
        return () => unsubscribe();
    }, []);

    const handlePaymentSuccess = () => {
        setLoading(true); // Set loading state to true when button is clicked
        executePaymentSuccess(sessionId, userId)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data.message);
                    navigate("/home");
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // Reset loading state
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#000" }}>
            <div className="text-center" style={{ color: "#fff", maxWidth: "400px" }}>
                <FaCheckCircle size={80} color="#e50914" className="animate__animated animate__bounceIn" />

                <h3 className="fw-bold fs-2 mt-4 animate__animated animate__fadeIn" style={{ color: "#e50914" }}>
                    Payment Successful!
                </h3>

                <p className="mt-3 mb-5 animate__animated animate__fadeIn" style={{ color: "#bbb" }}>
                    Thank you for your purchase. You can now enjoy all the premium features.
                </p>

                <button
                    onClick={() => handlePaymentSuccess()}
                    className="btn btn-lg mt-4 px-5 py-3 animate__animated animate__pulse"
                    style={{ backgroundColor: '#e50914', color: '#fff', borderRadius: "30px" }}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? (
                        <Spinner animation="border" role="status" size="sm" style={{ color: '#fff' }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        "Proceed"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Success;

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { FaExclamationTriangle } from 'react-icons/fa'; // For error icon
import CardStyle from '../../components/cards/LiveCardStyle'; // Import CardStyle component

// LiveEventsPage Component: Displays a list of live events fetched from Firestore.
function LiveEventsPage() {
    const collectionRef = collection(db, 'live'); // Firestore collection reference
    const [myData, setMyData] = useState([]); // State for live event data
    const [error, setError] = useState(null); // State for error messages
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state
    const navigate = useNavigate();  // Router navigation for linking to event streams
    const { t } = useTranslation(); // Translation hook

    // Fetch live events from Firestore
    const getEventName = useCallback(async () => {
        setError(null);
        try {
            const q = query(collectionRef); // Create query for Firestore
            const data = await getDocs(q); // Fetch documents
            setMyData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Map document data with IDs
        } catch (error) {
            console.error("Error fetching events: ", error);
            setError("Failed to load events. Please try again later."); // Set error message on failure
        } finally {
            setIsLoading(false); // Stop loading state
        }
    }, [collectionRef]);

    useEffect(() => {
        getEventName(); // Fetch events on component mount
    }, [getEventName]);

    // Handle the 'Watch' button click to navigate to the live stream page
    const handleWatchClick = (eventId) => {
        navigate(`/live-stream/${eventId}`); // Redirect to specific live stream
    };

    // Placeholder skeletons displayed during loading
    const skeletons = Array.from({ length: 8 });

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
            <div className="text-center" style={{ color: "#fff", width: "100%", padding: "32px" }}>
                <h5 className="fw-bold fs-1 mt-4" style={{ color: "#e50914", padding: "32px" }}>
                    Live Events
                </h5>

                {/* Error Message Display */}
                {error && (
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <FaExclamationTriangle size={30} color="#e50914" />
                        <span className="ms-2" style={{ color: "#e50914" }}>{error}</span>
                    </div>
                )}

                <div className="row">
                    {isLoading ? (
                        // Show skeletons during loading
                        skeletons.map((_, index) => (
                            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
                                <div className="card skeleton-card border-0 shadow-sm">
                                    <div className="skeleton-image w-100 mx-2" style={{ height: "350px", backgroundColor: "#141314" }}></div>
                                </div>
                            </div>
                        ))
                    ) : myData.length > 0 ? (
                        // Display live events when data is loaded
                        myData.map((event) => (
                            <div key={event.id} className="col-6 col-md-4 col-lg-2 mb-4" style={{ padding: "16px" }}>
                                <CardStyle
                                    image={event.imageUrl} // Event image
                                    title={event.name} // Event name
                                    link={`/live-stream/${event.id}`} // Event link
                                    selectedVideo_Data={event} // Current event details
                                    selectedVideo_Array={myData} // All event data
                                />
                            </div>
                        ))
                    ) : (
                        // Message when no events are available
                        <div className="text-center">
                            <h5 className="fw-bold fs-4" style={{ color: "#e50914" }}>No live events available at this moment.</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LiveEventsPage;

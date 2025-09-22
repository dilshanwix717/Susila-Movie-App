import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';  // Import Firestore database
import { doc, getDoc } from 'firebase/firestore';  // Firestore methods for getting a document

const LiveStreamPage = () => {
    const { eventId } = useParams();  // Get the event ID from the URL params
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState(null);

    // Function to extract the Vimeo URL from the stored HTML block
    const extractVimeoUrl = (htmlString) => {
        const match = htmlString.match(/src="([^"]+)"/);  // Extract the URL from the iframe
        return match ? match[1] : '';  // Return the URL if found, otherwise an empty string
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const docRef = doc(db, 'live', eventId);  // Fetch document by eventId
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const videoLink = extractVimeoUrl(data.link);  // Extract the Vimeo link
                    setVideoUrl(videoLink);  // Set the extracted URL
                } else {
                    setError("Event not found.");
                }
            } catch (error) {
                console.error("Error fetching event details: ", error);
                setError("Failed to load event details.");
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
            <div className="text-center" style={{ color: "#fff", width: "80%", padding: "32px", marginTop: "48px" }}>
                {videoUrl ? (
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                        <iframe
                            src={videoUrl}  // Use the extracted Vimeo URL
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        ></iframe>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status" style={{ color: '#e50914' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveStreamPage;

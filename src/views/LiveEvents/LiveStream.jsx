import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaPlay, FaPause, FaForward, FaBackward, FaBroadcastTower } from "react-icons/fa";
import { Button } from "react-bootstrap";

// LiveStream Component: Displays a YouTube live stream for a specific event
const LiveStream = () => {
    const { eventId } = useParams(); // Retrieve eventId from URL
    const [videoId, setVideoId] = useState(""); // State for YouTube video ID
    const [error, setError] = useState(null); // State for error messages
    const [player, setPlayer] = useState(null); // State for YouTube player instance

    // Extract video ID from a given YouTube link
    const extractVideoId = (link) => {
        let videoId = "";

        try {
            if (link.includes("youtube.com/live/")) {
                videoId = link.split("youtube.com/live/")[1].split("?")[0];
            } else if (link.includes("youtu.be/")) {
                videoId = link.split("youtu.be/")[1].split("?")[0];
            } else if (link.includes("youtube.com/embed/")) {
                videoId = link.split("youtube.com/embed/")[1].split("?")[0];
            }

            if (!videoId) throw new Error("Invalid link format.");
        } catch (err) {
            console.error("Error extracting video ID: ", err);
        }

        return videoId;
    };

    // Fetch event details from Firestore and extract video ID
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const docRef = doc(db, "live", eventId); // Firestore document reference
                const docSnap = await getDoc(docRef); // Fetch document data

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const videoId = extractVideoId(data.link);

                    if (videoId) {
                        setVideoId(videoId); // Set video ID if valid
                    } else {
                        setError("Invalid video link.");
                    }
                } else {
                    setError("Event not found."); // Handle missing event
                }
            } catch (error) {
                console.error("Error fetching event details: ", error);
                setError("Failed to load event details.");
            }
        };

        fetchEventDetails();
    }, [eventId]);

    // Initialize YouTube player once video ID is available
    useEffect(() => {
        if (!videoId) return;

        const onYouTubeIframeAPIReady = () => {
            const playerInstance = new window.YT.Player("youtube-player", {
                videoId: videoId,
                playerVars: {
                    enablejsapi: 1,
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    disablekb: 1,
                },
                events: {
                    onReady: (event) => {
                        setPlayer(event.target); // Set player instance
                        event.target.playVideo(); // Auto-play video
                    },
                },
            });
        };

        // Load YouTube iframe API if not already loaded
        if (!window.YT) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.onload = () => {
                window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            };
            document.body.appendChild(script);
        } else {
            onYouTubeIframeAPIReady();
        }
    }, [videoId]);

    // Player control handlers
    const handlePlay = () => player?.playVideo();
    const handlePause = () => player?.pauseVideo();
    const handleSkipForward = () => {
        const currentTime = player?.getCurrentTime() || 0;
        player?.seekTo(currentTime + 10);
    };
    const handleSkipBackward = () => {
        const currentTime = player?.getCurrentTime() || 0;
        player?.seekTo(currentTime - 10);
    };
    const handleGoToLive = () => player?.seekTo(player?.getDuration());

    // Disable keyboard shortcuts globally
    useEffect(() => {
        const handleKeyDown = (event) => {
            event.preventDefault(); // Prevent all keyboard interactions
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Display error message if any
    if (error) {
        return <div className="text-danger text-center mt-5">{error}</div>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-black vh-100">
            <div className="text-center text-white container py-4">
                {videoId ? (
                    <div className="position-relative mx-auto">
                        <div
                            id="youtube-player"
                            className="w-100 mx-auto"
                            style={{
                                height: "calc(100vw * 9 / 16)",
                                maxHeight: "500px",
                                marginTop: "20px",
                                pointerEvents: "none", // Disable player interaction
                            }}
                        ></div>

                        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                            {/* Control buttons */}
                            <Button variant="outline-primary" onClick={handleSkipBackward}>
                                <FaBackward /> Backward
                            </Button>
                            <Button variant="outline-primary" onClick={handlePlay}>
                                <FaPlay /> Play
                            </Button>
                            <Button variant="outline-primary" onClick={handlePause}>
                                <FaPause /> Pause
                            </Button>
                            <Button variant="outline-primary" onClick={handleSkipForward}>
                                <FaForward /> Forward
                            </Button>
                            <Button variant="outline-primary" onClick={handleGoToLive}>
                                <FaBroadcastTower /> Go Live
                            </Button>
                        </div>
                    </div>
                ) : (
                    // Show spinner during loading
                    <div className="text-center">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveStream;

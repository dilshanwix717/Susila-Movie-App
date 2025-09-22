import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Import Plyr's CSS for styling
import Hls from "hls.js"; // Import HLS.js for handling HLS video streams
import "./HLsPlayer.css"; // Import custom styles for the component

/**
 * HLS Video Player Component
 * @param {Object} props - The props object.
 * @param {string} props.videoSource - The URL of the HLS video stream.
 * @returns {JSX.Element} A styled HLS video player with a loading spinner.
 */
const HLS = ({ videoSource }) => {
  const videoRef = useRef(); // Reference to the video element
  const [isLoading, setIsLoading] = useState(true); // State to manage loading spinner visibility

  useEffect(() => {
    // Ensure video element exists
    if (videoRef.current) {
      const video = videoRef.current;

      // Check if HLS is supported in the current environment
      if (Hls.isSupported()) {
        const hls = new Hls(); // Create a new HLS instance
        hls.loadSource(videoSource); // Load the video source into HLS
        hls.attachMedia(video); // Attach HLS to the video element

        // Event listener for when the video manifest is parsed
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Initialize the Plyr player for enhanced controls and UI
          const player = new Plyr(video, {
            controls: [
              "play-large",
              "restart",
              "rewind",
              "play",
              "fast-forward",
              "progress",
              "current-time",
              "duration",
              "mute",
              "volume",
              "settings",
              "pip",
              "fullscreen",
            ],
            quality: {
              // Set up quality options dynamically based on HLS levels
              default: hls.levels[0].height, // Default quality
              options: hls.levels.map((level) => level.height), // Available qualities
              forced: true, // Force quality changes via Plyr
              onChange: (newQuality) => {
                // Change quality in HLS when user selects a new one
                hls.levels.forEach((level, levelIndex) => {
                  if (level.height === newQuality) {
                    hls.currentLevel = levelIndex;
                  }
                });
              },
            },
          });

          // Hide loading spinner when the video is ready to play
          setIsLoading(false);
        });

        // Show the loading spinner while the video is being processed
        setIsLoading(true);

        // Cleanup function to destroy the HLS instance when the component unmounts
        return () => {
          hls.destroy();
        };
      }
    }
  }, [videoSource]); // Re-run effect when the video source changes

  return (
    <div style={{ height: "400px", position: "relative" }}>
      {/* Display the loading spinner if the video is still loading */}
      {isLoading && (
        <div
          className="d-flex justify-content-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <div className="spinner-border" role="status" style={{ color: "#e50914" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Render the video element; hide it until the video is ready */}
      <video
        ref={videoRef}
        controls
        style={{
          display: isLoading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default HLS;

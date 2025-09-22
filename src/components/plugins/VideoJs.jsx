import React, { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-hotkeys"; // Import the hotkeys plugin
import 'videojs-contrib-quality-levels'; // Import quality levels plugin

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  // State to manage selected quality level
  const [selectedQuality, setSelectedQuality] = useState(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // Create video element
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      // Initialize Video.js player
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);

        // Initialize the hotkeys plugin with desired options
        player.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
        });

        // Initialize quality levels
        const qualityLevels = player.qualityLevels();

        // Add quality levels based on the available sources
        options.sources.forEach((source, index) => {
          const height = parseInt(source.type.split("p")[0], 10); // Extract height from source type
          qualityLevels.addQualityLevel({
            id: `${source.src}`, // Unique ID for quality level
            height, // Height for the quality level
            enabled: true, // Default enabled state
          });
        });

        // Disable quality levels with less than 720 horizontal lines
        qualityLevels.on('addqualitylevel', function (event) {
          const qualityLevel = event.qualityLevel;
          if (qualityLevel.height < 720) {
            qualityLevel.enabled = false;
          }
        });

        // Listen for quality level change events
        qualityLevels.on('change', function () {
          console.log('Quality Level changed!');
          console.log('New level:', qualityLevels[qualityLevels.selectedIndex]);
          setSelectedQuality(qualityLevels[qualityLevels.selectedIndex].id); // Update state with selected quality
        });
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Change quality level based on user selection
  const handleQualityChange = (event) => {
    const selectedId = event.target.value;
    const player = playerRef.current;
    const qualityLevels = player.qualityLevels();

    // Enable the selected quality level
    qualityLevels.forEach((level) => {
      level.enabled = (level.id === selectedId);
    });

    // Update the selectedIndex to the new level
    const newIndex = qualityLevels.findIndex(level => level.id === selectedId);
    qualityLevels.selectedIndex = newIndex;

    // Trigger change event
    qualityLevels.trigger({ type: 'change', selectedIndex: newIndex });
  };

  // Dispose of the Video.js player when the component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
      <select onChange={handleQualityChange} value={selectedQuality}>
        <option value="" disabled>Select Quality</option>
        {options.sources.map((source, index) => {
          const height = parseInt(source.type.split("p")[0], 10);
          return (
            <option key={index} value={source.src}>
              {height}p
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default VideoJS;


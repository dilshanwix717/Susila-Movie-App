import React, { useEffect, useRef } from 'react';
import "plyr/dist/plyr.css"; // Ensure Plyr CSS is imported



import Plyr from 'plyr';
import Hls from 'hls.js'; // Ensure hls.js is imported

const HLSPlayer = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const source = "https://player.vimeo.com/external/924554872.m3u8?s=cb12780fb7d08ac8ea73112f8d2dff75410f9bc3&logging=false";

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(source);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const availableQualities = hls.levels.map((l) => l.height);

                const defaultOptions = {
                    controls: [
                        'play-large',
                        'restart',
                        'rewind',
                        'play',
                        'fast-forward',
                        'progress',
                        'current-time',
                        'duration',
                        'mute',
                        'volume',
                        'captions',
                        'settings', // Keep the default settings menu
                        'fullscreen'
                    ],
                    settings: ['quality'], // Enable the settings for quality
                    quality: {
                        default: availableQualities[0], // Set the default quality
                        options: availableQualities, // Provide available quality options
                        forced: true, // Force users to use the quality options
                        onChange: (newQuality) => updateQuality(newQuality), // Quality change handler
                    },
                    autoplay: false,
                    hideControls: false,
                };

                // Initialize Plyr with default controls
                playerRef.current = new Plyr(video, defaultOptions);
                hls.attachMedia(video); // Attach the HLS source
                window.hls = hls; // Attach hls instance to the window
            });

            const updateQuality = (newQuality) => {
                window.hls.levels.forEach((level, levelIndex) => {
                    if (level.height === newQuality) {
                        window.hls.currentLevel = levelIndex; // Update the current quality level
                    }
                });
            };

        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy(); // Clean up the player instance
            }
        };
    }, []);

    return (
        <div style={{ height: 400 }}>
            <video id="player" ref={videoRef} controls />
        </div>
    );
};

export default HLSPlayer;

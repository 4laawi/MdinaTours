'use client';

import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
    src: string;
    style?: React.CSSProperties;
    controls?: boolean;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    maxDuration?: number;
}

export default function VideoPlayer({
    src,
    style,
    controls = true,
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    maxDuration = 54
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Explicitly set muted property to bypass React's muted attribute hydration issues
            if (muted) {
                video.muted = true;
            }
            if (autoPlay) {
                video.play().catch((err) => {
                    console.log("Autoplay was prevented or video failed to play:", err);
                });
            }
        }
    }, [autoPlay, muted, src]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (video.currentTime >= maxDuration) {
            video.currentTime = 0;
            // Re-trigger play just in case the browser pauses it
            video.play().catch(() => {});
        }
    };

    // Remove media fragment from src if it is passed with #t=... to prevent browser decoding issues
    const cleanSrc = src.split('#')[0];

    return (
        <video
            ref={videoRef}
            src={cleanSrc}
            controls={controls}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            onTimeUpdate={handleTimeUpdate}
            style={style}
        />
    );
}

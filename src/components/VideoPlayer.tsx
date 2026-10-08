'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
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
    poster = '/cars/flotte-vito.webp',
    style,
    controls = true,
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    maxDuration
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    // Remove media fragment from src if it is passed with #t=... to prevent browser decoding issues
    const cleanSrc = src.split('#')[0];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                    } else if (shouldLoad && !video.paused) {
                        // Pause video when scrolled out of view to save battery and main-thread CPU
                        video.pause();
                    }
                },
                { rootMargin: '300px' }
            );

            observer.observe(video);
            return () => observer.disconnect();
        } else {
            // Fallback for browsers without IntersectionObserver
            setShouldLoad(true);
        }
    }, [shouldLoad]);

    useEffect(() => {
        const video = videoRef.current;
        if (video && shouldLoad) {
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
    }, [shouldLoad, autoPlay, muted, src]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (maxDuration && video.currentTime >= maxDuration) {
            video.currentTime = 0;
            // Re-trigger play just in case the browser pauses it
            video.play().catch(() => {});
        }
    };

    return (
        <video
            ref={videoRef}
            src={shouldLoad ? cleanSrc : undefined}
            poster={poster}
            preload="none"
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

'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
    src: string;
    mobileSrc?: string;
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
    mobileSrc = '/img/tours-mdina-tours-morocco-mobile.mp4',
    poster = '/img/tours-video-poster.webp',
    style,
    controls = true,
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    maxDuration
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(() => {
        return typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined';
    });
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device once mounted to choose optimal stream
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize, { passive: true });
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Remove media fragment from src if it is passed with #t=...
    const cleanDesktopSrc = src.split('#')[0];
    const cleanMobileSrc = (mobileSrc || src).split('#')[0];
    const activeSrc = isMobile && mobileSrc ? cleanMobileSrc : cleanDesktopSrc;

    useEffect(() => {
        const video = videoRef.current;
        if (!video || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                } else if (!video.paused) {
                    // Pause video when scrolled out of view to save battery and main-thread CPU
                    video.pause();
                }
            },
            { rootMargin: '350px' }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video && shouldLoad) {
            // Muted must be set directly on HTMLVideoElement to guarantee mobile autoplay permissions
            if (muted) {
                video.muted = true;
                video.defaultMuted = true;
            }
            if (autoPlay) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Fallback gracefully without throwing
                    });
                }
            }
        }
    }, [shouldLoad, autoPlay, muted, activeSrc]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (maxDuration && video.currentTime >= maxDuration) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    };

    return (
        <video
            ref={videoRef}
            src={shouldLoad ? activeSrc : undefined}
            poster={poster}
            preload={shouldLoad ? 'auto' : 'none'}
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

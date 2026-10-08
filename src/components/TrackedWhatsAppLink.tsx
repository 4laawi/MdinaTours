"use client";

import React from 'react';
import { trackLeadConversion } from '@/lib/tracking';

interface TrackedWhatsAppLinkProps {
    href: string;
    source: string;
    details?: Record<string, unknown>;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    children: React.ReactNode;
}

export default function TrackedWhatsAppLink({
    href,
    source,
    details,
    className,
    style,
    title,
    children,
}: TrackedWhatsAppLinkProps) {
    const handleClick = () => {
        trackLeadConversion(source, details);
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={className}
            style={style}
            title={title}
        >
            {children}
        </a>
    );
}

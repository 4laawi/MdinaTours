"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { initCampaignTracking } from '@/lib/tracking';

export default function CampaignTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        initCampaignTracking();
    }, [searchParams]);

    return null;
}

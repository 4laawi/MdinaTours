"use client";

import { useEffect } from 'react';
import { initCampaignTracking } from '@/lib/tracking';

export default function CampaignTracker() {
    useEffect(() => {
        initCampaignTracking();
    }, []);

    return null;
}

"use client";

import React, { useState, useRef, useEffect, useId } from 'react';
import { LOCATIONS, normalizeLocation } from '@/lib/transferLocations';
import styles from './LocationCombobox.module.css';

interface LocationComboboxProps {
    value: string;
    onChange: (val: string, isCustom?: boolean) => void;
    placeholder?: string;
    label?: string;
    language?: 'en' | 'fr';
    icon?: React.ReactNode;
    className?: string;
    onFocus?: () => void;
}

export default function LocationCombobox({
    value,
    onChange,
    placeholder = "Select or search location...",
    label,
    language = 'en',
    icon,
    className,
    onFocus
}: LocationComboboxProps) {
    const isEn = language === 'en';
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const comboboxId = useId();

    // Sync query with value prop when value changes externally
    useEffect(() => {
        setQuery(value);
    }, [value]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                // If query doesn't match value, reset query or keep typed text as custom
                if (query.trim() && query !== value) {
                    const matchedLoc = LOCATIONS.find(loc => loc.toLowerCase() === query.trim().toLowerCase());
                    if (matchedLoc) {
                        onChange(matchedLoc, false);
                    } else {
                        onChange(query.trim(), true);
                    }
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [query, value, onChange]);

    // Filter locations based on query
    const filteredLocations = React.useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return LOCATIONS;
        return LOCATIONS.filter(loc => loc.toLowerCase().includes(trimmed));
    }, [query]);

    // Exact match check
    const hasExactMatch = React.useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) return true;
        return LOCATIONS.some(loc => loc.toLowerCase() === trimmed);
    }, [query]);

    const showCustomOption = query.trim().length > 0 && !hasExactMatch;

    // Total selectable options count
    const totalOptions = filteredLocations.length + (showCustomOption ? 1 : 0);

    const handleSelectOption = (locName: string, isCustom = false) => {
        const cleanName = isCustom ? locName.trim() : normalizeLocation(locName);
        setQuery(cleanName);
        onChange(cleanName, isCustom);
        setIsOpen(false);
        setActiveIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                setIsOpen(true);
                return;
            }
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev < totalOptions - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : totalOptions - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < filteredLocations.length) {
                    handleSelectOption(filteredLocations[activeIndex], false);
                } else if (showCustomOption && (activeIndex === filteredLocations.length || activeIndex === -1)) {
                    handleSelectOption(query, true);
                } else if (filteredLocations.length > 0) {
                    handleSelectOption(filteredLocations[0], false);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setActiveIndex(-1);
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    };

    // Scroll active item into view
    useEffect(() => {
        if (isOpen && activeIndex >= 0 && listRef.current) {
            const activeElem = listRef.current.children[activeIndex] as HTMLElement;
            if (activeElem) {
                activeElem.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [activeIndex, isOpen]);

    return (
        <div className={`${styles.comboboxWrapper} ${isOpen ? styles.openWrapper : ''} ${className || ''}`} ref={containerRef}>
            <div 
                className={styles.comboboxInputContainer}
                onClick={() => {
                    inputRef.current?.focus();
                    setIsOpen(true);
                }}
            >
                <input
                    ref={inputRef}
                    id={comboboxId}
                    type="text"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-autocomplete="list"
                    aria-controls={`${comboboxId}-list`}
                    className={styles.inputField}
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setActiveIndex(0);
                    }}
                    onFocus={() => {
                        setIsOpen(true);
                        if (onFocus) onFocus();
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
            </div>

            {isOpen && (
                <div className={styles.dropdownPopover} id={`${comboboxId}-list`} ref={listRef} role="listbox">
                    {/* Filtered Locations */}
                    {filteredLocations.map((loc, idx) => {
                        const isSelected = normalizeLocation(value) === loc;
                        const isActive = idx === activeIndex;
                        const isAirport = loc.toLowerCase().includes('airport');

                        return (
                            <button
                                key={loc}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                className={`${styles.optionItem} ${isSelected ? styles.selectedOption : ''} ${isActive ? styles.activeOption : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectOption(loc, false);
                                }}
                                onMouseEnter={() => setActiveIndex(idx)}
                            >
                                <span className={styles.optionIcon}>
                                    {isAirport ? '✈️' : '📍'}
                                </span>
                                <span className={styles.optionText}>{loc}</span>
                                {isSelected && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ flexShrink: 0, color: 'var(--primary, #dc834e)' }}>
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}

                    {/* Custom Location Option Fallback */}
                    {showCustomOption && (
                        <button
                            type="button"
                            role="option"
                            aria-selected={activeIndex === filteredLocations.length}
                            className={`${styles.optionItem} ${styles.customOptionItem} ${activeIndex === filteredLocations.length ? styles.activeOption : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectOption(query, true);
                            }}
                            onMouseEnter={() => setActiveIndex(filteredLocations.length)}
                        >
                            <span className={styles.optionIcon}>✨</span>
                            <span className={styles.optionText}>
                                {isEn ? `Request custom route for "${query}"` : `Devis sur-mesure pour "${query}"`}
                            </span>
                            <span className={styles.customBadge}>
                                {isEn ? "Custom" : "Sur-mesure"}
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

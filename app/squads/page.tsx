"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { properties, formatPrice } from "@/app/lib/PropertyData";
import TopNav from "@/app/components/TopNav";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Squad Room — Comparison page with Amazon-style filter sidebar
 *
 * Filter drawer slides in from the left. Contains:
 *  - Price range (min/max slider)
 *  - Property type checkboxes
 *  - Location checkboxes
 *  - Amenities checkboxes
 *  - Guest count
 *
 * Card layout — ALWAYS horizontal:
 *  [Photo Left] | [Info Center] | [Cost Right]
 * ────────────────────────────────────────────────────────── */

interface Vote {
    hot: number;
    cold: number;
    userVote: "hot" | "cold" | null;
}

const squadMembers = [
    { name: "Rahul", avatar: properties[0].host.avatar, online: true },
    { name: "Priya", avatar: properties[1].host.avatar, online: false },
    { name: "Amit", avatar: properties[2].host.avatar, online: true },
    { name: "Sneha", avatar: properties[4].host.avatar, online: false },
];

// Amenity icon lookup
const amenityIcons: Record<string, { icon: string; color: string; label: string }> = {
    pool: { icon: "pool", color: "text-blue-400", label: "Pool" },
    wifi: { icon: "wifi", color: "text-purple-400", label: "WiFi" },
    ac_unit: { icon: "ac_unit", color: "text-cyan-400", label: "AC" },
    outdoor_grill: { icon: "outdoor_grill", color: "text-orange-400", label: "BBQ" },
    spa: { icon: "spa", color: "text-pink-400", label: "Spa" },
    restaurant: { icon: "restaurant", color: "text-amber-400", label: "Restaurant" },
    fireplace: { icon: "fireplace", color: "text-red-400", label: "Fireplace" },
    eco: { icon: "eco", color: "text-green-400", label: "Eco" },
    pets: { icon: "pets", color: "text-amber-300", label: "Pet Friendly" },
    mountain_view: { icon: "terrain", color: "text-emerald-400", label: "Mountain View" },
    hot_tub: { icon: "hot_tub", color: "text-rose-400", label: "Hot Tub" },
    garden: { icon: "yard", color: "text-lime-400", label: "Garden" },
};

/* ── Extract unique filter options from all properties ── */
const allTypes = [...new Set(properties.map((p) => p.type))].sort();
const allLocations = [...new Set(properties.map((p) => p.state))].sort();
const allAmenities = [...new Set(properties.flatMap((p) => p.amenities))].filter((a) => amenityIcons[a]).sort();
const priceMin = Math.min(...properties.map((p) => p.price));
const priceMax = Math.max(...properties.map((p) => p.price));
const guestOptions = [2, 4, 6, 8, 10];

export default function SquadsPage() {
    const shortlisted = properties.slice(0, 4);
    const friendCount = squadMembers.length;

    // ── Filter state ──
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
    const [selectedAmenities, setSelectedAmenities] = useState<Set<string>>(new Set());
    const [priceRange, setPriceRange] = useState<[number, number]>([priceMin, priceMax]);
    const [minGuests, setMinGuests] = useState(0);

    // ── Vote state ──
    const [votes, setVotes] = useState<Record<string, Vote>>(() => ({
        [shortlisted[0].id]: { hot: 4, cold: 0, userVote: "hot" },
        [shortlisted[1].id]: { hot: 2, cold: 1, userVote: null },
        [shortlisted[2].id]: { hot: 1, cold: 3, userVote: null },
        [shortlisted[3].id]: { hot: 3, cold: 1, userVote: null },
    }));

    const handleVote = (propertyId: string, voteType: "hot" | "cold") => {
        setVotes((prev) => {
            const current = prev[propertyId] || { hot: 0, cold: 0, userVote: null };
            if (current.userVote === voteType) return prev;
            const next = { ...current };
            if (current.userVote) next[current.userVote]--;
            next[voteType]++;
            next.userVote = voteType;
            return { ...prev, [propertyId]: next };
        });
    };

    /** Toggle helper for Set-based filters */
    const toggleSet = (set: Set<string>, value: string, setter: (s: Set<string>) => void) => {
        const next = new Set(set);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        setter(next);
    };

    /** Count active filters */
    const activeFilterCount = selectedTypes.size + selectedLocations.size + selectedAmenities.size
        + (priceRange[0] > priceMin || priceRange[1] < priceMax ? 1 : 0)
        + (minGuests > 0 ? 1 : 0);

    /** Clear all filters */
    const clearFilters = () => {
        setSelectedTypes(new Set());
        setSelectedLocations(new Set());
        setSelectedAmenities(new Set());
        setPriceRange([priceMin, priceMax]);
        setMinGuests(0);
    };

    /** Apply filters to shortlisted properties */
    const filtered = useMemo(() => {
        return shortlisted.filter((p) => {
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            if (selectedTypes.size > 0 && !selectedTypes.has(p.type)) return false;
            if (selectedLocations.size > 0 && !selectedLocations.has(p.state)) return false;
            if (selectedAmenities.size > 0 && !([...selectedAmenities].some((a) => p.amenities.includes(a)))) return false;
            if (minGuests > 0 && p.guests < minGuests) return false;
            return true;
        });
    }, [shortlisted, priceRange, selectedTypes, selectedLocations, selectedAmenities, minGuests]);

    const topProperty = shortlisted[0];
    const estimatedTotal = topProperty.price * 2;

    return (
        <div className="min-h-screen bg-background text-white relative">
            <TopNav />

            {/* ═══════════════════════════════════════════
             *  FILTER DRAWER — Slides from left
             * ═══════════════════════════════════════════ */}

            {/* Backdrop overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Drawer panel */}
            <aside
                className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-background-surface border-r border-white/5 z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${drawerOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Drawer header */}
                <div className="sticky top-0 bg-background-surface/95 backdrop-blur-sm p-4 border-b border-white/5 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">filter_list</span>
                        <h3 className="font-bold text-sm">Filters</h3>
                        {activeFilterCount > 0 && (
                            <span className="bg-primary text-white text-[9px] font-bold size-4 rounded-full flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="text-foreground-muted hover:text-white transition-colors p-1"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-5">

                    {/* ── Price Range ── */}
                    <div>
                        <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px]">payments</span>
                            Price Range
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-foreground-muted font-medium">
                                <span>₹{priceRange[0].toLocaleString()}</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                            </div>
                            {/* Min price slider */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] text-foreground-muted uppercase font-bold tracking-wider">Min Price</label>
                                <input
                                    type="range"
                                    min={priceMin}
                                    max={priceMax}
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])}
                                    className="w-full h-1 bg-background-elevated rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                            {/* Max price slider */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] text-foreground-muted uppercase font-bold tracking-wider">Max Price</label>
                                <input
                                    type="range"
                                    min={priceMin}
                                    max={priceMax}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])}
                                    className="w-full h-1 bg-background-elevated rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* ── Property Type ── */}
                    <div>
                        <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px]">category</span>
                            Property Type
                        </h4>
                        <div className="flex flex-col gap-2">
                            {allTypes.map((type) => (
                                <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                                    <div
                                        onClick={() => toggleSet(selectedTypes, type, setSelectedTypes)}
                                        className={`size-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${selectedTypes.has(type)
                                                ? "bg-primary border-primary"
                                                : "border-foreground-muted/30 group-hover:border-primary/50"
                                            }`}
                                    >
                                        {selectedTypes.has(type) && (
                                            <span className="material-symbols-outlined text-white text-[12px]">check</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-foreground-muted group-hover:text-white transition-colors capitalize">
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* ── Location / State ── */}
                    <div>
                        <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px]">location_on</span>
                            Location
                        </h4>
                        <div className="flex flex-col gap-2">
                            {allLocations.map((loc) => (
                                <label key={loc} className="flex items-center gap-2.5 cursor-pointer group">
                                    <div
                                        onClick={() => toggleSet(selectedLocations, loc, setSelectedLocations)}
                                        className={`size-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${selectedLocations.has(loc)
                                                ? "bg-primary border-primary"
                                                : "border-foreground-muted/30 group-hover:border-primary/50"
                                            }`}
                                    >
                                        {selectedLocations.has(loc) && (
                                            <span className="material-symbols-outlined text-white text-[12px]">check</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-foreground-muted group-hover:text-white transition-colors">
                                        {loc}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* ── Amenities ── */}
                    <div>
                        <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px]">hotel_class</span>
                            Amenities
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {allAmenities.map((amenity) => {
                                const cfg = amenityIcons[amenity];
                                if (!cfg) return null;
                                return (
                                    <button
                                        key={amenity}
                                        onClick={() => toggleSet(selectedAmenities, amenity, setSelectedAmenities)}
                                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${selectedAmenities.has(amenity)
                                                ? "bg-primary/10 border-primary/30 text-primary"
                                                : "bg-background border-white/5 text-foreground-muted hover:border-white/15 hover:text-white"
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-[12px] ${selectedAmenities.has(amenity) ? "text-primary" : cfg.color}`}>
                                            {cfg.icon}
                                        </span>
                                        {cfg.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* ── Guest Count ── */}
                    <div>
                        <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px]">groups</span>
                            Min Guests
                        </h4>
                        <div className="flex gap-1.5 flex-wrap">
                            <button
                                onClick={() => setMinGuests(0)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${minGuests === 0
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-background border-white/5 text-foreground-muted hover:border-white/15"
                                    }`}
                            >
                                Any
                            </button>
                            {guestOptions.map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setMinGuests(g)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${minGuests === g
                                            ? "bg-primary/10 border-primary/30 text-primary"
                                            : "bg-background border-white/5 text-foreground-muted hover:border-white/15"
                                        }`}
                                >
                                    {g}+
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Drawer footer — Apply & Clear */}
                <div className="sticky bottom-0 bg-background-surface/95 backdrop-blur-sm p-4 border-t border-white/5 flex gap-2">
                    <button
                        onClick={clearFilters}
                        className="flex-1 py-2 rounded-xl text-xs font-bold border border-white/10 text-foreground-muted hover:text-white hover:border-white/20 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-hover transition-colors"
                    >
                        Show {filtered.length} results
                    </button>
                </div>
            </aside>

            {/* ═════════════════════════════════════════
             *  MAIN CONTENT
             * ═════════════════════════════════════════ */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-3 sm:px-4 pb-28">
                {/* ─── Squad Header ─── */}
                <section className="py-4 border-b border-white/5 mb-4">
                    <div className="flex items-end justify-between gap-3 flex-wrap">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-primary/15 text-primary text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Active Trip
                                </span>
                                <span className="text-foreground-muted text-[10px] sm:text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[11px]">calendar_month</span>
                                    Mar 15 – 17
                                </span>
                            </div>
                            <h2 className="text-lg sm:text-2xl font-black tracking-tight">The Weekend Crew</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {squadMembers.map((m, i) => (
                                    <div key={i} className="relative">
                                        <img src={m.avatar} alt={m.name} className="size-6 sm:size-8 rounded-full border-2 border-background object-cover" />
                                        {m.online && <span className="absolute bottom-0 right-0 size-1.5 bg-green-500 border border-background rounded-full" />}
                                    </div>
                                ))}
                                <button className="size-6 sm:size-8 rounded-full border border-dashed border-foreground-muted/30 bg-background-surface flex items-center justify-center text-foreground-muted">
                                    <span className="material-symbols-outlined text-[12px]">add</span>
                                </button>
                            </div>
                            <button className="flex items-center gap-1 bg-white text-zinc-900 px-2.5 py-1 rounded-full font-bold text-[9px] sm:text-[10px]">
                                <span className="material-symbols-outlined text-[12px]">share</span>
                                Invite
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── Filter Bar (below header) ─── */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                    {/* Filter drawer toggle button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border transition-all shrink-0 ${activeFilterCount > 0
                                ? "bg-primary/10 border-primary/30 text-primary"
                                : "bg-background-surface border-white/5 text-foreground-muted hover:text-white hover:border-white/15"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[14px]">tune</span>
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="bg-primary text-white text-[8px] font-bold size-4 rounded-full flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {/* Quick filter chips — show active filters as removable tags */}
                    {priceRange[0] > priceMin && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold bg-background-surface border border-white/5 text-foreground-muted shrink-0">
                            Min ₹{priceRange[0].toLocaleString()}
                            <button onClick={() => setPriceRange([priceMin, priceRange[1]])} className="text-foreground-muted hover:text-white">
                                <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                        </span>
                    )}
                    {priceRange[1] < priceMax && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold bg-background-surface border border-white/5 text-foreground-muted shrink-0">
                            Max ₹{priceRange[1].toLocaleString()}
                            <button onClick={() => setPriceRange([priceRange[0], priceMax])} className="text-foreground-muted hover:text-white">
                                <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                        </span>
                    )}
                    {[...selectedTypes].map((t) => (
                        <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold bg-background-surface border border-white/5 text-foreground-muted shrink-0 capitalize">
                            {t}
                            <button onClick={() => toggleSet(selectedTypes, t, setSelectedTypes)} className="text-foreground-muted hover:text-white">
                                <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                        </span>
                    ))}
                    {[...selectedLocations].map((l) => (
                        <span key={l} className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold bg-background-surface border border-white/5 text-foreground-muted shrink-0">
                            {l}
                            <button onClick={() => toggleSet(selectedLocations, l, setSelectedLocations)} className="text-foreground-muted hover:text-white">
                                <span className="material-symbols-outlined text-[10px]">close</span>
                            </button>
                        </span>
                    ))}
                    {[...selectedAmenities].map((a) => {
                        const cfg = amenityIcons[a];
                        return (
                            <span key={a} className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-semibold bg-background-surface border border-white/5 text-foreground-muted shrink-0">
                                <span className={`material-symbols-outlined text-[10px] ${cfg?.color}`}>{cfg?.icon}</span>
                                {cfg?.label}
                                <button onClick={() => toggleSet(selectedAmenities, a, setSelectedAmenities)} className="text-foreground-muted hover:text-white">
                                    <span className="material-symbols-outlined text-[10px]">close</span>
                                </button>
                            </span>
                        );
                    })}
                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-primary text-[10px] font-bold shrink-0 hover:underline"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* ─── Result count ─── */}
                <p className="text-foreground-muted text-[10px] sm:text-xs mb-3">
                    Showing <span className="text-white font-bold">{filtered.length}</span> of {shortlisted.length} properties
                </p>

                {/* ─── Property Cards — ALWAYS HORIZONTAL ─── */}
                <section className="flex flex-col gap-2.5">
                    {filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <span className="material-symbols-outlined text-foreground-muted text-[40px] mb-3">search_off</span>
                            <p className="text-foreground-muted text-sm font-medium mb-1">No properties match your filters</p>
                            <button onClick={clearFilters} className="text-primary text-xs font-bold hover:underline">
                                Clear filters
                            </button>
                        </div>
                    )}

                    {filtered.map((property, idx) => {
                        const vote = votes[property.id] || { hot: 0, cold: 0, userVote: null };
                        const perPerson = Math.round((property.price * 2) / friendCount);

                        return (
                            <div
                                key={property.id}
                                className={`group bg-background-surface rounded-xl border overflow-hidden transition-all hover:shadow-lg ${idx === 0 ? "border-primary/30 ring-1 ring-primary/10" : "border-white/5 hover:border-primary/15"
                                    }`}
                            >
                                {/* Always horizontal: flex-row on ALL screens */}
                                <div className="flex flex-row h-[120px] sm:h-[140px] lg:h-[160px]">

                                    {/* ── LEFT: Photo ── */}
                                    <Link href={`/property/${property.id}`} className="w-[100px] sm:w-[160px] lg:w-[200px] shrink-0 relative overflow-hidden">
                                        <img
                                            src={property.images[0]}
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {idx === 0 && (
                                            <div className="absolute top-1.5 left-1.5 bg-yellow-400 text-yellow-900 text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                                #1
                                            </div>
                                        )}
                                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-[8px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5 text-white">
                                            <span className="material-symbols-outlined text-primary text-[8px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            {property.rating}
                                        </div>
                                    </Link>

                                    {/* ── CENTER: Info ── */}
                                    <div className="flex-1 min-w-0 border-x border-white/5 px-2.5 sm:px-3 py-2 flex flex-col justify-center gap-1">
                                        {/* Title */}
                                        <Link href={`/property/${property.id}`}>
                                            <h4 className="font-bold text-[11px] sm:text-sm leading-tight group-hover:text-primary transition-colors truncate">
                                                {property.name}
                                            </h4>
                                        </Link>

                                        {/* Location */}
                                        <p className="text-foreground-muted text-[9px] sm:text-[10px] flex items-center gap-0.5 truncate">
                                            <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
                                            {property.location}, {property.state}
                                        </p>

                                        {/* Amenity icons */}
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex items-center gap-0.5">
                                                {property.amenities.slice(0, 4).map((a) => {
                                                    const cfg = amenityIcons[a];
                                                    if (!cfg) return null;
                                                    return <span key={a} title={a} className={`material-symbols-outlined text-[10px] sm:text-[12px] ${cfg.color} opacity-60`}>{cfg.icon}</span>;
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[7px] sm:text-[8px] text-foreground-muted">
                                                {property.guests}G · {property.bedrooms}B · {property.baths}Ba
                                            </span>
                                        </div>
                                    </div>

                                    {/* ── RIGHT: Cost ── */}
                                    <div className="w-[90px] sm:w-[120px] lg:w-[140px] shrink-0 px-2 sm:px-3 py-2 flex flex-col justify-center gap-1">
                                        {/* Per night — main price */}
                                        <div>
                                            <p className="text-[7px] sm:text-[8px] text-foreground-muted uppercase font-bold tracking-wider">Per night</p>
                                            <p className="text-sm sm:text-lg lg:text-xl font-extrabold text-white leading-none">
                                                {property.currency}{property.price.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Total */}
                                        <div>
                                            <p className="text-[7px] sm:text-[8px] text-foreground-muted uppercase font-bold tracking-wider">2 nights</p>
                                            <p className="text-[10px] sm:text-xs font-bold text-white">
                                                {property.currency}{(property.price * 2).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Per person */}
                                        <div>
                                            <p className="text-[7px] sm:text-[8px] text-foreground-muted uppercase font-bold tracking-wider">Per head</p>
                                            <p className="text-[10px] sm:text-xs font-bold text-primary">
                                                {property.currency}{perPerson.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Budget tag */}
                                        <span className={`text-[7px] sm:text-[8px] font-bold flex items-center gap-0.5 ${property.price < 7000 ? "text-green-400" : property.price < 15000 ? "text-amber-400" : "text-purple-400"
                                            }`}>
                                            <span className="material-symbols-outlined text-[9px]">
                                                {property.price < 7000 ? "trending_down" : property.price < 15000 ? "trending_flat" : "trending_up"}
                                            </span>
                                            {property.price < 7000 ? "Budget" : property.price < 15000 ? "Mid" : "Premium"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Property */}
                    <div className="border border-dashed border-white/10 rounded-xl flex items-center justify-center gap-2 text-foreground-muted hover:border-primary/40 hover:text-primary transition-all cursor-pointer group h-16">
                        <div className="size-8 rounded-full bg-background-elevated flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[16px]">add_home</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-xs">Add Property</h4>
                            <p className="text-[8px] opacity-70">Browse or paste a link</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Split Bill FAB */}
            <div className="fixed bottom-24 right-3 z-40">
                <button className="flex items-center gap-1.5 bg-white text-zinc-900 px-3 py-2 rounded-full shadow-2xl hover:scale-105 transition-all font-bold animate-pulse-glow">
                    <span className="bg-primary text-white rounded-full p-0.5">
                        <span className="material-symbols-outlined text-[14px]">calculate</span>
                    </span>
                    <span className="text-[10px]">Split</span>
                    <span className="bg-zinc-200 text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                        {topProperty.currency}{estimatedTotal.toLocaleString()}
                    </span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
}

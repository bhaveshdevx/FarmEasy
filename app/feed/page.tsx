"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { properties, formatPrice, formatLikes } from "@/app/lib/PropertyData";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Feed Page — YouTube Shorts / TikTok style
 *
 * Full-screen vertical snap scroll. Each card fills the
 * entire viewport height. A small swipe snaps to the
 * next card — exactly like Shorts/Reels.
 *
 * No TopNav here — immersive full-screen experience.
 * ────────────────────────────────────────────────────────── */

const categories = [
    { label: "All Stays", icon: "auto_awesome" },
    { label: "Mountain", icon: "terrain" },
    { label: "Luxury", icon: "diamond" },
    { label: "Vineyards", icon: "wine_bar" },
    { label: "Pet Friendly", icon: "pets" },
    { label: "Eco", icon: "eco" },
];

export default function FeedPage() {
    const [activeCategory, setActiveCategory] = useState("All Stays");
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
    const [activeIndex, setActiveIndex] = useState(0);
    const [showHeart, setShowHeart] = useState<string | null>(null);
    const feedRef = useRef<HTMLDivElement>(null);
    const lastTapRef = useRef(0);

    const toggleLike = (id: string) => {
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    /** Track which card is visible */
    const handleScroll = useCallback(() => {
        const el = feedRef.current;
        if (!el) return;
        const index = Math.round(el.scrollTop / el.offsetHeight);
        setActiveIndex(index);
    }, []);

    /** Double-tap to like with heart animation */
    const handleDoubleTap = useCallback((id: string) => {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            if (!likedIds.has(id)) toggleLike(id);
            setShowHeart(id);
            setTimeout(() => setShowHeart(null), 800);
        }
        lastTapRef.current = now;
    }, [likedIds]);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-background">
            {/* ─── Category chips — floating on top ─── */}
            <div className="absolute top-0 left-0 right-0 z-30 pt-3 px-3">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => setActiveCategory(cat.label)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all backdrop-blur-md ${activeCategory === cat.label
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-black/40 text-white/70 border border-white/10 hover:bg-black/60"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[12px]">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Full-Screen Snap-Scroll Feed ─── */}
            <div
                ref={feedRef}
                onScroll={handleScroll}
                className="h-full w-full overflow-y-auto snap-y snap-mandatory"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            >
                {properties.map((property, index) => (
                    <div
                        key={property.id}
                        className="relative h-screen w-full snap-start snap-always"
                        onClick={() => handleDoubleTap(property.id)}
                    >
                        {/* Background Image — full screen */}
                        <div className="absolute inset-0 bg-zinc-900">
                            <img
                                src={property.images[0]}
                                alt={property.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                        </div>

                        {/* Double-tap heart animation */}
                        {showHeart === property.id && (
                            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                                <span
                                    className="material-symbols-outlined text-red-500 text-8xl animate-heart-pop drop-shadow-2xl"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    favorite
                                </span>
                            </div>
                        )}

                        {/* Price pill — top right */}
                        <div className="absolute top-14 right-4 z-20">
                            <div className="price-pill text-sm flex items-center gap-1">
                                <span className="font-extrabold">{formatPrice(property.price, property.currency)}</span>
                                <span className="text-white/60 text-[10px]">/night</span>
                            </div>
                        </div>

                        {/* Badge — top left */}
                        {property.badge && (
                            <div className="absolute top-14 left-4 z-20 bg-primary/90 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                                {property.badge}
                            </div>
                        )}

                        {/* ─── Info Overlay (Bottom) ─── */}
                        <div className="absolute bottom-28 left-0 right-16 px-4 z-20">
                            {/* Host */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-full border-2 border-white/30 overflow-hidden">
                                    <img src={property.host.avatar} alt={property.host.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-white/90 text-sm font-semibold">{property.host.handle}</span>
                                {property.host.isSuperhost && (
                                    <span className="bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">PRO</span>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-white text-xl font-bold leading-tight mb-1 drop-shadow-lg">
                                {property.name}
                            </h2>
                            <p className="text-white/70 text-xs flex items-center gap-1 mb-3">
                                <span className="material-symbols-outlined text-[12px]">location_on</span>
                                {property.location}, {property.state}
                                <span className="mx-1">•</span>
                                <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                {property.rating}
                            </p>

                            {/* View details CTA */}
                            <Link href={`/property/${property.id}`}>
                                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/30 flex items-center gap-2 tap-scale">
                                    View Details
                                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </button>
                            </Link>
                        </div>

                        {/* ─── Social Sidebar (Right) ─── */}
                        <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 z-20">
                            {/* Like */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleLike(property.id); }}
                                className="flex flex-col items-center gap-0.5"
                            >
                                <div className={`size-11 rounded-full flex items-center justify-center transition-all active:scale-90 ${likedIds.has(property.id)
                                        ? "bg-red-500/80 backdrop-blur-md"
                                        : "bg-white/15 backdrop-blur-md border border-white/10"
                                    }`}>
                                    <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        favorite
                                    </span>
                                </div>
                                <span className="text-white text-[9px] font-bold">
                                    {formatLikes(property.likes + (likedIds.has(property.id) ? 1 : 0))}
                                </span>
                            </button>

                            {/* Comment */}
                            <button className="flex flex-col items-center gap-0.5">
                                <div className="size-11 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
                                    <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
                                </div>
                                <span className="text-white text-[9px] font-bold">{property.comments}</span>
                            </button>

                            {/* Save */}
                            <button className="flex flex-col items-center gap-0.5">
                                <div className="size-11 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
                                    <span className="material-symbols-outlined text-[22px]">bookmark</span>
                                </div>
                                <span className="text-white text-[9px] font-bold">Save</span>
                            </button>

                            {/* Share */}
                            <button className="flex flex-col items-center gap-0.5">
                                <div className="size-11 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
                                    <span className="material-symbols-outlined text-[20px] -rotate-45 translate-x-0.5 -translate-y-0.5">send</span>
                                </div>
                                <span className="text-white text-[9px] font-bold">Share</span>
                            </button>
                        </div>

                        {/* Scroll indicator on first card */}
                        {index === 0 && (
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce">
                                <span className="material-symbols-outlined text-white/40 text-[20px]">expand_more</span>
                                <span className="text-white/30 text-[9px] font-medium">Swipe up</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Vertical progress dots */}
            <div className="fixed right-1.5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
                {properties.map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all ${i === activeIndex ? "bg-primary w-1.5 h-4" : "bg-white/25 w-1.5 h-1.5"
                            }`}
                    />
                ))}
            </div>

            <BottomNav />
        </div>
    );
}

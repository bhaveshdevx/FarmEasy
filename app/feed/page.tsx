"use client";

import { useState } from "react";
import Link from "next/link";
import { properties, formatPrice, formatLikes } from "@/app/lib/PropertyData";
import TopNav from "@/app/components/TopNav";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Feed Page — Merged discovery feed (TikTok + Explore)
 * Combines the scroll-through discovery experience
 * with category filters and interaction sidebar.
 *
 * Layout:
 *  - Category chips (horizontal scroll)
 *  - Full-height cards with info overlay + social sidebar
 *  - Trending sidebar on desktop (xl+)
 * ────────────────────────────────────────────────────────── */

const categories = [
    { label: "All Stays", icon: "auto_awesome" },
    { label: "Mountain", icon: "terrain" },
    { label: "Luxury", icon: "diamond" },
    { label: "Vineyards", icon: "wine_bar" },
    { label: "Pet Friendly", icon: "pets" },
    { label: "Eco", icon: "eco" },
    { label: "Beach", icon: "beach_access" },
];

export default function FeedPage() {
    const [activeCategory, setActiveCategory] = useState("All Stays");
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

    // Toggle like state for a property
    const toggleLike = (id: string) => {
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-background text-white">
            <TopNav />

            <main className="pb-24 max-w-[1200px] mx-auto px-4 flex flex-col xl:flex-row gap-6">
                {/* ─── Main Feed Column ─── */}
                <section className="w-full xl:max-w-[520px] xl:mx-auto flex flex-col gap-4">
                    {/* Category Chips */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pt-4 pb-1 sticky top-14 z-30 bg-background/90 backdrop-blur-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCategory(cat.label)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeCategory === cat.label
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "bg-background-surface border border-white/5 text-foreground-muted hover:text-white hover:border-white/15"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Feed Cards — Full-width 9:16 cards with overlays */}
                    <div className="flex flex-col gap-5">
                        {properties.map((property) => (
                            <article
                                key={property.id}
                                className="relative w-full aspect-[9/14] rounded-2xl overflow-hidden shadow-2xl group bg-zinc-900"
                            >
                                {/* Background image */}
                                <img
                                    src={property.images[0]}
                                    alt={property.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5" />

                                {/* Price pill — top right */}
                                <div className="absolute top-3 right-14 z-10">
                                    <div className="price-pill text-sm flex items-center gap-1">
                                        <span className="font-extrabold">{formatPrice(property.price, property.currency)}</span>
                                        <span className="text-white/60 text-[10px]">/night</span>
                                    </div>
                                </div>

                                {/* Badge — top left */}
                                {property.badge && (
                                    <div className="absolute top-3 left-3 z-10 bg-primary/90 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                                        {property.badge}
                                    </div>
                                )}

                                {/* ─── Info Overlay (Bottom) ─── */}
                                <div className="absolute bottom-0 left-0 right-14 p-4 z-10">
                                    {/* Host row */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-7 w-7 rounded-full border border-white/30 overflow-hidden">
                                            <img src={property.host.avatar} alt={property.host.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-white/80 text-xs font-semibold">{property.host.handle}</span>
                                        {property.host.isSuperhost && (
                                            <span className="bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">PRO</span>
                                        )}
                                    </div>

                                    {/* Title & location */}
                                    <h2 className="text-white text-lg font-bold leading-tight mb-1 drop-shadow-md">
                                        {property.name}
                                    </h2>
                                    <p className="text-white/70 text-xs flex items-center gap-1 mb-3">
                                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                                        {property.location}, {property.state}
                                        <span className="mx-1">•</span>
                                        <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        {property.rating}
                                    </p>

                                    {/* View details button */}
                                    <Link href={`/property/${property.id}`}>
                                        <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-lg shadow-primary/20 flex items-center gap-1.5 tap-scale">
                                            View Details
                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                        </button>
                                    </Link>
                                </div>

                                {/* ─── Interaction Sidebar (Right) ─── */}
                                <div className="absolute right-2.5 bottom-20 flex flex-col items-center gap-4 z-10">
                                    {/* Like */}
                                    <button onClick={() => toggleLike(property.id)} className="flex flex-col items-center gap-0.5">
                                        <div className={`size-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${likedIds.has(property.id)
                                                ? "bg-red-500/80 backdrop-blur-md"
                                                : "bg-white/15 backdrop-blur-md border border-white/10"
                                            }`}>
                                            <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                favorite
                                            </span>
                                        </div>
                                        <span className="text-white text-[9px] font-bold">
                                            {formatLikes(property.likes + (likedIds.has(property.id) ? 1 : 0))}
                                        </span>
                                    </button>

                                    {/* Comment */}
                                    <button className="flex flex-col items-center gap-0.5">
                                        <div className="size-10 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all hover:scale-110 active:scale-95">
                                            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                        </div>
                                        <span className="text-white text-[9px] font-bold">{property.comments}</span>
                                    </button>

                                    {/* Bookmark */}
                                    <button className="flex flex-col items-center gap-0.5">
                                        <div className="size-10 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all hover:scale-110 active:scale-95">
                                            <span className="material-symbols-outlined text-[20px]">bookmark</span>
                                        </div>
                                        <span className="text-white text-[9px] font-bold">Save</span>
                                    </button>

                                    {/* Share */}
                                    <button className="flex flex-col items-center gap-0.5">
                                        <div className="size-10 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-all hover:scale-110 active:scale-95">
                                            <span className="material-symbols-outlined text-[18px] -rotate-45 translate-x-0.5 -translate-y-0.5">send</span>
                                        </div>
                                        <span className="text-white text-[9px] font-bold">Share</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ─── Right Sidebar — Desktop (xl+) ─── */}
                <aside className="hidden xl:flex flex-col gap-5 w-72 shrink-0 h-fit sticky top-20 pt-4">
                    {/* Trending section */}
                    <div className="bg-background-surface p-4 rounded-xl border border-white/5">
                        <h3 className="font-bold text-sm mb-4">Trending Near You</h3>
                        <div className="flex flex-col gap-3">
                            {properties.slice(3, 6).map((p) => (
                                <Link href={`/property/${p.id}`} key={p.id} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="size-12 rounded-lg overflow-hidden shrink-0">
                                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs line-clamp-1 group-hover:text-primary transition-colors">{p.name}</p>
                                        <p className="text-foreground-muted text-[10px]">{p.location}</p>
                                        <p className="text-primary font-bold text-[10px] mt-0.5">
                                            {formatPrice(p.price, p.currency)}/night
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Host CTA */}
                    <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <p className="text-primary font-bold text-xs mb-1">Host your own farm stay?</p>
                        <p className="text-foreground-muted text-[10px] mb-3">
                            Start earning by sharing your space with our community.
                        </p>
                        <button className="w-full bg-background-surface text-primary border border-primary/20 py-2 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                            Learn More
                        </button>
                    </div>
                </aside>
            </main>

            <BottomNav />
        </div>
    );
}

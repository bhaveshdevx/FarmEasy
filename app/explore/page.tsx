"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { properties, formatPrice, formatLikes } from "@/app/lib/PropertyData";
import BottomNav from "@/app/components/BottomNav";

const categories = [
    { label: "All Stays", active: true },
    { label: "Mountain View", active: false },
    { label: "Luxury Barns", active: false },
    { label: "Vineyards", active: false },
    { label: "Pet Friendly", active: false },
    { label: "Eco-Certified", active: false },
];

const sidebarFilters = [
    { icon: "explore", label: "Explore", active: true },
    { icon: "pets", label: "Pet Friendly", active: false },
    { icon: "eco", label: "Organic Farms", active: false },
    { icon: "terrain", label: "Mountain View", active: false },
    { icon: "bolt", label: "Off-grid", active: false },
];

export default function ExplorePage() {
    const [activeCategory, setActiveCategory] = useState("All Stays");
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

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
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-2xl font-bold">agriculture</span>
                        <h1 className="text-lg font-bold tracking-tight">FarmEasy</h1>
                    </Link>
                    <div className="hidden md:flex flex-1 max-w-md mx-6">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-[20px]">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search farmhouses, barns, views..."
                                className="w-full bg-background-surface border border-white/5 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-primary/30 text-sm text-white placeholder-foreground-muted"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <span className="material-symbols-outlined text-foreground-muted">notifications</span>
                        </button>
                        <div className="size-8 rounded-full bg-primary/15 border border-primary/20 overflow-hidden">
                            <img
                                src={properties[0].host.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-16 pb-24 md:pb-10 max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-6 justify-center">
                {/* Left Sidebar (Desktop) */}
                <aside className="hidden lg:flex flex-col gap-5 w-56 shrink-0 h-fit sticky top-20">
                    <div className="bg-background-surface p-5 rounded-xl border border-white/5">
                        <h3 className="font-bold mb-3 px-2 text-sm">Filters</h3>
                        <nav className="flex flex-col gap-1">
                            {sidebarFilters.map((item) => (
                                <a
                                    key={item.label}
                                    href="#"
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ${item.active
                                            ? "bg-primary text-white"
                                            : "hover:bg-white/5 text-foreground-muted"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Center Feed */}
                <section className="w-full max-w-[480px] flex flex-col gap-6">
                    {/* Category Chips (Mobile) */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar lg:hidden pb-1 shrink-0 pt-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                onClick={() => setActiveCategory(cat.label)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.label
                                        ? "bg-primary text-white"
                                        : "bg-background-surface border border-white/5 text-foreground-muted hover:text-white"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Feed Cards */}
                    {properties.map((property) => (
                        <article
                            key={property.id}
                            className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl group bg-zinc-900"
                        >
                            <img
                                src={property.images[0]}
                                alt={property.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    {property.badge && (
                                        <span className="bg-primary/90 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
                                            {property.badge}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-white">{property.rating}</span>
                                    </div>
                                </div>
                                <h2 className="text-white text-xl font-bold leading-tight mb-1">
                                    {property.name}
                                </h2>
                                <p className="text-zinc-400 text-sm mb-3">
                                    {property.location}, {property.state}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-bold text-lg">
                                        {property.currency}{property.price.toLocaleString()}
                                        <span className="text-sm font-normal opacity-80">/night</span>
                                    </span>
                                    <Link href={`/property/${property.id}`}>
                                        <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/20">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Interaction Sidebar */}
                            <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
                                <button
                                    onClick={() => toggleLike(property.id)}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <div className={`size-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:bg-primary hover:scale-110 ${likedIds.has(property.id) ? "bg-primary" : ""
                                        }`}>
                                        <span
                                            className="material-symbols-outlined text-white text-[22px]"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            favorite
                                        </span>
                                    </div>
                                    <span className="text-white text-[10px] font-bold">
                                        {formatLikes(property.likes + (likedIds.has(property.id) ? 1 : 0))}
                                    </span>
                                </button>

                                <button className="flex flex-col items-center gap-1">
                                    <div className="size-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:bg-white hover:text-zinc-900 hover:scale-110">
                                        <span className="material-symbols-outlined text-[22px]">bookmark</span>
                                    </div>
                                    <span className="text-white text-[10px] font-bold">Save</span>
                                </button>

                                <button className="flex flex-col items-center gap-1">
                                    <div className="size-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:bg-white hover:text-zinc-900 hover:scale-110">
                                        <span className="material-symbols-outlined text-[22px]">share</span>
                                    </div>
                                    <span className="text-white text-[10px] font-bold">Share</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </section>

                {/* Right Sidebar (Desktop) */}
                <aside className="hidden xl:flex flex-col gap-6 w-72 shrink-0 h-fit sticky top-20">
                    <div className="bg-background-surface p-5 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-sm">Trending Near You</h3>
                            <Link href="#" className="text-primary text-xs font-bold hover:underline">See All</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {properties.slice(3, 5).map((p) => (
                                <Link
                                    href={`/property/${p.id}`}
                                    key={p.id}
                                    className="flex items-center gap-3 group cursor-pointer"
                                >
                                    <div className="size-14 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={p.images[0]}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                            {p.name}
                                        </p>
                                        <p className="text-foreground-muted text-xs">{p.location}</p>
                                        <p className="text-primary font-bold text-xs mt-0.5">
                                            {formatPrice(p.price, p.currency)}/night
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                        <p className="text-primary font-bold text-sm mb-1.5">Host your own farm stay?</p>
                        <p className="text-foreground-muted text-xs mb-3">
                            Start earning by sharing your space with our community.
                        </p>
                        <button className="w-full bg-background-surface text-primary border border-primary/20 py-2 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                            Learn More
                        </button>
                    </div>
                </aside>
            </main>

            {/* Mobile Bottom Nav */}
            <BottomNav />
        </div>
    );
}

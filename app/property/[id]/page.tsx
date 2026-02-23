"use client";

import { useState, use } from "react";
import Link from "next/link";
import { properties, formatPrice } from "@/app/lib/PropertyData";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Property Bento Details — Compact single-screen layout
 *
 * Goal: Fit everything on one mobile screen without much scrolling.
 * Smaller buttons, tighter spacing, compact bento tiles.
 *
 * Tiles: Hero | Stats | Map | Host | Amenities | Reviews | CTA
 * ────────────────────────────────────────────────────────── */

const amenityConfig: Record<string, { icon: string; label: string; color: string }> = {
    pool: { icon: "pool", label: "Pool", color: "text-blue-400" },
    wifi: { icon: "wifi", label: "Wifi", color: "text-purple-400" },
    ac_unit: { icon: "ac_unit", label: "AC", color: "text-cyan-400" },
    outdoor_grill: { icon: "outdoor_grill", label: "BBQ", color: "text-orange-400" },
    spa: { icon: "spa", label: "Spa", color: "text-pink-400" },
    restaurant: { icon: "restaurant", label: "Dining", color: "text-amber-400" },
    fireplace: { icon: "fireplace", label: "Fireplace", color: "text-red-400" },
    eco: { icon: "eco", label: "Eco", color: "text-green-400" },
    pets: { icon: "pets", label: "Pets OK", color: "text-amber-400" },
    mountain_view: { icon: "terrain", label: "View", color: "text-emerald-400" },
    hot_tub: { icon: "hot_tub", label: "Hot Tub", color: "text-rose-400" },
    garden: { icon: "yard", label: "Garden", color: "text-lime-400" },
};

export default function PropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const property = properties.find((p) => p.id === id);
    const [currentImage, setCurrentImage] = useState(0);

    // 404 fallback
    if (!property) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-5xl text-foreground-muted mb-3">search_off</span>
                    <h2 className="text-xl font-bold text-white mb-2">Not Found</h2>
                    <Link href="/" className="text-primary font-bold text-sm hover:underline">Back to Feed</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            {/* ─── Compact Header ─── */}
            <header className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="max-w-5xl mx-auto px-3 h-11 flex items-center justify-between">
                    <Link href="/feed" className="flex items-center gap-1.5 text-white">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        <span className="text-sm font-bold hidden sm:block">Back</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-full hover:bg-white/10 text-foreground-muted">
                            <span className="material-symbols-outlined text-[18px]">ios_share</span>
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-white/10 text-foreground-muted">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ─── Content — fits in viewport ─── */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-3 py-3 pb-20 flex flex-col gap-2.5">

                {/* Row 1: Hero image + quick info side-by-side on md+ */}
                <div className="flex flex-col md:flex-row gap-2.5">
                    {/* Hero Image with carousel */}
                    <div className="relative rounded-xl overflow-hidden group w-full md:w-3/5 aspect-[16/9] md:aspect-auto md:h-[260px] bg-zinc-900 shrink-0">
                        <img
                            src={property.images[currentImage]}
                            alt={property.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                        {/* Carousel dots */}
                        {property.images.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {property.images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImage(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImage ? "bg-white w-3" : "bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                        {/* Nav arrows (show on hover) */}
                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentImage((p) => (p === 0 ? property.images.length - 1 : p - 1))}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                </button>
                                <button
                                    onClick={() => setCurrentImage((p) => (p === property.images.length - 1 ? 0 : p + 1))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </>
                        )}
                        {/* Image counter */}
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                            {currentImage + 1}/{property.images.length}
                        </div>
                    </div>

                    {/* Quick Info Tile */}
                    <div className="flex-1 bg-background-surface rounded-xl border border-white/5 p-3 flex flex-col justify-between">
                        {/* Top: badges + rating */}
                        <div className="flex items-center justify-between mb-2">
                            {property.host.isSuperhost && (
                                <span className="bg-primary/15 text-primary px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                                    Superhost
                                </span>
                            )}
                            <div className="flex items-center gap-0.5 text-foreground-muted text-xs">
                                <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="font-bold text-white">{property.rating}</span>
                                <span className="text-[10px]">({property.reviewCount})</span>
                            </div>
                        </div>

                        {/* Title & location */}
                        <h1 className="text-lg md:text-xl font-extrabold leading-tight mb-1">{property.name}</h1>
                        <p className="text-foreground-muted text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[12px]">location_on</span>
                            {property.location}, {property.state}
                        </p>

                        {/* Stats row */}
                        <div className="flex gap-4 mt-3 pt-2 border-t border-white/5">
                            {[
                                { icon: "groups", val: property.guests, label: "Guests" },
                                { icon: "bed", val: property.bedrooms, label: "Beds" },
                                { icon: "bathtub", val: property.baths, label: "Baths" },
                            ].map((s) => (
                                <div key={s.label} className="flex flex-col items-center">
                                    <span className="material-symbols-outlined text-primary text-[16px]">{s.icon}</span>
                                    <span className="text-xs font-bold">{s.val}</span>
                                    <span className="text-[8px] text-foreground-muted">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2: Amenities + Map + Host — compact tiles */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {/* Amenity tiles (4 items) */}
                    {property.amenities.slice(0, 4).map((amenity) => {
                        const cfg = amenityConfig[amenity] || { icon: "check_circle", label: amenity, color: "text-white" };
                        return (
                            <div
                                key={amenity}
                                className="bg-background-surface rounded-lg border border-white/5 p-2 flex flex-col items-center justify-center gap-1 hover:bg-background-elevated transition-colors"
                            >
                                <span className={`material-symbols-outlined text-[18px] ${cfg.color}`}>{cfg.icon}</span>
                                <span className="text-[8px] font-bold text-foreground-muted text-center leading-tight">{cfg.label}</span>
                            </div>
                        );
                    })}

                    {/* Map tile — spans 2 cols on md */}
                    <div className="col-span-2 md:col-span-1 relative bg-zinc-800 rounded-lg border border-white/5 overflow-hidden min-h-[80px] cursor-pointer group">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-7 bg-primary rounded-full flex items-center justify-center shadow-md animate-bounce">
                                <span className="material-symbols-outlined text-white text-[14px]">home_pin</span>
                            </div>
                        </div>
                        <div className="absolute bottom-1 left-1 right-1">
                            <span className="block text-center text-[8px] font-bold text-foreground-muted bg-black/60 backdrop-blur-sm px-1 py-0.5 rounded">Map</span>
                        </div>
                    </div>

                    {/* Host tile — spans 2 cols on mobile */}
                    <div className="col-span-2 md:col-span-1 bg-background-surface rounded-lg border border-white/5 p-2 flex items-center gap-2">
                        <div className="relative shrink-0">
                            <img
                                src={property.host.avatar}
                                alt={property.host.name}
                                className="size-9 rounded-full object-cover border-2 border-background-surface"
                            />
                            {property.host.isSuperhost && (
                                <span className="absolute -bottom-0.5 -right-0.5 bg-primary text-white rounded-full p-[1px] border border-background-surface">
                                    <span className="material-symbols-outlined text-[8px] block">verified_user</span>
                                </span>
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold truncate">{property.host.name}</p>
                            <p className="text-[8px] text-foreground-muted">Since {property.host.joinedYear}</p>
                            <button className="text-primary text-[9px] font-bold hover:underline">Contact</button>
                        </div>
                    </div>
                </div>

                {/* Row 3: Reviews summary + View All Photos */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Reviews */}
                    <div className="bg-background-surface rounded-lg border border-white/5 p-2.5 flex items-center gap-2">
                        <div className="flex -space-x-1.5 shrink-0">
                            {[property.host.avatar, property.images[0]].map((src, i) => (
                                <img key={i} src={src} alt="" className="size-6 rounded-full border border-background-surface object-cover" />
                            ))}
                            <div className="size-6 rounded-full border border-background-surface bg-background-elevated flex items-center justify-center text-[7px] font-bold text-foreground-muted">
                                +{property.reviewCount}
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] text-foreground-muted line-clamp-1">&ldquo;Absolutely stunning...&rdquo;</p>
                            <button className="text-primary text-[9px] font-bold hover:underline">Reviews</button>
                        </div>
                    </div>

                    {/* View all photos */}
                    {property.images.length > 1 && (
                        <div className="relative rounded-lg overflow-hidden group cursor-pointer border border-white/5">
                            <img src={property.images[1]} alt="Interior" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                                <span className="text-white font-bold text-[10px] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">photo_library</span>
                                    All Photos
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ─── Sticky Bottom Booking Bar — compact ─── */}
            <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/5 py-2 px-4 z-40">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-extrabold">{property.currency}{property.price.toLocaleString()}</span>
                            <span className="text-foreground-muted text-xs">/night</span>
                        </div>
                        <p className="text-foreground-muted text-[10px] underline cursor-pointer hover:text-primary">Select dates</p>
                    </div>
                    <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-5 rounded-lg text-sm shadow-lg shadow-primary/20 transition-all tap-scale">
                        Book Now
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

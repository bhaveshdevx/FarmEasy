"use client";

import TopNav from "@/app/components/TopNav";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Map Page — Placeholder for interactive discovery map
 * TODO: Integrate Mapbox/Google Maps with property pins
 * ────────────────────────────────────────────────────────── */

export default function MapPage() {
    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            <TopNav />

            <main className="flex-1 flex items-center justify-center relative">
                {/* Dark map placeholder with grid lines */}
                <div className="absolute inset-0 bg-zinc-900">
                    <div
                        className="w-full h-full opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    {/* Radial glow for depth */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 50% 50%, rgba(236,73,19,0.08) 0%, transparent 60%)",
                        }}
                    />
                </div>

                {/* Center content */}
                <div className="relative z-10 text-center p-6">
                    <div className="size-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-4xl">map</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Interactive Map</h2>
                    <p className="text-foreground-muted text-sm max-w-xs mx-auto mb-4">
                        Explore farmhouse stays on an interactive map. Coming soon!
                    </p>
                    <div className="flex gap-2 justify-center">
                        <span className="bg-background-surface text-foreground-muted text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/5">
                            Mapbox Integration
                        </span>
                        <span className="bg-background-surface text-foreground-muted text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/5">
                            Live Pins
                        </span>
                    </div>
                </div>

                {/* Decorative floating pins */}
                <div className="absolute top-1/4 left-1/3 size-6 bg-primary/80 rounded-full flex items-center justify-center shadow-lg animate-bounce opacity-60">
                    <span className="material-symbols-outlined text-white text-[12px]">home_pin</span>
                </div>
                <div className="absolute top-2/3 right-1/4 size-5 bg-accent-blue/60 rounded-full flex items-center justify-center shadow-lg animate-bounce opacity-40" style={{ animationDelay: "0.5s" }}>
                    <span className="material-symbols-outlined text-white text-[10px]">home_pin</span>
                </div>
                <div className="absolute top-1/2 left-1/5 size-4 bg-accent-green/50 rounded-full flex items-center justify-center shadow-lg animate-bounce opacity-30" style={{ animationDelay: "1s" }}>
                    <span className="material-symbols-outlined text-white text-[8px]">home_pin</span>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}

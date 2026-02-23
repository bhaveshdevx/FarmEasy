"use client";

import { useState } from "react";
import Link from "next/link";
import { properties, formatPrice } from "@/app/lib/PropertyData";
import TopNav from "@/app/components/TopNav";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Squad Room — Collaborative voting page
 *
 * Layout:
 *  - Squad header (name, date, member bubbles)
 *  - Horizontal 3-part cards: Photo | Pricing | Details
 *  - Split Bill FAB
 *
 * Card layout (3 sections):
 *   [Photo]  |  [Price / Costs]  |  [Details + Vote]
 * ────────────────────────────────────────────────────────── */

interface Vote {
    hot: number;
    cold: number;
    userVote: "hot" | "cold" | null;
}

// Mock squad members
const squadMembers = [
    { name: "Rahul", avatar: properties[0].host.avatar, online: true },
    { name: "Priya", avatar: properties[1].host.avatar, online: false },
    { name: "Amit", avatar: properties[2].host.avatar, online: true },
    { name: "Sneha", avatar: properties[4].host.avatar, online: false },
];

export default function SquadsPage() {
    const shortlisted = properties.slice(0, 4);
    const friendCount = squadMembers.length;

    // Voting state — initialized with some seed data
    const [votes, setVotes] = useState<Record<string, Vote>>(() => ({
        [shortlisted[0].id]: { hot: 4, cold: 0, userVote: "hot" },
        [shortlisted[1].id]: { hot: 2, cold: 1, userVote: null },
        [shortlisted[2].id]: { hot: 1, cold: 3, userVote: null },
        [shortlisted[3].id]: { hot: 3, cold: 1, userVote: null },
    }));

    /**
     * Handle hot/cold vote toggle
     * - If same vote, do nothing
     * - If switching, decrement old + increment new
     */
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

    const topProperty = shortlisted[0];
    const estimatedTotal = topProperty.price * 2; // 2 nights estimate

    return (
        <div className="min-h-screen bg-background text-white relative">
            <TopNav />

            <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-28">
                {/* ─── Squad Header ─── */}
                <section className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="bg-primary/15 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    Active Trip
                                </span>
                                <span className="text-foreground-muted text-xs font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">calendar_month</span>
                                    Mar 15 – Mar 17
                                </span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">The Weekend Crew</h2>
                            <p className="text-foreground-muted text-sm">
                                Vote on your favourite stays. Top pick wins!
                            </p>
                        </div>
                        {/* Member avatars row */}
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 items-center">
                                {squadMembers.map((member, i) => (
                                    <div key={i} className="relative cursor-pointer hover:-translate-y-0.5 transition-transform">
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="size-8 rounded-full border-2 border-background object-cover"
                                        />
                                        {member.online && (
                                            <span className="absolute bottom-0 right-0 size-2 bg-green-500 border border-background rounded-full" />
                                        )}
                                    </div>
                                ))}
                                {/* Add member button */}
                                <button className="size-8 rounded-full border border-dashed border-foreground-muted/30 bg-background-surface flex items-center justify-center text-foreground-muted hover:bg-background-elevated transition-colors">
                                    <span className="material-symbols-outlined text-[14px]">add</span>
                                </button>
                            </div>
                            <button className="hidden sm:flex items-center gap-1.5 bg-white text-zinc-900 px-3 py-1.5 rounded-full font-bold text-xs hover:shadow-lg transition-all">
                                <span className="material-symbols-outlined text-[14px]">share</span>
                                Invite
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── Horizontal Property Cards ─── */}
                <section className="flex flex-col gap-3">
                    {shortlisted.map((property, idx) => {
                        const vote = votes[property.id] || { hot: 0, cold: 0, userVote: null };
                        const perPerson = Math.round((property.price * 2) / friendCount);
                        const totalVotes = vote.hot + vote.cold;
                        const hotPercent = totalVotes > 0 ? Math.round((vote.hot / totalVotes) * 100) : 50;

                        return (
                            <div
                                key={property.id}
                                className={`group bg-background-surface rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${idx === 0 ? "border-primary/30 ring-1 ring-primary/10" : "border-white/5 hover:border-primary/15"
                                    }`}
                            >
                                {/* Horizontal 3-part layout */}
                                <div className="flex flex-col sm:flex-row">
                                    {/* Section 1: Photo (left) */}
                                    <Link href={`/property/${property.id}`} className="sm:w-[180px] shrink-0">
                                        <div className="relative h-40 sm:h-full overflow-hidden">
                                            <img
                                                src={property.images[0]}
                                                alt={property.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Rank badge */}
                                            {idx === 0 && (
                                                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                                                    <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                                                    #1
                                                </div>
                                            )}
                                            {/* Rating */}
                                            <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 backdrop-blur-sm text-white font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                {property.rating}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Section 2: Pricing (center) */}
                                    <div className="flex-1 sm:border-x border-white/5 p-3 flex flex-col justify-center">
                                        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-3">
                                            <div>
                                                <p className="text-[9px] text-foreground-muted uppercase font-bold tracking-wider mb-0.5">Per night</p>
                                                <p className="text-lg font-extrabold text-white">
                                                    {property.currency}{property.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="h-px w-8 bg-white/5 hidden sm:block" />
                                            <div>
                                                <p className="text-[9px] text-foreground-muted uppercase font-bold tracking-wider mb-0.5">Total (2 nights)</p>
                                                <p className="text-sm font-bold text-white">
                                                    {property.currency}{(property.price * 2).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="h-px w-8 bg-white/5 hidden sm:block" />
                                            <div>
                                                <p className="text-[9px] text-foreground-muted uppercase font-bold tracking-wider mb-0.5">Per person</p>
                                                <p className="text-sm font-bold text-primary">
                                                    {property.currency}{perPerson.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Details + Voting (right) */}
                                    <div className="sm:w-[220px] shrink-0 p-3 flex flex-col justify-between gap-2">
                                        {/* Property info */}
                                        <div>
                                            <h4 className="font-bold text-sm leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                                                {property.name}
                                            </h4>
                                            <p className="text-foreground-muted text-[10px] mt-0.5 flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-[10px]">location_on</span>
                                                {property.location}, {property.state}
                                            </p>
                                            {/* Tags */}
                                            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                                {property.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="text-[8px] font-semibold bg-background-elevated text-foreground-muted px-1.5 py-0.5 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span className="text-[8px] font-semibold bg-background-elevated text-foreground-muted px-1.5 py-0.5 rounded">
                                                    {property.guests} guests
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hot/Cold voting row */}
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => handleVote(property.id, "hot")}
                                                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${vote.userVote === "hot"
                                                        ? "bg-primary/15 text-primary border-primary/20"
                                                        : "bg-background border-white/5 hover:border-green-500/20 text-foreground-muted"
                                                    }`}
                                            >
                                                🔥 {vote.hot}
                                            </button>
                                            <button
                                                onClick={() => handleVote(property.id, "cold")}
                                                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${vote.userVote === "cold"
                                                        ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                                                        : "bg-background border-white/5 hover:border-blue-500/20 text-foreground-muted"
                                                    }`}
                                            >
                                                🧊 {vote.cold}
                                            </button>
                                        </div>

                                        {/* Vote progress bar */}
                                        <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-500"
                                                style={{ width: `${hotPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Property — horizontal dashed card */}
                    <div className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center gap-3 text-foreground-muted hover:border-primary/40 hover:text-primary transition-all cursor-pointer group h-20">
                        <div className="size-10 rounded-full bg-background-elevated flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">add_home</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Add Property</h4>
                            <p className="text-[10px] opacity-70">Browse or paste a link</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ─── Split Bill FAB ─── */}
            <div className="fixed bottom-24 right-4 z-40">
                <button className="flex items-center gap-2 bg-white text-zinc-900 px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all font-bold group animate-pulse-glow">
                    <span className="bg-primary text-white rounded-full p-1">
                        <span className="material-symbols-outlined text-[16px]">calculate</span>
                    </span>
                    <span className="text-xs">Split Bill</span>
                    <span className="bg-zinc-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {topProperty.currency}{estimatedTotal.toLocaleString()}
                    </span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
}

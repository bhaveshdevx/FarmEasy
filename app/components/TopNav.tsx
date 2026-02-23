"use client";

import Link from "next/link";
import { properties } from "@/app/lib/PropertyData";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Logo2 from "@/public/logo2.svg";
/* ──────────────────────────────────────────────────────────
 * TopNav — Sticky top navigation bar
 * Contains: Logo | Search bar (desktop) | Notification | Profile
 * Mobile: Logo + search icon + notification + profile
 * ────────────────────────────────────────────────────────── */

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer group">
                    <Image src={Logo} alt="Logo" width={40} height={40} />
                    {/* <div className="bg-primary p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">agriculture</span>
                    </div> */}
                    <h1 className="text-lg font-extrabold tracking-tight text-primary hidden sm:block">
                        FarmEasy
                    </h1>
                </Link>

                {/* Search Bar — visible on md+ screens */}
                <div className="hidden md:flex flex-1 max-w-md">
                    <div className="relative w-full group">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted text-[18px] group-focus-within:text-primary transition-colors">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search farmhouses, locations..."
                            className="w-full bg-background-surface border border-white/5 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary/20 text-sm text-white placeholder-foreground-muted"
                        />
                    </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    {/* Mobile search icon */}
                    <button className="p-2 rounded-full hover:bg-white/5 transition-colors md:hidden">
                        <span className="material-symbols-outlined text-foreground-muted text-[20px]">search</span>
                    </button>

                    {/* Notification bell */}
                    <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-foreground-muted text-[20px]">notifications</span>
                        {/* Unread dot */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-background" />
                    </button>

                    {/* Profile avatar */}
                    <div className="h-8 w-8 rounded-full border-2 border-primary/50 p-0.5 cursor-pointer hover:border-primary transition-colors">
                        <img
                            src={properties[0].host.avatar}
                            alt="Profile"
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

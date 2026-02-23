"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ──────────────────────────────────────────────────────────
 * BottomNav — Floating pill navigation
 * Items: Home, Feed, Map, Squad
 * Active state uses filled icons + primary color accent dot
 * ────────────────────────────────────────────────────────── */

const navItems = [
    { href: "/", icon: "home", label: "Home" },
    { href: "/feed", icon: "explore", label: "Feed" },
    { href: "/map", icon: "map", label: "Map" },
    { href: "/squads", icon: "groups", label: "Squad" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 p-1.5 glass rounded-full shadow-2xl ring-1 ring-white/5">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center justify-center px-4 py-2 rounded-full transition-all ${isActive
                                    ? "bg-white/10 text-primary"
                                    : "text-foreground-muted hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-0.5">
                                <span
                                    className="material-symbols-outlined text-[20px]"
                                    style={
                                        isActive
                                            ? { fontVariationSettings: "'FILL' 1" }
                                            : undefined
                                    }
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`text-[9px] font-bold ${isActive ? "text-primary" : ""
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </div>
                            {/* Active indicator dot */}
                            {isActive && (
                                <span className="absolute top-1 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

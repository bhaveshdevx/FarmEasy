"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { properties, formatPrice } from "@/app/lib/PropertyData";
import TopNav from "@/app/components/TopNav";
import BottomNav from "@/app/components/BottomNav";

/* ──────────────────────────────────────────────────────────
 * Home Page — Landing-style
 *
 * Image slider: User swipes/drags manually. No auto-slide,
 * no buttons. Pure touch + mouse drag with snap points.
 * ────────────────────────────────────────────────────────── */

const stories = [
  { label: "Pet Friendly", img: properties[0].images[0], active: true },
  { label: "With Pools", img: properties[1].images[0], active: true },
  { label: "Vineyards", img: properties[1].images[1], active: true },
  { label: "Mountain", img: properties[3].images[0], active: true },
  { label: "Modern", img: properties[4].images[0], active: false },
  { label: "Eco-Farms", img: properties[2].images[0], active: true },
];

const features = [
  { icon: "verified_user", title: "Verified Stays", desc: "Every farmhouse is personally verified by our team." },
  { icon: "payments", title: "Best Price", desc: "No hidden fees. What you see is what you pay." },
  { icon: "groups", title: "Squad Splits", desc: "Plan with friends & split costs in one tap." },
  { icon: "eco", title: "Eco-Certified", desc: "Support sustainable & organic farm stays." },
];

/* ── Swipeable Image Slider ── */
function SwipeSlider({ images, name }: { images: string[]; name: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActive(index);
  };

  return (
    <div className="relative w-full h-full">
      {/* Horizontal scroll container — snap to each image */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full h-full shrink-0 snap-center">
            <img
              src={src}
              alt={`${name} ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all ${i === active ? "bg-white w-3.5 h-1.5" : "bg-white/40 w-1.5 h-1.5"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <TopNav />

      <main className="max-w-7xl mx-auto pb-28">
        {/* ─── Stories Bar ─── */}
        <section className="px-4 py-5">
          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
            {stories.map((story, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                <div className={`p-[3px] rounded-full ${story.active ? "story-gradient" : "bg-zinc-700"}`}>
                  <div className="bg-background p-0.5 rounded-full">
                    <img
                      src={story.img}
                      alt={story.label}
                      className={`w-14 h-14 rounded-full object-cover ${!story.active ? "grayscale opacity-50" : ""} group-hover:scale-105 transition-transform`}
                    />
                  </div>
                </div>
                <span className={`text-[10px] font-semibold ${story.active ? "text-white" : "text-foreground-muted"}`}>
                  {story.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Hero Section ─── */}
        <section className="px-4 mb-8">
          <div className="relative h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px] w-full rounded-2xl overflow-hidden group">
            <img
              src={properties[2].images[0]}
              alt="Hero farmhouse"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-5 sm:p-8 md:p-10 text-center">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight leading-tight">
                Escape the city,<br />find your field.
              </h2>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-5 max-w-xl font-medium">
                Discover unique farmhouse stays curated for your next weekend escape.
              </p>
              <Link href="/feed">
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 tap-scale">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">auto_awesome</span>
                  Discover your next escape
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Featured Properties — SWIPE IMAGE SLIDER ─── */}
        <section className="px-4 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-bold">Trending Near You</h3>
            <Link href="/feed" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              See all
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {properties.slice(0, 6).map((property) => (
              <Link href={`/property/${property.id}`} key={property.id}>
                <article className="group bg-background-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 hover-lift">
                  {/* Swipeable Image Slider */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SwipeSlider images={property.images} name={property.name} />
                    <div className="absolute top-2.5 right-2.5 price-pill text-xs sm:text-sm z-10">
                      {formatPrice(property.price, property.currency)}/night
                    </div>
                    {property.badge && (
                      <div className="absolute top-2.5 left-2.5 z-10 bg-primary/90 text-white text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                        {property.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {property.name}
                      </h4>
                      <div className="flex items-center gap-0.5 shrink-0 text-foreground-muted text-xs">
                        <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold text-white">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-xs mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">location_on</span>
                      {property.location}, {property.state}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-foreground-muted font-medium">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">groups</span>
                        {property.guests}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">bed</span>
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">bathtub</span>
                        {property.baths}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Why FarmEasy ─── */}
        <section className="px-4 mb-10">
          <h3 className="text-lg sm:text-xl font-bold mb-5 text-center">Why FarmEasy?</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-background-surface p-3 sm:p-4 rounded-xl border border-white/5 text-center flex flex-col items-center gap-2 hover:border-primary/20 transition-colors">
                <div className="bg-primary/10 text-primary p-2 sm:p-2.5 rounded-xl">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">{f.icon}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm">{f.title}</h4>
                <p className="text-foreground-muted text-[10px] sm:text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="px-4">
          <div className="bg-gradient-to-r from-primary/15 to-purple-500/10 p-5 sm:p-6 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-base sm:text-lg mb-1">Host your own farm stay</h3>
              <p className="text-foreground-muted text-xs sm:text-sm">Start earning by sharing your space with our community.</p>
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 tap-scale shrink-0">
              Become a Host
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

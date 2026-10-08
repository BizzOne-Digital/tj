"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "./hooks";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-navy"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="loader-bounce">
          <Image
            src="/brand/little-mounties-logo.png"
            alt="Little Mounties"
            width={160}
            height={160}
            priority
            className="h-32 w-32 object-contain md:h-40 md:w-40"
          />
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-electric-blue"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShotClockProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#173E7A" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#2E6BFF"
            strokeWidth="4"
            strokeDasharray={`${(progress / 100) * 264} 264`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-white">
          {Math.round(progress)}
        </span>
      </div>
    </div>
  );
}

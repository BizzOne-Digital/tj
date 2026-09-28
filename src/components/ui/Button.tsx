"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/components/motion/hooks";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-electric-blue text-white hover:bg-electric-blue/90 shadow-lg shadow-electric-blue/25",
  secondary: "bg-white text-deep-navy hover:bg-light-bg",
  outline:
    "border-2 border-white/30 text-white hover:border-electric-blue hover:text-electric-blue bg-transparent",
  ghost: "text-electric-blue hover:bg-electric-blue/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  type = "button",
  disabled,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced || typeof window === "undefined") return;
    const el = ref.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    const onTouchEnd = () => {
      el.style.transform = "";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [reduced]);

  const classes = cn(
    "relative z-0 inline-flex touch-manipulation items-center justify-center gap-2 rounded-sm font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue",
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

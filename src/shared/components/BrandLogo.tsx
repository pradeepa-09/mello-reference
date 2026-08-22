import React from "react";
import Image from "next/image";

type BrandVariant = "light" | "dark";

interface BrandMarkProps {
  variant?: BrandVariant;
  size?: number;
  className?: string;
}

export function BrandMark({
  variant = "light",
  className = "",
}: BrandMarkProps) {
  const isDark = variant === "dark";
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`.trim()}
      aria-hidden="true"
    >
      <Image
        src={isDark ? "/brand/mello-inline-logo-dark.png" : "/brand/mello-inline-logo.png"}
        alt=""
        width={38}
        height={13}
        className="w-auto h-3.5 object-contain"
        priority
      />
    </span>
  );
}

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-sans font-bold text-[18px] tracking-tight select-none">
      <Image
        src={inverse ? "/brand/mello-inline-logo.png" : "/brand/mello-inline-logo-dark.png"}
        alt="Mello"
        width={42}
        height={14}
        className="w-auto h-4 object-contain"
        priority
      />
      <span style={{ color: inverse ? "#ffffff" : "#111111" }} className="font-semibold">
        Mello
      </span>
    </span>
  );
}

import { useState } from "react";
import logoSvg from "@/assets/images/Jugendforum_Logo.svg";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center transition-transform duration-300 ${
        isHovered ? "scale-110" : "scale-100"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      {/* Animated Background Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-brand-yellow blur-sm transition-opacity duration-300 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      />

      {/* Logo Image */}
      <img
        src={logoSvg}
        alt="Jugendforum Grafing Logo"
        className="relative z-10 w-full h-full object-contain"
        style={{
          filter: isHovered ? "drop-shadow(0 0 8px rgba(255, 195, 0, 0.8))" : "none",
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
}

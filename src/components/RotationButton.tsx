import React, { useState } from 'react';

export interface RotationButtonProps {
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  invertedIcon?: React.ReactNode;
}

/**
 * RotationButton
 * Faithfully implements the 3D rotating pill button from Framer:
 * https://framer.com/m/Rotation-Button-67MDY7.js@mWfeuX5iBof1RV7iAqol
 * 
 * Features:
 * - Arm 1: Normal text swings up and out (+25deg) on hover.
 * - Arm 2: White pill background rotates in from below (-18deg -> 0deg) with unblur and spring bounce.
 * - Arm 3: Inverted high-contrast text rotates in (-35deg -> 0deg) and scales up (0.6 -> 1) with slight spring delay.
 */
export const RotationButton: React.FC<RotationButtonProps> = ({
  title,
  href,
  onClick,
  className = '',
  target,
  rel,
  icon,
  invertedIcon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group relative inline-flex items-center justify-center h-[30px] px-3.5 rounded-full cursor-pointer overflow-hidden select-none transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 0. Invisible Helper Text: Locks width to natural text + icon size */}
      <span
        className="invisible pointer-events-none select-none flex items-center gap-1.5 text-xs font-semibold px-0.5"
        aria-hidden="true"
      >
        <span>{title}</span>
        {icon && <span className="inline-block shrink-0">{icon}</span>}
      </span>

      {/* 3D Space Container */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Arm 1: Default Text (Light zinc on dark, swings up +25deg on hover) */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-1.5 px-3.5 transition-all ease-out"
          style={{
            transformOrigin: '100% 50%',
            transform: isHovered
              ? 'rotate(25deg) translateY(-8px) scale(0.95)'
              : 'rotate(0deg) translateY(0px) scale(1)',
            opacity: isHovered ? 0 : 1,
            transition:
              'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease-out',
          }}
        >
          <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
            {title}
          </span>
          {icon && (
            <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0">
              {icon}
            </span>
          )}
        </div>

        {/* Arm 2: Pill Fill (Pill background, swings up from -18deg with unblur) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all ease-out"
          style={{
            transformOrigin: '100% 100%',
            transform: isHovered
              ? 'rotate(0deg) scale(1)'
              : 'rotate(-18deg) scale(0.88) translateY(6px)',
            opacity: isHovered ? 1 : 0,
            filter: isHovered ? 'blur(0px)' : 'blur(2px)',
            transition:
              'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.28s ease-out, filter 0.28s ease-out',
          }}
        >
          <div className="rotation-pill-bg w-full h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
        </div>

        {/* Arm 3: Inverted Text (Swings up from -35deg, scale 0.6 -> 1) */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-1.5 px-3.5 pointer-events-none transition-all ease-out"
          style={{
            transformOrigin: '100% 50%',
            transform: isHovered
              ? 'rotate(0deg) scale(1)'
              : 'rotate(-35deg) scale(0.6) translateY(8px)',
            opacity: isHovered ? 1 : 0,
            transition:
              'transform 0.48s cubic-bezier(0.25, 1.4, 0.5, 1) 0.025s, opacity 0.22s ease-out 0.025s',
          }}
        >
          <span className="rotation-pill-text text-xs font-semibold text-[#050507]">
            {title}
          </span>
          {invertedIcon ? (
            <span className="rotation-pill-icon text-[#050507] shrink-0">{invertedIcon}</span>
          ) : icon ? (
            <span className="rotation-pill-icon text-[#050507] shrink-0">{icon}</span>
          ) : null}
        </div>
      </div>
    </Tag>
  );
};

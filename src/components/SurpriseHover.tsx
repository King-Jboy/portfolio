import React, { useState, useRef, useEffect } from 'react';

export interface SurpriseHoverProps {
  children: React.ReactNode;
  tags?: string[];
  subtitle?: string;
  images?: string[];
  className?: string;
  badgeClassName?: string;
  underline?: boolean;
}

export const SurpriseHover: React.FC<SurpriseHoverProps> = ({
  children,
  tags = ['200 Level', 'Cybersecurity', 'Started 2025'],
  subtitle,
  images,
  className = '',
  badgeClassName = '',
  underline = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Close on click outside (useful for mobile touch interaction)
  useEffect(() => {
    if (!isActive) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isActive]);

  // Framer Surprise-Hover layout coordinates and staggered rotations
  const tagLayouts = [
    { x: -55, y: -42, rotate: -7, delay: 0 },
    { x: 25, y: -50, rotate: 14, delay: 90 },
    { x: 80, y: -36, rotate: -5, delay: 170 },
    { x: -20, y: 36, rotate: 6, delay: 240 },
  ];

  return (
    <span
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      className={`relative inline-block cursor-pointer select-none group/surprise ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={(e) => {
        // If an anchor was clicked inside children, let it navigate normally
        if ((e.target as HTMLElement).tagName !== 'A') {
          setIsActive((prev) => !prev);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsActive((prev) => !prev);
        }
      }}
    >
      {/* Target Content */}
      <span
        className={`relative z-10 transition-colors duration-200 ${
          isActive ? 'text-white' : ''
        } ${
          underline
            ? 'underline decoration-white/20 hover:decoration-white/50 decoration-dotted underline-offset-4'
            : ''
        }`}
      >
        {children}
      </span>

      {/* Surprise Floating Elements Layer */}
      <span
        className="absolute inset-0 pointer-events-none z-30 overflow-visible"
        aria-hidden="true"
      >
        {/* Optional Floating Preview Images (matching Framer Image 1 & 2) */}
        {images && images.length > 0 && (
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isActive
                ? 'translate(-50%, -105px) scale(1)'
                : 'translate(-50%, -40px) scale(0.6)',
              opacity: isActive ? 1 : 0,
            }}
          >
            <span className="relative block w-28 h-18 rounded-md overflow-hidden border border-white/20 shadow-2xl shadow-black/80 bg-zinc-900">
              {images[1] && (
                <img
                  src={images[1]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover origin-bottom-left transition-transform duration-300"
                  style={{
                    transform: isActive ? 'rotate(6deg) translate(8px, -4px)' : 'rotate(0deg)',
                  }}
                />
              )}
              <img
                src={images[0]}
                alt=""
                className="relative z-10 w-full h-full object-cover"
              />
            </span>
          </span>
        )}

        {/* Floating Surprise Tags */}
        {tags.map((tag, idx) => {
          const layout = tagLayouts[idx % tagLayouts.length];
          return (
            <span
              key={tag}
              style={{
                transform: isActive
                  ? `translate(${layout.x}%, ${layout.y}px) rotate(${layout.rotate}deg) scale(1)`
                  : 'translate(0%, -10px) rotate(0deg) scale(0.6)',
                opacity: isActive ? 1 : 0,
                transition: `transform 320ms cubic-bezier(0.16, 1, 0.3, 1) ${layout.delay}ms, opacity 240ms ease ${layout.delay}ms`,
              }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-tight bg-[#090a0f]/95 text-zinc-100 border border-white/20 shadow-xl shadow-black/90 backdrop-blur-md ${badgeClassName}`}
            >
              {tag}
            </span>
          );
        })}

        {/* Subtitle / "Learn more" prompt beneath (matching Framer component) */}
        {subtitle && (
          <span
            style={{
              transform: isActive ? 'translate(-50%, 100%)' : 'translate(-50%, 50%)',
              opacity: isActive ? 1 : 0,
              transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, opacity 220ms ease 120ms',
            }}
            className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium text-sky-400 bg-black/95 px-2 py-0.5 rounded border border-sky-500/30 shadow-lg shadow-black/80"
          >
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
};

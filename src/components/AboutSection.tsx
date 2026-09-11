import React, { useRef, useEffect, useState, useCallback } from 'react';

interface AboutContentProps {
  illuminated?: boolean;
}

const AboutContent: React.FC<AboutContentProps> = ({ illuminated = false }) => {
  return (
    <div className="py-14 sm:py-24 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 sm:mb-14">
        <div>
          <h2
            className={`text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300 ${
              illuminated
                ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.65)]'
                : 'text-zinc-600'
            }`}
          >
            About me
          </h2>
        </div>
        <p
          className={`text-xs sm:text-sm max-w-sm font-normal transition-colors duration-300 ${
            illuminated ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          A genuine snapshot of where I am in my studies and journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Honest Personal Narrative */}
        <div
          className={`md:col-span-7 space-y-5 text-sm sm:text-base leading-relaxed font-normal transition-colors duration-300 ${
            illuminated
              ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]'
              : 'text-[#484a52]'
          }`}
        >
          <p>
            I'm an 18-year-old student currently in my 200 level (second year) studying Cybersecurity at Babcock University in Nigeria.
          </p>
          <p>
            I got into university in 2025. I've always had a natural curiosity about how computers and networks operate, so choosing cybersecurity felt like the right path. Right now, I'm taking things step-by-step: building strong foundational habits, getting comfortable in Linux, writing scripts in Python, and understanding how data moves across networks.
          </p>
          <p>
            I'm definitely at the start of my journey rather than having years of deep expertise. What I bring is curiosity, a strong work ethic, and a genuine drive to learn ethical hacking, penetration testing, and robotics &amp; AI engineering as I progress through my degree.
          </p>
        </div>

        {/* Right Column: Key Details */}
        <div className="md:col-span-5 space-y-6 text-xs">
          {/* Education block */}
          <div
            className={`pb-5 border-b transition-colors duration-300 ${
              illuminated ? 'border-white/20' : 'border-white/[0.04]'
            }`}
          >
            <span
              className={`uppercase tracking-wider block mb-2 font-medium transition-colors duration-300 ${
                illuminated ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Education
            </span>
            <div
              className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                illuminated
                  ? 'text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.45)]'
                  : 'text-zinc-500'
              }`}
            >
              Babcock University, Nigeria
            </div>
            <div
              className={`transition-colors duration-300 ${
                illuminated ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              B.Sc. Cybersecurity &middot; 200 Level Undergraduate
            </div>
            <div
              className={`mt-1 transition-colors duration-300 ${
                illuminated ? 'text-zinc-400' : 'text-zinc-700'
              }`}
            >
              Started university in 2025
            </div>
          </div>

          {/* Certification block */}
          <div
            className={`pb-5 border-b transition-colors duration-300 ${
              illuminated ? 'border-white/20' : 'border-white/[0.04]'
            }`}
          >
            <span
              className={`uppercase tracking-wider block mb-2 font-medium transition-colors duration-300 ${
                illuminated ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Certification
            </span>
            <div
              className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                illuminated
                  ? 'text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.45)]'
                  : 'text-zinc-500'
              }`}
            >
              NVIDIA Deep Learning Institute — Certification
            </div>
            <div
              className={`font-sans text-xs transition-colors duration-300 ${
                illuminated ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              Completed introductory coursework covering fundamentals of accelerated computing and deep learning.
            </div>
          </div>

          {/* Attitude */}
          <div>
            <span
              className={`uppercase tracking-wider block mb-2 font-medium transition-colors duration-300 ${
                illuminated ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              Current Mindset
            </span>
            <p
              className={`font-sans text-xs leading-relaxed transition-colors duration-300 ${
                illuminated ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              Humble about what I don't know yet, curious about how things work, and eager to learn through labs, books, and code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const posRef = useRef({
    x: 200,
    y: 120,
    targetX: 200,
    targetY: 120,
    active: false,
  });

  // RAF loop for buttery-smooth physical spring motion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const tick = () => {
      const dx = posRef.current.targetX - posRef.current.x;
      const dy = posRef.current.targetY - posRef.current.y;

      posRef.current.x += dx * 0.16;
      posRef.current.y += dy * 0.16;

      const x = Math.round(posRef.current.x * 10) / 10;
      const y = Math.round(posRef.current.y * 10) / 10;

      container.style.setProperty('--spotlight-x', `${x}px`);
      container.style.setProperty('--spotlight-y', `${y}px`);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    posRef.current.targetX = e.clientX - rect.left;
    posRef.current.targetY = e.clientY - rect.top;
    if (!isHovered) setIsHovered(true);
  }, [isHovered]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    posRef.current.targetX = x;
    posRef.current.targetY = y;

    if (!posRef.current.active) {
      posRef.current.x = x;
      posRef.current.y = y;
      posRef.current.active = true;
    }
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    posRef.current.targetX = touch.clientX - rect.left;
    posRef.current.targetY = touch.clientY - rect.top;
    if (!isHovered) setIsHovered(true);
  }, [isHovered]);

  return (
    <section
      id="about"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      className="relative z-10 border-t border-white/[0.06] overflow-hidden select-text cursor-default"
      style={
        {
          '--spotlight-x': '250px',
          '--spotlight-y': '120px',
        } as React.CSSProperties
      }
      aria-label="About Maduabuna Josiah"
    >
      {/* 1. Flashlight Beam Light Glow (Underneath Content) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0.22,
          background: `
            radial-gradient(380px circle at var(--spotlight-x) var(--spotlight-y), rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 42%, transparent 75%),
            radial-gradient(170px circle at var(--spotlight-x) var(--spotlight-y), rgba(255, 255, 255, 0.09) 0%, transparent 60%),
            radial-gradient(80px circle at var(--spotlight-x) var(--spotlight-y), rgba(56, 189, 248, 0.06) 0%, transparent 70%)
          `,
        }}
      />

      {/* 2. Top Border Spotlight Reveal */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px transition-opacity duration-700 ease-out z-10"
        style={{
          opacity: isHovered ? 1 : 0.3,
          background: `radial-gradient(280px circle at var(--spotlight-x) 0px, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)`,
        }}
      />

      {/* 3. Base Content Layer (Dark Unlit Room, fully accessible and selectable) */}
      <div className="relative z-0">
        <AboutContent illuminated={false} />
      </div>

      {/* 4. Illuminated Content Layer (Flashlight Mask Overlay) */}
      <div
        className="pointer-events-none select-none absolute inset-0 transition-opacity duration-500 ease-out z-10"
        style={{
          opacity: isHovered ? 1 : 0.3,
          WebkitMaskImage: `radial-gradient(310px circle at var(--spotlight-x) var(--spotlight-y), black 0%, black 25%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)`,
          maskImage: `radial-gradient(310px circle at var(--spotlight-x) var(--spotlight-y), black 0%, black 25%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)`,
        }}
        aria-hidden="true"
      >
        <AboutContent illuminated={true} />
      </div>
    </section>
  );
};


import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sparkles, Network } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  theme: 'light' | 'blue' | 'dark';
  icon: React.ReactNode;
}

const CARDS: CardData[] = [
  {
    id: 'eh',
    title: 'Ethical Hacking',
    description:
      'Learning offensive fundamentals: understanding how attackers find weaknesses in systems and networks, and how proactive security testing protects infrastructure.',
    tags: ['Security Basics', 'Reconnaissance', 'Vulnerabilities'],
    theme: 'light',
    icon: <Shield className="w-5 h-5 text-zinc-900" />,
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    description:
      'Practicing step-by-step security testing in virtual labs: port scanning, service enumeration, spotting common misconfigurations, and drafting findings.',
    tags: ['Network Auditing', 'Port Scanning', 'Virtual Labs'],
    theme: 'blue',
    icon: <Network className="w-5 h-5 text-white" />,
  },
  {
    id: 'robotics',
    title: 'Robotics & AI Engineering',
    description:
      'Fascinated by autonomous hardware, robotics, and applied intelligence. Exploring how AI models and embedded controllers interface with the physical world.',
    tags: ['Embedded Systems', 'Deep Learning', 'Autonomous Systems'],
    theme: 'dark',
    icon: <Sparkles className="w-5 h-5 text-zinc-300" />,
  },
];

export const ThreeDSplitCards: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [mobileActive, setMobileActive] = useState(1); // Default to center card on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Swipe & Drag Gesture State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    // Detect gesture intention: horizontal swipe vs vertical page scroll
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      // Resistance on edges
      let offset = diffX;
      if (mobileActive === 0 && diffX > 0) {
        offset = diffX * 0.35;
      } else if (mobileActive === CARDS.length - 1 && diffX < 0) {
        offset = diffX * 0.35;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current) return;

    if (isHorizontalSwipeRef.current) {
      const threshold = 40; // minimum pixels to advance
      if (dragOffset < -threshold) {
        // Swiped left -> advance
        setMobileActive((prev) => Math.min(prev + 1, CARDS.length - 1));
      } else if (dragOffset > threshold) {
        // Swiped right -> retreat
        setMobileActive((prev) => Math.max(prev - 1, 0));
      }
    }

    touchStartRef.current = null;
    isHorizontalSwipeRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse drag handlers for desktop emulators
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    touchStartRef.current = { x: e.clientX, y: e.clientY };
    isHorizontalSwipeRef.current = true;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !touchStartRef.current) return;
    setDragOffset(e.clientX - touchStartRef.current.x);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      handleTouchEnd();
    }
  };

  return (
    <div className="w-full py-1 sm:py-4 select-none">

      {/* 3D Split Canvas with Swipe Support */}
      <div
        className="relative flex items-center justify-center min-h-[375px] sm:min-h-[470px] cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1200px',
          touchAction: 'pan-y', // allows vertical scroll while intercepting horizontal swipe
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => {
          if (isDragging) handleTouchEnd();
          setIsContainerHovered(false);
          setHoveredCard(null);
        }}
      >
        {CARDS.map((card, index) => {
          const isHovered = hoveredCard === index;
          const isMobileActive = mobileActive === index;

          // Desktop transforms (deck split on hover)
          let desktopTransform = '';
          let zIndex = 10;

          if (index === 0) {
            // Left Card
            if (isHovered) {
              desktopTransform = 'translateX(-210px) translateY(-18px) rotate(0deg) scale(1.05)';
              zIndex = 30;
            } else if (isContainerHovered) {
              desktopTransform = 'translateX(-190px) translateY(-6px) rotate(-4deg) scale(0.98)';
              zIndex = 15;
            } else {
              desktopTransform = 'translateX(-75px) translateY(8px) rotate(-6deg) scale(0.96)';
              zIndex = 10;
            }
          } else if (index === 1) {
            // Center Card (Blue)
            if (isHovered) {
              desktopTransform = 'translateX(0px) translateY(-26px) rotate(0deg) scale(1.06)';
              zIndex = 30;
            } else if (isContainerHovered) {
              desktopTransform = 'translateX(0px) translateY(-14px) rotate(0deg) scale(1.01)';
              zIndex = 25;
            } else {
              desktopTransform = 'translateX(0px) translateY(-4px) rotate(0deg) scale(1)';
              zIndex = 20;
            }
          } else {
            // Right Card
            if (isHovered) {
              desktopTransform = 'translateX(210px) translateY(-18px) rotate(0deg) scale(1.05)';
              zIndex = 30;
            } else if (isContainerHovered) {
              desktopTransform = 'translateX(190px) translateY(-6px) rotate(4deg) scale(0.98)';
              zIndex = 15;
            } else {
              desktopTransform = 'translateX(75px) translateY(8px) rotate(6deg) scale(0.96)';
              zIndex = 10;
            }
          }

          // Mobile transforms with live swipe drag physics
          let mobileTransform = '';
          let mobileZIndex = 10;
          let mobileOpacity = 1;
          const liveX = isMobileActive ? dragOffset * 0.85 : dragOffset * 0.25;
          const liveRotate = isMobileActive ? dragOffset * 0.06 : 0;
          const diff = index - mobileActive;

          if (diff === 0) {
            mobileTransform = `translateX(${liveX}px) translateY(-8px) rotate(${liveRotate}deg) scale(1)`;
            mobileZIndex = 30;
            mobileOpacity = 1;
          } else if (diff === -1 || (mobileActive === 2 && index === 0)) {
            const offsetX = -22 + liveX;
            mobileTransform = `translateX(${offsetX}px) translateY(8px) rotate(-3.5deg) scale(0.92)`;
            mobileZIndex = 15;
            mobileOpacity = 0.65;
          } else {
            const offsetX = 22 + liveX;
            mobileTransform = `translateX(${offsetX}px) translateY(8px) rotate(3.5deg) scale(0.92)`;
            mobileZIndex = 15;
            mobileOpacity = 0.65;
          }

          // Theme styling matching reference
          let cardStyle = '';
          let textSecondary = '';
          let tagStyle = '';

          if (card.theme === 'light') {
            cardStyle = 'bg-[#ebebef] text-zinc-900 shadow-2xl shadow-black/60 border border-black/5';
            textSecondary = 'text-zinc-700';
            tagStyle = 'bg-black/[0.06] text-zinc-800 border border-black/10';
          } else if (card.theme === 'blue') {
            cardStyle = 'bg-[#1d4ed8] text-white shadow-2xl shadow-blue-950/70 border border-blue-400/20';
            textSecondary = 'text-blue-100/90';
            tagStyle = 'bg-white/10 text-white border border-white/15';
          } else {
            cardStyle = 'split-card-dark bg-[#111217] text-white shadow-2xl shadow-black/80 border border-white/[0.09]';
            textSecondary = 'text-zinc-400';
            tagStyle = 'bg-white/[0.04] text-zinc-300 border border-white/[0.07]';
          }

          const activeTransform = isMobile ? mobileTransform : desktopTransform;
          const activeZIndex = isMobile ? mobileZIndex : (isHovered ? 35 : zIndex);

          return (
            <div
              key={card.id}
              onClick={() => {
                if (isMobile && !isDragging) {
                  setMobileActive(index);
                }
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: activeTransform,
                zIndex: activeZIndex,
                opacity: isMobile ? mobileOpacity : 1,
                transition: isDragging
                  ? 'none'
                  : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms ease, box-shadow 450ms ease',
              }}
              className={`absolute w-[calc(100vw-64px)] max-w-[305px] sm:w-[305px] md:w-[325px] h-[360px] sm:h-[415px] p-5 sm:p-7 rounded-3xl flex flex-col justify-between cursor-pointer ${cardStyle}`}
            >
              <div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-8 sm:mb-10">
                  {card.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-3">
                  {card.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${textSecondary}`}>
                  {card.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium ${tagStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeDSplitCards;

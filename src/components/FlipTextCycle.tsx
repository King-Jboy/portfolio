import React, { useEffect, useRef, useState, useId, useMemo, useCallback } from 'react';

export interface FlipTextItem {
  text: string;
  color?: string;
}

export interface FlipTextCycleProps {
  texts: (string | FlipTextItem)[];
  cycleDelay?: number; // seconds between cycle flips (default 2.0)
  flipDuration?: number; // duration of each letter flip in seconds (default 0.35)
  staggerDelay?: number; // stagger delay between letters in seconds (default 0.02)
  className?: string;
  onIndexChange?: (index: number) => void;
  interactive?: boolean; // default false, runs on its own
  pauseOnHover?: boolean; // default false
}

export const FlipTextCycle: React.FC<FlipTextCycleProps> = ({
  texts,
  cycleDelay = 2.0,
  flipDuration = 0.35,
  staggerDelay = 0.02,
  className = '',
  onIndexChange,
  interactive = false,
  pauseOnHover = false,
}) => {
  const normalizedTexts = useMemo<FlipTextItem[]>(() => {
    return texts.map((t) => (typeof t === 'string' ? { text: t } : t));
  }, [texts]);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cycleId, setCycleId] = useState(0);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const safeId = useMemo(() => reactId.replace(/[^a-zA-Z0-9_-]/g, '-'), [reactId]);

  const indexRef = useRef(0);
  const textsRef = useRef(normalizedTexts);
  const cycleDelayRef = useRef(cycleDelay);
  const flipDurationRef = useRef(flipDuration);
  const staggerDelayRef = useRef(staggerDelay);

  const animTimeoutRef = useRef<number | null>(null);
  const gapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    textsRef.current = normalizedTexts;
    if (indexRef.current >= normalizedTexts.length) {
      indexRef.current = 0;
      setCurrentTextIndex(0);
      onIndexChange?.(0);
    }
  }, [normalizedTexts, onIndexChange]);

  useEffect(() => {
    cycleDelayRef.current = cycleDelay;
  }, [cycleDelay]);

  useEffect(() => {
    flipDurationRef.current = flipDuration;
  }, [flipDuration]);

  useEffect(() => {
    staggerDelayRef.current = staggerDelay;
  }, [staggerDelay]);

  // Viewport detection to pause when completely offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const clearTimers = useCallback(() => {
    if (animTimeoutRef.current) {
      clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    if (gapTimeoutRef.current) {
      clearTimeout(gapTimeoutRef.current);
      gapTimeoutRef.current = null;
    }
  }, []);

  const advanceNext = useCallback(() => {
    clearTimers();
    setIsAnimating(false);
    window.setTimeout(() => {
      const next = (indexRef.current + 1) % textsRef.current.length;
      indexRef.current = next;
      setCurrentTextIndex(next);
      onIndexChange?.(next);
      setCycleId((id) => id + 1);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scheduleNext();
        });
      });
    }, 200);
  }, [clearTimers, onIndexChange]);

  const scheduleNext = useCallback(() => {
    clearTimers();
    setIsAnimating(true);
    const current = textsRef.current[indexRef.current];
    const letterCount = current?.text?.length ?? 0;
    const totalDurationSec = Math.max(0, (letterCount - 1) * staggerDelayRef.current + flipDurationRef.current);

    animTimeoutRef.current = window.setTimeout(() => {
      gapTimeoutRef.current = window.setTimeout(() => {
        advanceNext();
      }, cycleDelayRef.current * 1000);
    }, totalDurationSec * 1000);
  }, [clearTimers, advanceNext]);

  useEffect(() => {
    if (normalizedTexts.length === 0) return;
    if (!isInViewport || (pauseOnHover && isHovered)) {
      clearTimers();
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scheduleNext();
      });
    });

    return () => clearTimers();
  }, [normalizedTexts.length, isInViewport, pauseOnHover, isHovered, scheduleNext, clearTimers]);

  const currentText = normalizedTexts[currentTextIndex];

  // Split into words and spaces to preserve natural line wrapping
  const tokens = useMemo(() => {
    return currentText?.text ? currentText.text.split(/(\s+)/) : [];
  }, [currentText?.text]);

  const renderedContent = useMemo(() => {
    let letterCounter = 0;
    return tokens.map((token, tIndex) => {
      const isSpace = token.trim() === '';
      if (isSpace) {
        return <span key={`${currentTextIndex}-${cycleId}-sp-${tIndex}`}>&nbsp;</span>;
      }
      return (
        <span
          key={`${currentTextIndex}-${cycleId}-w-${tIndex}`}
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
        >
          {token.split('').map((letter, lIndex) => {
            const globalIndex = letterCounter++;
            return (
              <span
                key={`${currentTextIndex}-${cycleId}-${tIndex}-${lIndex}`}
                className={`flip-letter-${safeId} ${isAnimating ? 'animate' : ''}`}
                style={{
                  transitionDelay: isAnimating ? `${globalIndex * staggerDelay}s` : '0s',
                }}
              >
                {letter}
              </span>
            );
          })}
        </span>
      );
    });
  }, [tokens, currentTextIndex, cycleId, isAnimating, safeId, staggerDelay]);

  return (
    <>
      <style>{`
        .flip-text-container-${safeId} {
          perspective: 1000px;
          display: inline-flex;
          align-items: baseline;
          transform-style: preserve-3d;
        }
        .flip-text-${safeId} {
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
          transform-style: preserve-3d;
        }
        .flip-letter-${safeId} {
          display: inline-block;
          transform-style: preserve-3d;
          transition: transform ${flipDuration}s cubic-bezier(0.23, 1, 0.32, 1), opacity ${flipDuration}s ease-in-out;
          transform: rotateY(90deg);
          opacity: 0;
          color: ${currentText?.color || 'currentColor'};
        }
        .flip-letter-${safeId}.animate {
          transform: rotateY(0deg);
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .flip-letter-${safeId} {
            transform: none !important;
            transition: opacity 0.2s ease !important;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`flip-text-container-${safeId} ${interactive ? 'cursor-pointer select-none' : ''} ${className}`}
        onClick={interactive ? advanceNext : undefined}
        onMouseEnter={pauseOnHover ? () => setIsHovered(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setIsHovered(false) : undefined}
      >
        <span className={`flip-text-${safeId}`}>{renderedContent}</span>
      </div>
    </>
  );
};

export default FlipTextCycle;

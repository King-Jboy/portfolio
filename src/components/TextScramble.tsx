import React, { useEffect, useRef, useState, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  scrambleColor?: string;
  characters?: string;
  scrambledLetters?: number;
  duration?: number;
  delay?: number;
  trigger?: 'appear' | 'inView';
  replayOnHover?: boolean;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  as: Component = 'span',
  className = '',
  scrambleColor = '#38bdf8', // Cyber cyan accent
  characters = DEFAULT_CHARS,
  scrambledLetters = 8,
  duration = 1.1,
  delay = 0.1,
  trigger = 'appear',
  replayOnHover = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const randomCharsRef = useRef<string>('');
  const animFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Generate random characters preserving spaces
  const generateRandomString = useCallback(() => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ' || char === '\n' || char === '\t') {
        result += char;
      } else {
        result += characters[Math.floor(Math.random() * characters.length)];
      }
    }
    return result;
  }, [text, characters]);

  const startAnimation = useCallback(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      setIsCompleted(true);
      return;
    }

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setProgress(0);
    setIsCompleted(false);
    randomCharsRef.current = generateRandomString();

    const startTime = performance.now() + delay * 1000;
    const durationMs = duration * 1000;

    // Interval to rapidly cycle scrambled characters
    intervalRef.current = window.setInterval(() => {
      randomCharsRef.current = generateRandomString();
    }, 35);

    const tick = (now: number) => {
      if (now < startTime) {
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTime;
      const currentProgress = clamp(elapsed / durationMs, 0, 1);
      setProgress(currentProgress);

      if (currentProgress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setIsCompleted(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [delay, duration, generateRandomString]);

  useEffect(() => {
    if (trigger === 'appear') {
      startAnimation();
    } else if (trigger === 'inView' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, startAnimation]);

  const handleMouseEnter = () => {
    if (replayOnHover && isCompleted) {
      startAnimation();
    }
  };

  // If completed, return original text directly
  if (isCompleted) {
    return (
      <Component
        ref={containerRef as any}
        className={className}
        onMouseEnter={handleMouseEnter}
      >
        {text}
      </Component>
    );
  }

  // Calculate sliding cutoffs matching Framer's ScrambleAppear algorithm
  const leftCutoff = Math.round(mapRange(progress, 0, 1, -scrambledLetters, text.length));
  const rightCutoff = Math.round(mapRange(progress, 0, 1, 0, text.length + scrambledLetters));

  const revealedPart = text.substring(0, clamp(leftCutoff, 0, text.length));
  const scrambledPart = randomCharsRef.current.substring(
    clamp(leftCutoff, 0, text.length),
    clamp(rightCutoff, 0, text.length)
  );
  const hiddenPart = text.substring(clamp(rightCutoff, 0, text.length));

  return (
    <Component
      ref={containerRef as any}
      className={className}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      <span>{revealedPart}</span>
      <span style={{ color: scrambleColor }} className="font-mono">
        {scrambledPart}
      </span>
      <span className="opacity-0 select-none">{hiddenPart}</span>
    </Component>
  );
};

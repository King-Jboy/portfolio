import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export interface LineMaskSplitProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'span';
  staggerAmount?: number;
  duration?: number;
  delay?: number;
  trigger?: 'Appear' | 'Scroll';
  translateYInitial?: number;
  opacityInitial?: number;
  maskLines?: boolean;
}

export const LineMaskSplit: React.FC<LineMaskSplitProps> = ({
  children,
  text,
  className = '',
  tag = 'p',
  staggerAmount = 0.08,
  duration = 0.75,
  delay = 0,
  trigger = 'Appear',
  translateYInitial = 110,
  opacityInitial = 0,
  maskLines = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let splitInstance: SplitText | null = null;
    let lineWrappers: HTMLDivElement[] = [];

    const runAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      try {
        // Create line split
        splitInstance = new SplitText(el, {
          type: 'lines',
          linesClass: 'split-line',
        });

        const lines = splitInstance.lines;

        // Wrap each line in an overflow-hidden mask div
        lineWrappers = lines.map((line) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = maskLines ? 'hidden' : 'visible';
          wrapper.style.display = 'block';
          wrapper.className = 'line-mask-wrapper';
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
          return wrapper;
        });

        // Set initial state
        gsap.set(lines, {
          yPercent: translateYInitial,
          opacity: opacityInitial,
        });

        // Animate lines up smoothly with stagger
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: duration,
          ease: 'power3.out',
          stagger: staggerAmount,
          delay: delay,
          onComplete: () => {
            // Crucial: unlock overflow to visible so SurpriseHover tags and tooltips aren't clipped
            lineWrappers.forEach((w) => {
              w.style.overflow = 'visible';
            });
          },
        });
      } catch (err) {
        // Fallback: if SplitText fails for any reason, ensure element is visible
        console.warn('LineMaskSplit fallback:', err);
        el.style.opacity = '1';
      }
    };

    if (trigger === 'Appear') {
      runAnimation();
    } else if (trigger === 'Scroll') {
      // IntersectionObserver for scroll trigger
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    return () => {
      if (splitInstance) {
        try {
          splitInstance.revert();
        } catch {
          // Ignore
        }
      }
    };
  }, [text, trigger, delay, duration, staggerAmount, translateYInitial, opacityInitial, maskLines]);

  const Tag = tag as any;

  return (
    <Tag ref={containerRef} className={`line-mask-split ${className}`}>
      {text || children}
    </Tag>
  );
};

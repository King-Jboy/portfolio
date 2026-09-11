import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroSignatureProps {
  onFinish?: () => void;
}

export const IntroSignature: React.FC<IntroSignatureProps> = ({ onFinish }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [isDismissed, setIsDismissed] = useState(false);
  const hasExitedRef = useRef(false);

  const dismiss = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    document.body.style.overflow = '';

    if (!overlayRef.current) {
      setIsDismissed(true);
      onFinish?.();
      return;
    }

    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsDismissed(true);
        onFinish?.();
      },
    });
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    let cancelled = false;

    const initAnimation = () => {
      if (cancelled || !svgRef.current) return;

      const paths = svgRef.current.querySelectorAll<SVGPathElement>('path');
      const pathLengths: number[] = [];

      paths.forEach((p) => {
        const len = p.getTotalLength?.() || 100;
        pathLengths.push(len);
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.delayedCall(0.9, () => {
            if (!cancelled) dismiss();
          });
        },
      });

      // 1. K downstem
      if (paths[0]) tl.to(paths[0], { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' }, 0);
      // 2. K arms
      if (paths[1]) tl.to(paths[1], { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' }, 0.15);
      // 3. ing continuous
      if (paths[2]) tl.to(paths[2], { strokeDashoffset: 0, duration: 0.85, ease: 'power1.inOut' }, 0.35);
      // 4. i dot
      if (paths[3]) tl.to(paths[3], { strokeDashoffset: 0, duration: 0.15, ease: 'power2.out' }, 0.55);
      // 5. J capital sweep
      if (paths[4]) tl.to(paths[4], { strokeDashoffset: 0, duration: 0.65, ease: 'power1.inOut' }, 1.05);
      // 6. boy continuous
      if (paths[5]) tl.to(paths[5], { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' }, 1.55);
      // 7. Flourish underline
      if (paths[6]) tl.to(paths[6], { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out' }, 2.2);
    };

    if (document.fonts) {
      document.fonts.ready.then(initAnimation).catch(initAnimation);
    } else {
      setTimeout(initAnimation, 100);
    }

    return () => {
      cancelled = true;
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Signature Intro"
      onClick={dismiss}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#060709] cursor-pointer select-none overflow-hidden"
    >
      <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] px-8">
        <svg
          ref={svgRef}
          viewBox="0 0 250 82"
          className="w-full h-auto text-zinc-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. K downstem */}
          <path d="M 22 20 C 20 28, 19 46, 21 58" />

          {/* 2. K arms */}
          <path d="M 38 22 C 33 26, 24 38, 21 40 C 26 41, 35 50, 40 58" />

          {/* 3. ing continuous cursive */}
          <path d="M 40 58 C 44 51, 47 44, 49 46 C 51 48, 50 55, 54 56 C 57 49, 60 45, 62 46 C 64 48, 63 55, 67 55 C 70 49, 73 45, 75 46 C 77 48, 76 55, 80 55 C 84 50, 86 44, 83 42 C 79 40, 76 45, 79 50 C 82 54, 86 53, 88 48 C 90 43, 90 53, 88 61 C 86 68, 79 70, 76 65 C 74 60, 81 57, 94 49" />

          {/* 4. i dot */}
          <path d="M 50 36 C 50 35, 51 35, 51 36" />

          {/* 5. J capital grand cursive loop */}
          <path d="M 94 49 C 103 40, 112 18, 107 14 C 102 10, 98 21, 103 34 C 108 47, 110 65, 104 71 C 99 76, 93 71, 95 62 C 97 53, 108 48, 119 48" />

          {/* 6. boy continuous cursive */}
          <path d="M 119 48 C 123 39, 127 23, 131 21 C 134 19, 132 30, 129 41 C 127 50, 131 54, 135 52 C 138 50, 139 45, 137 43 C 135 41, 133 45, 140 45 C 144 41, 149 41, 150 46 C 151 50, 147 54, 143 53 C 139 52, 141 44, 147 43 C 152 42, 153 45, 158 45 C 160 48, 161 52, 164 52 C 168 52, 170 45, 170 43 C 170 41, 168 48, 172 52 C 175 55, 178 52, 179 46 C 181 41, 181 52, 180 61 C 178 71, 171 75, 167 69 C 164 64, 171 60, 191 52" />

          {/* 7. Signature sweeping underline flourish */}
          <path d="M 191 52 C 207 46, 227 42, 238 46 C 226 48, 148 63, 74 61 C 36 60, 18 57, 8 54" />
        </svg>
      </div>
    </div>
  );
};

export default IntroSignature;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SignSignatureProps {
  className?: string;
}

export const SignSignature: React.FC<SignSignatureProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const paths = svgRef.current.querySelectorAll<SVGPathElement>('path');

    // Measure each path and configure dasharray
    const pathLengths: number[] = [];
    paths.forEach((p) => {
      const len = p.getTotalLength?.() || 100;
      pathLengths.push(len);
      gsap.set(p, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    });

    // Create automatic looping timeline matching Framer Sign-Component
    const tl = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 2.4,
      onRepeat: () => {
        // Smoothly fade in on repeat after reset
        gsap.set(svgRef.current, { opacity: 1 });
      },
    });
    tlRef.current = tl;

    // 1. 'K' downstem (Framer transition1 style)
    if (paths[0]) {
      tl.to(paths[0], {
        strokeDashoffset: 0,
        duration: 0.35,
        ease: 'power1.inOut',
      }, 0);
    }

    // 2. 'K' arm/legs
    if (paths[1]) {
      tl.to(paths[1], {
        strokeDashoffset: 0,
        duration: 0.35,
        ease: 'power1.inOut',
      }, 0.15);
    }

    // 3. 'ing' continuous letters
    if (paths[2]) {
      tl.to(paths[2], {
        strokeDashoffset: 0,
        duration: 0.85,
        ease: 'power1.inOut',
      }, 0.35);
    }

    // 4. 'i' dot
    if (paths[3]) {
      tl.to(paths[3], {
        strokeDashoffset: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0.55);
    }

    // 5. 'J' capital sweep
    if (paths[4]) {
      tl.to(paths[4], {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: 'power1.inOut',
      }, 1.05);
    }

    // 6. 'boy' continuous letters
    if (paths[5]) {
      tl.to(paths[5], {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 1.55);
    }

    // 7. Signature flourish underline sweep
    if (paths[6]) {
      tl.to(paths[6], {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: 'power2.out',
      }, 2.2);
    }

    // End transition: subtle fade out before repeat
    tl.to(svgRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power1.inOut',
    }, '+=2.0');

    // Reset strokes while faded out
    tl.add(() => {
      paths.forEach((p, i) => {
        gsap.set(p, { strokeDashoffset: pathLengths[i] });
      });
    });

    // Automatically trigger when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-end select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 250 82"
        className="w-48 sm:w-56 md:w-60 h-auto text-zinc-300"
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
  );
};

export default SignSignature;

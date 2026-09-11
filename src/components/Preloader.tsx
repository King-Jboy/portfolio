import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const logs = [
    'INITIALIZING ENVIRONMENT',
    'CONNECTING // BABCOCK.CYBERSEC',
    'CALIBRATING TOPOLOGY MATRIX',
    'SYS.ONLINE // MADUABUNA JOSIAH',
  ];

  useEffect(() => {
    // Respect reduced motion: finish instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 450);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 100);
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 25 && step === 0) setStep(1);
    if (progress > 60 && step === 1) setStep(2);
    if (progress >= 95 && step === 2) setStep(3);
  }, [progress, step]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090a] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isExiting ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="status"
      aria-label="System Initializing"
    >
      <div className="w-full max-w-sm px-6">
        {/* Subtle top indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] tracking-wider mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-ping" />
            <span className="text-[#ededed] font-medium">SYS://INIT</span>
          </div>
          <span className="text-[#00e5ff]">{progress}%</span>
        </div>

        {/* High-precision progress track */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-[#00e5ff]/50 via-[#00e5ff] to-[#38bdf8] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current status line */}
        <div className="h-6 flex items-center justify-between text-xs font-mono">
          <span className="text-[#a1a1aa] tracking-tight">
            {logs[step]}
          </span>
          <span className="text-white/30 text-[10px]">200L</span>
        </div>
      </div>
    </div>
  );
};

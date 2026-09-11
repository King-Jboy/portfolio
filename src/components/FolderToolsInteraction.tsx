import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LinuxIcon, PythonIcon, ClaudeIcon, DeepseekIcon } from './Icons';
import { Folder as FolderIcon } from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  tagline?: string;
  subtitle: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  accent: string;
  badge: string;
  defaultRotate: number;
}

const TOOLS: ToolItem[] = [
  {
    id: 'linux',
    title: 'Linux',
    subtitle: 'Daily Driver & Labs',
    description:
      'My daily OS for classes and labs. Comfortable with terminal navigation, networking commands, and user permissions.',
    icon: LinuxIcon,
    accent: '#38bdf8',
    badge: 'SYS // 01',
    defaultRotate: -4,
  },
  {
    id: 'python',
    title: 'Python',
    subtitle: 'Scripting & Automation',
    description:
      'Writing automation scripts, learning programming concepts, parsing log files, and exploring basic security tools.',
    icon: PythonIcon,
    accent: '#fbbf24',
    badge: 'SCRIPT // 02',
    defaultRotate: -1.5,
  },
  {
    id: 'claude',
    title: 'Claude Code',
    tagline: '(Through my proxy 😉)',
    subtitle: 'Agentic Coding & CLI',
    description:
      'Terminal agentic coding workflow routed through my custom CLI proxy with key pooling and multi-provider switching.',
    icon: ClaudeIcon,
    accent: '#f97316',
    badge: 'AI.CLI // 03',
    defaultRotate: 1.5,
  },
  {
    id: 'deepseek',
    title: 'DeepSeek Harness',
    subtitle: 'Model Testing & Eval',
    description:
      'Hands-on experimentation with open-weight models, reasoning benchmarks, and evaluation harness scripts.',
    icon: DeepseekIcon,
    accent: '#34d399',
    badge: 'EVAL // 04',
    defaultRotate: 4,
  },
];

export const FolderToolsInteraction: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Stored offsets when not dragging
  const [cardOffsets, setCardOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const cardOffsetsRef = useRef<Record<string, { x: number; y: number }>>({});
  const cardElementsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const topZIndexRef = useRef<number>(20);
  const isDraggingCardRef = useRef<boolean>(false);

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Compute base positioning for cards
  const getBaseCoords = useCallback(
    (index: number, open: boolean, mobile: boolean) => {
      if (!open) {
        return { x: 0, y: 0, rot: isHovered ? TOOLS[index].defaultRotate * 1.6 : TOOLS[index].defaultRotate };
      }
      if (mobile) {
        // Mobile fan spread
        const xOffsets = [-48, -16, 16, 48];
        return {
          x: xOffsets[index],
          y: index % 2 === 0 ? -12 : 8,
          rot: (index - 1.5) * 3,
        };
      }
      // Desktop fan spread
      const xOffsets = [-165, -55, 55, 165];
      return {
        x: xOffsets[index],
        y: index === 0 || index === 3 ? -10 : -25,
        rot: (index - 1.5) * 4,
      };
    },
    [isHovered]
  );

  // Toggle folder open/close
  const toggleFolder = () => {
    if (isOpen) {
      setIsOpen(false);
      cardOffsetsRef.current = {};
      setCardOffsets({});
    } else {
      setIsOpen(true);
    }
  };

  // Ultra-stable pointer drag using direct DOM updates and window listeners
  const handleCardPointerDown = (toolId: string, index: number, e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // If folder was closed, open it immediately
    if (!isOpen) {
      setIsOpen(true);
    }

    const cardEl = cardElementsRef.current[toolId];
    if (!cardEl) return;

    // Bring card to top layer
    topZIndexRef.current += 1;
    cardEl.style.zIndex = `${topZIndexRef.current}`;
    cardEl.style.cursor = 'grabbing';
    cardEl.style.transition = 'none';

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const currentOffset = cardOffsetsRef.current[toolId] || { x: 0, y: 0 };
    const initialOffsetX = currentOffset.x;
    const initialOffsetY = currentOffset.y;

    const base = getBaseCoords(index, true, isMobile);
    let finalOffsetX = initialOffsetX;
    let finalOffsetY = initialOffsetY;
    let animFrame: number | null = null;

    const onPointerMove = (moveEv: PointerEvent) => {
      const deltaX = moveEv.clientX - startClientX;
      const deltaY = moveEv.clientY - startClientY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        isDraggingCardRef.current = true;
      }
      finalOffsetX = initialOffsetX + deltaX;
      finalOffsetY = initialOffsetY + deltaY;

      if (!animFrame) {
        animFrame = requestAnimationFrame(() => {
          if (cardEl) {
            cardEl.style.transform = `translate3d(${base.x + finalOffsetX}px, ${
              base.y + finalOffsetY
            }px, 0px) rotate(0deg) scale(1.05)`;
          }
          animFrame = null;
        });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      if (animFrame) cancelAnimationFrame(animFrame);

      // Save new resting position
      cardOffsetsRef.current[toolId] = { x: finalOffsetX, y: finalOffsetY };
      setCardOffsets((prev) => ({ ...prev, [toolId]: { x: finalOffsetX, y: finalOffsetY } }));

      if (cardEl) {
        cardEl.style.cursor = 'grab';
        cardEl.style.transition = 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 250ms ease';
        cardEl.style.transform = `translate3d(${base.x + finalOffsetX}px, ${
          base.y + finalOffsetY
        }px, 0px) rotate(0deg) scale(1)`;
      }

      // Delay clearing drag flag so subsequent click event does not close folder
      if (isDraggingCardRef.current) {
        setTimeout(() => {
          isDraggingCardRef.current = false;
        }, 200);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none overflow-visible">
      {/* Folder Stage Container */}
      <div
        className="relative flex flex-col items-center justify-center transition-all duration-500"
        style={{
          width: '100%',
          maxWidth: isOpen ? '840px' : '320px',
          minHeight: isOpen ? (isMobile ? '400px' : '340px') : '224px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The 3D Tactile Folder based on Framer FOLDER-xHIJ */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          style={{
            width: '292px',
            height: '224px',
            perspective: '2000px',
            transformStyle: 'preserve-3d',
          }}
          onClick={() => {
            if (isDraggingCardRef.current) return;
            toggleFolder();
          }}
        >
          {/* 1. Folder Back Plate (framer-ikzj2x) */}
          <div
            className="absolute rounded-[24px] transition-all duration-500"
            style={{
              top: '0px',
              bottom: '0px',
              left: '11px',
              right: '11px',
              border: '2px solid rgb(36, 36, 36)',
              background:
                'radial-gradient(67% 62% at 50% 0%, rgb(51, 51, 51) 0%, rgb(14, 14, 14) 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              zIndex: 1,
            }}
          >
            {/* Top Folder Tab Header */}
            <div className="absolute -top-3.5 left-4 px-3 py-0.5 rounded-t-lg bg-[#242424] border-t border-x border-[#333] text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
              <FolderIcon className="w-3 h-3 text-zinc-400" />
              <span>STACK // 04_TOOLS</span>
            </div>
          </div>

          {/* 2. Movable Papers / Tool Cards Stack (framer-1pr61nj) */}
          <div
            className="absolute transition-all duration-500"
            style={{
              width: '246px',
              height: '200px',
              top: isOpen ? '-90px' : isHovered ? '-65px' : '-38px',
              left: 'calc(50% - 123px)',
              zIndex: 2,
            }}
          >
            {TOOLS.map((tool, index) => {
              const ToolIcon = tool.icon;
              const base = getBaseCoords(index, isOpen, isMobile);
              const customOffset = cardOffsets[tool.id] || { x: 0, y: 0 };
              const finalX = base.x + customOffset.x;
              const finalY = base.y + customOffset.y;
              const finalRot = isOpen && (customOffset.x !== 0 || customOffset.y !== 0) ? 0 : base.rot;

              return (
                <div
                  key={tool.id}
                  ref={(el) => {
                    cardElementsRef.current[tool.id] = el;
                  }}
                  onPointerDown={(e) => handleCardPointerDown(tool.id, index, e)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isMobile ? '210px' : '222px',
                    height: '170px',
                    transform: `translate3d(${finalX}px, ${finalY}px, 0px) rotate(${finalRot}deg)`,
                    zIndex: 2 + index,
                    backgroundColor: '#0e1017',
                    touchAction: 'none',
                    transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 250ms ease',
                    cursor: 'grab',
                  }}
                  className="rounded-[14px] p-4 flex flex-col justify-between border select-none border-white/[0.09] shadow-[2px_-2px_14px_rgba(0,0,0,0.55)] hover:border-white/30"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.07] mb-2 pointer-events-none">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/[0.08]"
                          style={{ backgroundColor: `${tool.accent}15` }}
                        >
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-white tracking-tight">
                          {tool.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500">
                        {tool.badge}
                      </span>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-relaxed line-clamp-3 pointer-events-none">
                      {tool.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.05] text-[9px] font-mono pointer-events-none">
                    <span className="text-zinc-500 truncate max-w-[130px]">
                      {tool.subtitle}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: tool.accent }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. Folder Front Flap with 3D Forward Tilt (framer-1chfr19) */}
          <div
            className="absolute bottom-0 rounded-[24px] transition-all duration-500 overflow-hidden"
            style={{
              left: 'calc(50% - 135px)',
              width: '270px',
              height: '224px',
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: isOpen
                ? 'rotateX(-70deg)'
                : isHovered
                ? 'rotateX(-48deg)'
                : 'rotateX(-40deg)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(40, 40, 40, 0.48)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow:
                '0px -1px 0px 0px rgba(112, 112, 112, 0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.15), 1px 15px 40px 4px rgba(0, 0, 0, 0.7)',
              zIndex: 10,
              transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {/* Frosted Front Glass Highlights (G5jKnnhXs & wiGsa9IR9) */}
            <div
              className="absolute left-3 right-3 h-[1px]"
              style={{
                bottom: '22px',
                boxShadow:
                  '0px 1px 2px 0px rgba(0,0,0,0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2)',
              }}
            />
            <div
              className="absolute left-3 right-3 h-[1px]"
              style={{
                bottom: '42px',
                boxShadow:
                  '0px 1px 2px 0px rgba(0,0,0,0.5), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderToolsInteraction;

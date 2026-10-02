import React from 'react';
import { TextScramble } from './TextScramble';
import { ThreeDSplitCards } from './ThreeDSplitCards';
import { FlipTextCycle } from './FlipTextCycle';
import { FolderToolsInteraction } from './FolderToolsInteraction';

export const FocusArea: React.FC = () => {
  const broaderExploration = [
    'Computer Networks',
    'Web Security',
    'Digital Forensics',
    'Cloud Basics',
    'Cryptography',
    'OSINT',
    'Threat Intel',
    'Incident Response',
    'Security Research',
  ];

  return (
    <section id="focus" className="pt-14 sm:pt-24 pb-0 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/[0.06]" aria-label="Security Focus Areas">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 sm:mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            <TextScramble text="What I'm learning & interested in" trigger="inView" delay={0.1} />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm font-normal">
          As a 200-level student, I'm early in my degree. These are the primary fields I'm curious about and actively exploring.
        </p>
      </div>

      {/* 3D Split Cards (Framer 3D Split style) */}
      <div className="mb-5 sm:mb-6">
        <ThreeDSplitCards />
      </div>

      {/* Secondary Exploratory Topics */}
      <div className="mb-6 sm:mb-7">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2">
          <h3 className="text-sm sm:text-base font-medium text-white">
            Other topics in coursework &amp; self-study:
          </h3>
          <FlipTextCycle
            texts={broaderExploration.map((topic) => ({
              text: topic,
              color: '#38bdf8',
            }))}
            cycleDelay={2.2}
            flipDuration={0.35}
            staggerDelay={0.018}
            className="text-sm sm:text-base font-medium text-cyan-400"
          />
        </div>
      </div>

      {/* Tools I Work With Right Now - Framer 3D Folder Interaction */}
      <div className="pt-4 sm:pt-6">
        <h3 className="text-sm sm:text-base font-medium text-white mb-2">
          Tools I work with right now
        </h3>

        {/* Shifted down with proper top clearance so cards never overlap the heading */}
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-20 flex items-center justify-center">
          <FolderToolsInteraction />
        </div>
      </div>
    </section>
  );
};

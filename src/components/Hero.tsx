import React from 'react';
import { ArrowDown } from 'lucide-react';
import { TextScramble } from './TextScramble';
import { SurpriseHover } from './SurpriseHover';
import { LineMaskSplit } from './LineMaskSplit';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-[88dvh] flex flex-col justify-between pt-32 pb-16 px-6 max-w-5xl mx-auto z-10"
      aria-label="Introduction"
    >
      <div className="max-w-3xl my-auto">
        <div className="text-sm text-zinc-500 mb-6 font-normal">
          <span className="text-zinc-400">
            Maduabuna Josiah &middot; Babcock University, Nigeria
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.035em] text-white leading-[1.08] mb-8">
          <TextScramble text="Learning cybersecurity," delay={0.15} duration={1.1} />
          <br />
          <TextScramble text="one system at a time." delay={0.45} duration={1.1} />
        </h1>

        <LineMaskSplit
          tag="p"
          trigger="Appear"
          delay={0.4}
          staggerAmount={0.08}
          className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mb-10"
        >
          I'm an 18-year-old student in my second year (200 level) studying{' '}
          <SurpriseHover
            tags={['Ethical Hacking', 'Penetration Testing', 'Robotics & AI', '200 Level']}
            subtitle="Core Discipline"
            underline={true}
          >
            <span className="text-white font-medium">
              Cybersecurity
            </span>
          </SurpriseHover>
          . I started university in 2025, and right now I'm focused on building my fundamentals&mdash;getting comfortable in{' '}
          <SurpriseHover
            tags={['Ubuntu / Debian', 'Bash Scripting', 'File Permissions', 'Daily Driver']}
            subtitle="Daily OS"
            underline={true}
          >
            <span className="text-white font-medium">
              Linux
            </span>
          </SurpriseHover>
          , writing scripts in{' '}
          <SurpriseHover
            tags={['Automation', 'Socket Programming', 'Log Parsers', 'Security Tools']}
            subtitle="Primary Language"
            underline={true}
          >
            <span className="text-white font-medium">
              Python
            </span>
          </SurpriseHover>
          , and learning how{' '}
          <SurpriseHover
            tags={['TCP/IP & Packets', 'OSI Model', 'DNS & Routing', 'Systems Design']}
            subtitle="Core Foundations"
            underline={true}
          >
            <span className="text-zinc-200 hover:text-white">
              networks and software
            </span>
          </SurpriseHover>{' '}
          actually work.
        </LineMaskSplit>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#focus"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black text-xs font-medium hover:bg-zinc-200 transition-colors btn-press"
          >
            <span>What I'm Learning</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-700" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/[0.05] hover:bg-white/[0.09] text-xs font-medium text-zinc-200 border border-white/10 transition-colors btn-press"
          >
            <span>Get in touch</span>
          </a>
        </div>
      </div>
    </section>
  );
};

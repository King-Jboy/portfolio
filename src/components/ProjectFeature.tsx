import React from 'react';
import { ArrowUpRight, GitFork } from 'lucide-react';
import { TextScramble } from './TextScramble';

export const ProjectFeature: React.FC = () => {
  return (
    <section id="work" className="py-14 sm:py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/[0.06]" aria-label="Selected Technical Work">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 sm:mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            <TextScramble text="A software project I tinkered with" trigger="inView" delay={0.1} />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm font-normal">
          Exploring how AI coding tools and developer runtimes work under the hood.
        </p>
      </div>

      {/* Main Container */}
      <div className="border border-white/[0.08] rounded-xl bg-[#090a0e] p-5 sm:p-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 font-normal">
              <GitFork className="w-3.5 h-3.5 text-zinc-400" />
              <span>Personal GitHub Fork</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">
              kingjboy-claude-code
            </h3>
          </div>

          <a
            href="https://github.com/King-Jboy/kingjboy-claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-200 border border-white/10 transition-colors btn-press self-start sm:self-auto"
          >
            <span>View on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Framing & Description */}
        <div className="pt-6">
          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl mb-4">
            I was curious about how AI coding assistants function behind the scenes, so I created a personal fork of Free Claude Code to experiment with provider switching, API key management, and CLI developer tooling.
          </p>

          <p className="text-xs text-zinc-500">
            Note: This is a software tinkering project to learn about coding tools—not a cybersecurity project!
          </p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  GitFork,
  HeartPulse,
  Loader2,
} from 'lucide-react';
import { TextScramble } from './TextScramble';

export const ProjectFeature: React.FC = () => {
  return (
    <section
      id="work"
      className="py-14 sm:py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/[0.06]"
      aria-label="Selected Technical Work"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8 sm:mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            <TextScramble text="Featured Projects & Engineering" trigger="inView" delay={0.1} />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm font-normal">
          Production systems, emergency networks, and developer tooling I've built and tinkered with.
        </p>
      </div>

      <div className="space-y-8">
        {/* ============================================================ */}
        {/* Flagship Project: Pulsive */}
        {/* ============================================================ */}
        <div className="group relative border border-white/[0.08] hover:border-rose-500/30 rounded-2xl bg-[#090a0e] p-6 sm:p-9 transition-all duration-300">
          {/* Subtle top ambient glow */}
          <div
            className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Bar: Identity & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-white/[0.08]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-950/40 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(190,18,60,0.25)]">
                <HeartPulse className="w-6 h-6 text-rose-400" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Loader2 className="w-3 h-3 animate-spin text-rose-400" />
                    Currently Building
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Pulsive
                  </h3>
                  <span className="text-sm sm:text-base text-rose-300/80 font-medium">
                    &mdash; Give blood. Save a life in Nigeria.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-auto">
              <a
                href="https://pulsive-hazel.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-[0_0_18px_rgba(225,29,72,0.35)] transition-all btn-press"
              >
                <span>Live Web App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/King-Jboy/Pulsive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-zinc-200 border border-white/10 transition-colors btn-press"
              >
                <span>View on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Framing & Description */}
          <div className="pt-6">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
              An emergency blood donation and dispatch network designed specifically for Nigeria. It solves critical hospital shortages by directly connecting voluntary, NIN-verified donors with CAC–accredited healthcare facilities across all 36 states and the FCT. Engineered from the ground up with statutory privacy protections, tamper-proof audit trails, and multi-channel emergency alert escalation.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Personal Project: kingjboy-claude-code */}
        {/* ============================================================ */}
        <div className="border border-white/[0.08] hover:border-white/[0.15] rounded-xl bg-[#090a0e] p-5 sm:p-8 transition-colors">
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
      </div>
    </section>
  );
};

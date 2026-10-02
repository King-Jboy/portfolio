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
      className="py-10 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto relative z-10 border-t border-white/[0.06]"
      aria-label="Selected Technical Work"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-3 mb-6 sm:mb-12">
        <div>
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-white">
            <TextScramble text="Featured Projects & Engineering" trigger="inView" delay={0.1} />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm font-normal">
          Production systems, emergency networks, and developer tooling.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-8">
        {/* ============================================================ */}
        {/* Flagship Project: Pulsive */}
        {/* ============================================================ */}
        <div className="group relative border border-white/[0.08] hover:border-rose-500/30 rounded-xl sm:rounded-2xl bg-[#090a0e] p-4 sm:p-8 transition-all duration-300">
          {/* Subtle top ambient glow */}
          <div
            className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Bar: Identity & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-5 pb-4 sm:pb-6 border-b border-white/[0.08]">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-950/40 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(190,18,60,0.2)]">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin text-rose-400" />
                    Currently Building
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2.5">
                  <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                    Pulsive
                  </h3>
                  <span className="text-xs sm:text-base text-rose-300/80 font-medium">
                    &mdash; Give blood. Save a life in Nigeria.
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 sm:gap-2.5 pt-1 sm:pt-0">
              <a
                href="https://pulsive-hazel.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-[0_0_16px_rgba(225,29,72,0.3)] transition-all btn-press"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/King-Jboy/Pulsive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-zinc-200 border border-white/10 transition-colors btn-press"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Framing & Description */}
          <div className="pt-3.5 sm:pt-6">
            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
              An emergency blood donation and dispatch network connecting voluntary, NIN-verified donors with CAC–accredited healthcare facilities across Nigeria. Engineered with keyed HMAC identity protections, zero raw NIN storage, and automated multi-channel emergency alert escalation.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Personal Project: kingjboy-claude-code */}
        {/* ============================================================ */}
        <div className="border border-white/[0.08] hover:border-white/[0.15] rounded-xl sm:rounded-2xl bg-[#090a0e] p-4 sm:p-8 transition-colors">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3.5 sm:pb-6 border-b border-white/[0.08]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                <GitFork className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-400 mb-0.5 font-normal">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                    Personal Open-Source Fork
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight font-mono">
                  kingjboy-claude-code
                </h3>
              </div>
            </div>

            <a
              href="https://github.com/King-Jboy/kingjboy-claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-zinc-200 border border-white/10 transition-colors btn-press self-start sm:self-auto"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>

          {/* Framing & Description */}
          <div className="pt-3.5 sm:pt-6">
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl mb-2 sm:mb-3">
              A personal fork exploring AI coding assistant runtimes, provider switching, and developer CLI tooling behind the scenes.
            </p>

            <p className="text-[11px] sm:text-xs text-zinc-500">
              Note: Software tinkering project to explore coding tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

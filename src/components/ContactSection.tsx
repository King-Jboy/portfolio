import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { TextScramble } from './TextScramble';
import { GithubIcon, XIcon, TelegramIcon } from './Icons';
import { SignSignature } from './SignSignature';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'maduabunajosiah@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const channels = [
    {
      name: 'GitHub',
      handle: 'King-Jboy',
      url: 'https://github.com/King-Jboy/',
      icon: GithubIcon,
    },
    {
      name: 'X (formerly Twitter)',
      handle: '@kingjboy_01',
      url: 'https://x.com/kingjboy_01',
      icon: XIcon,
    },
    {
      name: 'Telegram',
      handle: '@madujosiah',
      url: 'https://t.me/madujosiah',
      icon: TelegramIcon,
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-24 px-6 max-w-5xl mx-auto relative z-10 border-t border-white/[0.06]" aria-label="Contact">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10 sm:mb-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            <TextScramble text="Let's connect" trigger="inView" delay={0.1} />
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-sm font-normal">
          Always open to connecting with fellow students, developers, and anyone interested in tech or security.
        </p>
      </div>

      {/* Main Email Block */}
      <div className="mb-14 pb-12 border-b border-white/[0.08]">
        <div className="text-xs text-zinc-500 mb-2">Direct Email</div>
        <div className="flex flex-wrap items-baseline gap-4 mb-4">
          <a
            href={`mailto:${email}`}
            className="text-2xl sm:text-4xl font-mono font-medium text-white hover:text-zinc-300 transition-colors"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors btn-press"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-mono">copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-zinc-400" />
                <span>copy address</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-zinc-400 font-sans">
          Click to compose in your mail client or copy the address.
        </p>
      </div>

      {/* Channels List and Cursive Signature */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-1">
        {/* Left: Verified Channels */}
        <div className="flex flex-wrap items-start gap-6 sm:gap-8">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-400 group-hover:text-white transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="text-xs text-zinc-500 mb-0.5">
                  {ch.name}
                </div>
                <div className="text-base font-medium text-white group-hover:text-cyan-400 transition-colors font-mono">
                  {ch.handle}
                </div>
              </a>
            );
          })}
        </div>

        {/* Right: Cursive Signature */}
        <div className="shrink-0 self-start md:self-end">
          <SignSignature />
        </div>
      </div>
    </section>
  );
};

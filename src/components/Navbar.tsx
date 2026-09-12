import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { RotationButton } from './RotationButton';
import { ThemeToggle } from './ThemeSwitcher';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#050507]/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Author / Identity */}
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-white hover:text-zinc-300 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <span>Maduabuna Josiah</span>
          <span className="text-zinc-500 font-normal ml-2">/ cybersecurity</span>
        </a>

        {/* Desktop Navigation & Theme Switcher on the right */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
          <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            <RotationButton title="Focus" href="#focus" />
            <RotationButton title="Engineering" href="#work" />
            <RotationButton title="About" href="#about" />
            <RotationButton title="Contact" href="#contact" />
            <RotationButton
              title="GitHub"
              href="https://github.com/King-Jboy/"
              target="_blank"
              rel="noopener noreferrer"
              icon={<ArrowUpRight className="w-3 h-3" />}
              invertedIcon={<ArrowUpRight className="w-3 h-3 text-[#050507]" />}
            />
          </nav>

          <ThemeToggle />
        </div>

        {/* Mobile Actions: Theme Toggle + Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none rounded-lg border border-white/[0.06] bg-white/[0.02]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090a0d] px-6 py-5">
          <nav className="flex flex-col gap-2.5 items-start">
            <RotationButton
              title="Focus Areas"
              href="#focus"
              onClick={() => setMobileMenuOpen(false)}
            />
            <RotationButton
              title="Engineering Work"
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
            />
            <RotationButton
              title="About Josiah"
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            />
            <RotationButton
              title="Contact"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="pt-2 w-full border-t border-white/[0.08]">
              <RotationButton
                title="GitHub Profile"
                href="https://github.com/King-Jboy/"
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                invertedIcon={<ArrowUpRight className="w-3.5 h-3.5 text-[#050507]" />}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

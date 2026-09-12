import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { changeTheme, getInitialTheme, Theme } from '../utils/theme';

export type { Theme };

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    changeTheme(initialTheme);

    const handleThemeChange = () => {
      const current = (document.documentElement.getAttribute('toggle-theme') as Theme) || 'dark';
      setTheme(current);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const toggle = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    changeTheme(nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggle}
      className={`group relative inline-flex items-center h-[32px] w-[58px] sm:w-[62px] p-0.5 rounded-full cursor-pointer select-none transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
        isDark
          ? 'bg-[#121318] border border-white/[0.09] hover:border-white/20'
          : 'bg-[#ebecef] border border-black/[0.12] hover:border-black/25'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Background Track Icons */}
      <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none">
        {/* Sun (Left) */}
        <Sun
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            isDark ? 'text-zinc-500 opacity-60 group-hover:opacity-90' : 'text-amber-500 opacity-0'
          }`}
        />
        {/* Moon (Right) */}
        <Moon
          className={`w-3.5 h-3.5 transition-all duration-300 ${
            isDark ? 'text-indigo-400 opacity-0' : 'text-zinc-400 opacity-60 group-hover:opacity-90'
          }`}
        />
      </div>

      {/* Sliding Tactile Thumb */}
      <div
        className={`relative z-10 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-90 ${
          isDark
            ? 'translate-x-[28px] sm:translate-x-[32px] bg-[#1f2128] text-indigo-300 border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
            : 'translate-x-0.5 bg-white text-amber-500 border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-3.5 h-3.5 transition-transform duration-300 rotate-0" />
        )}
      </div>
    </button>
  );
};

export const ThemeToggle = ThemeSwitcher;
export default ThemeSwitcher;

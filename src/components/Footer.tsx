import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-6 max-w-5xl mx-auto relative z-10 text-xs text-zinc-500" aria-label="Page Footer">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-zinc-300 font-medium">Maduabuna Josiah</span>
          <span className="text-zinc-600 mx-2">&middot;</span>
          <span>Babcock University, Nigeria</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-zinc-700">&middot;</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
};

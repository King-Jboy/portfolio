export type Theme = 'light' | 'dark';

/**
 * changeTheme
 * Directly matches the Framer ThemeSwitcher-wn9byP.js specification:
 * - sets toggle-theme attribute on <html> and <body>
 * - persists preference to localStorage
 * - dispatches a global 'themeChange' window Event
 */
export const changeTheme = (theme: Theme): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  htmlElement.setAttribute('toggle-theme', theme);
  bodyElement.setAttribute('toggle-theme', theme);
  localStorage.setItem('theme', theme);

  const event = new Event('themeChange');
  window.dispatchEvent(event);
};

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
};

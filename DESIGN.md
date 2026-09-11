# Design System: Maduabuna Josiah

## Aesthetic Family
- **Calibrated Obsidian Observatory**: Apple-level restraint meets high-end technical research interface.
- Contrast ratio: WCAG AAA on primary text, AA on secondary copy.

## Tokens

### Color
- `--bg-canvas: #060709` (Warm-tinted deep obsidian; never pure dead `#000000`)
- `--text-primary: #f4f4f5` (Zinc 100, crisp high-contrast white)
- `--text-secondary: #a1a1aa` (Zinc 400, readable, minimum 5.2:1 contrast)
- `--text-muted: #71717a` (Zinc 500, supplementary metadata only)
- `--border-hairline: rgba(255, 255, 255, 0.07)`
- `--accent-cyan: #38bdf8` (Ice sky/cyan used strictly for active interactive states and real data indicators)

### Typography
- **Primary Sans**: Plus Jakarta Sans / Inter Display / -apple-system.
  - Display: `tracking-[-0.035em]`, `font-bold` or `font-semibold`.
  - Body: `leading-relaxed`, `max-w-[65ch]`.
- **Monospace**: JetBrains Mono.
  - Reserved strictly for code, files, commands, and actual measurements; banned as decorative costume.

### Spacing & Layout
- Generous editorial vertical rhythm (`py-28` to `py-32`).
- Asymmetric grid pairings and clean typographic dividers (`border-t border-white/[0.06]`).
- Banned: Cards nested inside cards, cards as default containers for simple text.

### Motion
- One authored 3D moment: An interactive topological coordinate grid (`NetworkCanvas.tsx`) responding to cursor proximity and scroll depth with continuous mathematical wave functions.
- Micro-interactions: `scale(0.97)` on press, 160ms `ease-out`.
- Zero bounce/elastic easings; zero glitch animations.

/**
 * Nexora Design System Tokens
 * Canonical colour palette and design constants for the Nexora Growth Partner platform.
 */

export const NEXORA_COLORS = {
  // Primary brand identity
  magenta: '#b1005e',
  magentaHover: '#90004c',
  magentaLight: '#fce7f3',
  magentaBorder: '#f472b6',

  // Deep wine secondary
  deepWine: '#54123b',
  deepWineDark: '#380a26',
  deepWineLight: '#7c225a',

  // Muted lavender accent
  mutedLavender: '#fda4c9',
  mutedLavenderSoft: '#fdf2f7',
  mutedLavenderBorder: '#e9c1d5',

  // White surfaces
  white: '#ffffff',
  surface: '#ffffff',
  surfaceSoft: '#faf5f8',
  surfaceAlt: '#f5edf2',

  // Text colours (WCAG AA accessible contrast)
  textMain: '#1f151c',
  textMuted: '#5e4a55',
  textLight: '#806876',
  textInverted: '#ffffff',
  textInvertedMuted: '#ffdbe8',

  // Border colours
  border: '#ecd8e3',
  borderSubtle: '#f5ebf1',
  borderFocus: '#b1005e',

  // Semantic status colours
  success: '#15803d',
  successBg: '#dcfce7',
  warning: '#b45309',
  warningBg: '#fef3c7',
  danger: '#b91c1c',
  dangerBg: '#fee2e2',
  info: '#0369a1',
  infoBg: '#e0f2fe',
} as const;

export const NEXORA_TYPOGRAPHY = {
  fontSans: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "'SFMono-Regular', ui-monospace, 'JetBrains Mono', Menlo, monospace",
} as const;

export const NEXORA_SHADOWS = {
  sm: '0 1px 3px rgba(84, 18, 59, 0.05)',
  md: '0 4px 16px -2px rgba(84, 18, 59, 0.08)',
  lg: '0 10px 30px -4px rgba(84, 18, 59, 0.12)',
  xl: '0 20px 40px -8px rgba(177, 0, 94, 0.16)',
} as const;

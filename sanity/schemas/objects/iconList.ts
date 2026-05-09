export const ICON_OPTIONS = [
  "ArrowRight",
  "BarChart3",
  "BookOpen",
  "Building2",
  "DollarSign",
  "Globe",
  "Handshake",
  "Heart",
  "Home",
  "Layers",
  "Lightbulb",
  "Megaphone",
  "Shield",
  "Star",
  "Target",
  "TrendingUp",
  "Users",
  "Vote",
] as const;

export type IconName = (typeof ICON_OPTIONS)[number];

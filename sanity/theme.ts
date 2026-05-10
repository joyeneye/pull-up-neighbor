import { buildLegacyTheme } from "sanity";

const BRAND_GREEN = "#06A459";
const BRAND_GREEN_DARK = "#048a4a";

export const punTheme = buildLegacyTheme({
  "--brand-primary": BRAND_GREEN,
  "--default-button-primary-color": BRAND_GREEN,
  "--main-navigation-color": "#0f172a",
  "--main-navigation-color--inverted": "#ffffff",
  "--focus-color": BRAND_GREEN_DARK,
  "--state-success-color": BRAND_GREEN,
});

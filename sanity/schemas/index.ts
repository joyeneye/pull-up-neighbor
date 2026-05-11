import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./objects/hero";
import { cta } from "./objects/cta";
import { finalCta } from "./objects/finalCta";
import { siteSettings } from "./documents/siteSettings";
import {
  pageHero,
  pageFinalCta,
  homeFocusAreas,
  homeAbout,
  homeServices,
  homePrograms,
  homeStats,
  homePartners,
} from "./documents/sections";
import { program } from "./documents/program";
import { service } from "./documents/service";
import { partnerType } from "./documents/partnerType";
import { focusArea } from "./documents/focusArea";
import { stat } from "./documents/stat";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable inline objects
  hero,
  cta,
  finalCta,
  // Section singleton document types
  pageHero,
  pageFinalCta,
  homeFocusAreas,
  homeAbout,
  homeServices,
  homePrograms,
  homeStats,
  homePartners,
  // Site-wide settings
  siteSettings,
  // Reusable card-level docs
  program,
  service,
  partnerType,
  focusArea,
  stat,
];

/**
 * Document IDs that are singletons — there's only one of each.
 * Studio prevents duplication/deletion for these.
 */
export const SINGLETON_IDS = [
  "siteSettings",
  // Home sections
  "homeHero",
  "homeFocusAreas",
  "homeAbout",
  "homeServices",
  "homePrograms",
  "homeStats",
  "homePartners",
  "homeFinalCta",
  // About sections
  "aboutHero",
  "aboutFinalCta",
  // Vision sections
  "visionHero",
  "visionFinalCta",
  // Programs page sections
  "programsHero",
  "programsFinalCta",
  // Impact page sections
  "impactHero",
  "impactFinalCta",
  // Services page sections
  "servicesHero",
  "servicesFinalCta",
  // Partners page sections
  "partnersHero",
  "partnersFinalCta",
  // Contact page sections
  "contactHero",
  "contactFinalCta",
] as const;

export const SINGLETON_ID_SET = new Set<string>(SINGLETON_IDS);

/**
 * Document types whose ALL instances are singletons (not reusable).
 * Used to filter the "create new" templates so editors don't
 * accidentally make a second copy.
 */
export const SINGLETON_ONLY_TYPES = new Set<string>([
  "siteSettings",
  "pageHero",
  "pageFinalCta",
  "homeFocusAreas",
  "homeAbout",
  "homeServices",
  "homePrograms",
  "homeStats",
  "homePartners",
]);

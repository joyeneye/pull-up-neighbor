import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./objects/hero";
import { cta } from "./objects/cta";
import { finalCta } from "./objects/finalCta";
import { pageBuilderTypes } from "./objects/sectionBlocks";
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
import { pageBody } from "./documents/pageBody";
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
  // Page-builder section blocks (inline objects)
  ...pageBuilderTypes,
  // Section singleton document types
  pageHero,
  pageFinalCta,
  pageBody,
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
  "aboutBody",
  "aboutFinalCta",
  // Vision sections
  "visionHero",
  "visionBody",
  "visionFinalCta",
  // Programs page sections
  "programsHero",
  "programsBody",
  "programsFinalCta",
  // Impact page sections
  "impactHero",
  "impactBody",
  "impactFinalCta",
  // Services page sections
  "servicesHero",
  "servicesBody",
  "servicesFinalCta",
  // Partners page sections
  "partnersHero",
  "partnersBody",
  "partnersFinalCta",
  // Contact page sections
  "contactHero",
  "contactBody",
  "contactFinalCta",
] as const;

export const SINGLETON_ID_SET = new Set<string>(SINGLETON_IDS);

export const SINGLETON_ONLY_TYPES = new Set<string>([
  "siteSettings",
  "pageHero",
  "pageFinalCta",
  "pageBody",
  "homeFocusAreas",
  "homeAbout",
  "homeServices",
  "homePrograms",
  "homeStats",
  "homePartners",
]);

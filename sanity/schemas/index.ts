import type { SchemaTypeDefinition } from "sanity";
import { SECTION_SINGLETON_IDS } from "../lib/routes";
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
import { contactFormSection } from "./documents/contactFormSection";
import { program } from "./documents/program";
import { service } from "./documents/service";
import { partnerType } from "./documents/partnerType";
import { partnershipModel } from "./documents/partnershipModel";
import { focusArea } from "./documents/focusArea";
import { stat } from "./documents/stat";
import { inActionItem } from "./documents/inActionItem";
import { contactSubmission } from "./documents/contactSubmission";

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
  contactFormSection,
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
  partnershipModel,
  focusArea,
  stat,
  inActionItem,
  contactSubmission,
];

// Derived from the single page table in sanity/lib/routes.ts so that adding a
// section cannot forget to protect it from deletion.
export const SINGLETON_IDS: string[] = ["siteSettings", ...SECTION_SINGLETON_IDS];

export const SINGLETON_ID_SET = new Set<string>(SINGLETON_IDS);

export const SINGLETON_ONLY_TYPES = new Set<string>([
  "siteSettings",
  "pageHero",
  "pageFinalCta",
  "pageBody",
  "contactFormSection",
  "homeFocusAreas",
  "homeAbout",
  "homeServices",
  "homePrograms",
  "homeStats",
  "homePartners",
]);

import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./objects/hero";
import { cta } from "./objects/cta";
import { finalCta } from "./objects/finalCta";
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import {
  aboutPage,
  visionPage,
  programsPage,
  impactPage,
  servicesPage,
  partnersPage,
  contactPage,
} from "./documents/secondaryPages";
import { program } from "./documents/program";
import { service } from "./documents/service";
import { partnerType } from "./documents/partnerType";
import { focusArea } from "./documents/focusArea";
import { stat } from "./documents/stat";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects (reusable inline blocks)
  hero,
  cta,
  finalCta,
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  visionPage,
  programsPage,
  impactPage,
  servicesPage,
  partnersPage,
  contactPage,
  // Reusable documents
  program,
  service,
  partnerType,
  focusArea,
  stat,
];

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "visionPage",
  "programsPage",
  "impactPage",
  "servicesPage",
  "partnersPage",
  "contactPage",
]);

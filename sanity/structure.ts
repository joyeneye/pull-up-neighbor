import type { StructureResolver } from "sanity/structure";
import {
  HomeIcon,
  InfoOutlineIcon,
  RocketIcon,
  StackIcon,
  BarChartIcon,
  ControlsIcon,
  HeartIcon,
  EnvelopeIcon,
  CogIcon,
  PackageIcon,
  ProjectsIcon,
  TargetIcon,
  ChartUpwardIcon,
  DocumentsIcon,
  ThListIcon,
  PlayIcon,
  type IconComponent,
} from "@sanity/icons";
import { PAGE_ROUTES } from "./lib/routes";

const SECTION_ICONS: Record<string, IconComponent> = {
  pageHero: RocketIcon,
  pageBody: ThListIcon,
  pageFinalCta: EnvelopeIcon,
  homeFocusAreas: TargetIcon,
  homeAbout: InfoOutlineIcon,
  homeServices: PackageIcon,
  homePrograms: StackIcon,
  homeStats: ChartUpwardIcon,
  homePartners: HeartIcon,
  contactFormSection: EnvelopeIcon,
  inActionItem: PlayIcon,
};

const PAGE_ICONS: Record<string, IconComponent> = {
  home: HomeIcon,
  about: InfoOutlineIcon,
  vision: RocketIcon,
  programs: StackIcon,
  impact: BarChartIcon,
  services: ControlsIcon,
  partners: HeartIcon,
  contact: EnvelopeIcon,
  inAction: PlayIcon,
};

// The page/section table itself lives in sanity/lib/routes.ts, shared with the
// revalidation webhook and the singleton lock. Here we only decorate it with
// Studio icons.
const PAGES = PAGE_ROUTES.map((page) => ({
  id: page.key,
  title: page.title,
  icon: PAGE_ICONS[page.key] ?? DocumentsIcon,
  sections: page.sections.map((section) => ({
    ...section,
    icon: SECTION_ICONS[section.schemaType] ?? ThListIcon,
  })),
}));

export { PAGES };

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Pages")
            .items(
              PAGES.map((page) =>
                S.listItem()
                  .title(page.title)
                  .icon(page.icon)
                  .child(
                    S.list()
                      .title(page.title)
                      .items(
                        page.sections.map((section) => {
                          if (section.kind === "list") {
                            return S.listItem()
                              .title(section.title)
                              .icon(section.icon)
                              .id(section.id)
                              .child(
                                S.documentTypeList(section.schemaType)
                                  .title(`${page.title} — ${section.title}`)
                                  .defaultOrdering([
                                    { field: "featured", direction: "desc" },
                                    { field: "date", direction: "desc" },
                                    { field: "displayOrder", direction: "asc" },
                                  ])
                              );
                          }
                          return S.listItem()
                            .title(section.title)
                            .icon(section.icon)
                            .id(section.id)
                            .child(
                              S.editor()
                                .id(section.id)
                                .schemaType(section.schemaType)
                                .documentId(section.id)
                                .title(`${page.title} — ${section.title}`)
                            );
                        })
                      )
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Programs")
        .icon(StackIcon)
        .schemaType("program")
        .child(S.documentTypeList("program").title("Programs")),
      S.listItem()
        .title("Services")
        .icon(PackageIcon)
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),
      S.listItem()
        .title("Partner Types")
        .icon(ProjectsIcon)
        .schemaType("partnerType")
        .child(S.documentTypeList("partnerType").title("Partner Types")),
      S.listItem()
        .title("Partnership Models")
        .icon(ProjectsIcon)
        .schemaType("partnershipModel")
        .child(S.documentTypeList("partnershipModel").title("Partnership Models")),
      S.listItem()
        .title("Focus Areas")
        .icon(TargetIcon)
        .schemaType("focusArea")
        .child(S.documentTypeList("focusArea").title("Focus Areas")),
      S.listItem()
        .title("Stats")
        .icon(ChartUpwardIcon)
        .schemaType("stat")
        .child(S.documentTypeList("stat").title("Stats")),
      S.listItem()
        .title("In Action Items")
        .icon(PlayIcon)
        .schemaType("inActionItem")
        .child(
          S.documentTypeList("inActionItem")
            .title("In Action Items")
            .defaultOrdering([
              { field: "featured", direction: "desc" },
              { field: "date", direction: "desc" },
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Inquiries")
        .icon(EnvelopeIcon)
        .schemaType("contactSubmission")
        .child(
          S.list()
            .title("Inquiries")
            .items([
              S.listItem()
                .title("New")
                .icon(EnvelopeIcon)
                .id("inquiriesNew")
                .child(
                  S.documentList()
                    .title("New Inquiries")
                    .filter('_type == "contactSubmission" && (status == "new" || !defined(status))')
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("All")
                .icon(DocumentsIcon)
                .id("inquiriesAll")
                .child(
                  S.documentTypeList("contactSubmission")
                    .title("All Inquiries")
                    .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .id("siteSettings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
    ]);

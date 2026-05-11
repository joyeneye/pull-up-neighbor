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
  type IconComponent,
} from "@sanity/icons";

type SectionItem = {
  id: string;
  schemaType: string;
  title: string;
  icon?: IconComponent;
};

type PageEntry = {
  id: string;
  title: string;
  icon: IconComponent;
  sections: SectionItem[];
};

const PAGES: PageEntry[] = [
  {
    id: "home",
    title: "Home",
    icon: HomeIcon,
    sections: [
      { id: "homeHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "homeFocusAreas", schemaType: "homeFocusAreas", title: "Focus Areas", icon: TargetIcon },
      { id: "homeAbout", schemaType: "homeAbout", title: "About Snapshot", icon: InfoOutlineIcon },
      { id: "homeServices", schemaType: "homeServices", title: "Services Preview", icon: PackageIcon },
      { id: "homePrograms", schemaType: "homePrograms", title: "Programs Preview", icon: StackIcon },
      { id: "homeStats", schemaType: "homeStats", title: "Impact Stats", icon: ChartUpwardIcon },
      { id: "homePartners", schemaType: "homePartners", title: "Partners", icon: HeartIcon },
      { id: "homeFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "about",
    title: "About",
    icon: InfoOutlineIcon,
    sections: [
      { id: "aboutHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "aboutBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "aboutFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "vision",
    title: "Vision",
    icon: RocketIcon,
    sections: [
      { id: "visionHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "visionBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "visionFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "programs",
    title: "Programs",
    icon: StackIcon,
    sections: [
      { id: "programsHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "programsBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "programsFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "impact",
    title: "Impact",
    icon: BarChartIcon,
    sections: [
      { id: "impactHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "impactBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "impactFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "services",
    title: "Services",
    icon: ControlsIcon,
    sections: [
      { id: "servicesHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "servicesBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "servicesFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "partners",
    title: "Partners",
    icon: HeartIcon,
    sections: [
      { id: "partnersHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "partnersBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "partnersFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    icon: EnvelopeIcon,
    sections: [
      { id: "contactHero", schemaType: "pageHero", title: "Hero", icon: RocketIcon },
      { id: "contactBody", schemaType: "pageBody", title: "Body Sections", icon: ThListIcon },
      { id: "contactFinalCta", schemaType: "pageFinalCta", title: "Final CTA", icon: EnvelopeIcon },
    ],
  },
];

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
                        page.sections.map((section) =>
                          S.listItem()
                            .title(section.title)
                            .icon(section.icon)
                            .id(section.id)
                            .child(
                              S.editor()
                                .id(section.id)
                                .schemaType(section.schemaType)
                                .documentId(section.id)
                                .title(`${page.title} — ${section.title}`)
                            )
                        )
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
        .title("Focus Areas")
        .icon(TargetIcon)
        .schemaType("focusArea")
        .child(S.documentTypeList("focusArea").title("Focus Areas")),
      S.listItem()
        .title("Stats")
        .icon(ChartUpwardIcon)
        .schemaType("stat")
        .child(S.documentTypeList("stat").title("Stats")),
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

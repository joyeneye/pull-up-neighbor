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
} from "@sanity/icons";

const SINGLETON_PAGES = [
  { id: "homePage", title: "Home", icon: HomeIcon },
  { id: "aboutPage", title: "About", icon: InfoOutlineIcon },
  { id: "visionPage", title: "Vision", icon: RocketIcon },
  { id: "programsPage", title: "Programs", icon: StackIcon },
  { id: "impactPage", title: "Impact", icon: BarChartIcon },
  { id: "servicesPage", title: "Services", icon: ControlsIcon },
  { id: "partnersPage", title: "Partners", icon: HeartIcon },
  { id: "contactPage", title: "Contact", icon: EnvelopeIcon },
];

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
              SINGLETON_PAGES.map(({ id, title, icon }) =>
                S.listItem()
                  .title(title)
                  .icon(icon)
                  .id(id)
                  .child(
                    S.editor()
                      .id(id)
                      .schemaType(id)
                      .documentId(id)
                      .title(title)
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

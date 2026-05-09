import type { StructureResolver } from "sanity/structure";

const SINGLETON_PAGES = [
  { id: "homePage", title: "Home" },
  { id: "aboutPage", title: "About" },
  { id: "visionPage", title: "Vision" },
  { id: "programsPage", title: "Programs" },
  { id: "impactPage", title: "Impact" },
  { id: "servicesPage", title: "Services" },
  { id: "partnersPage", title: "Partners" },
  { id: "contactPage", title: "Contact" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              SINGLETON_PAGES.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .id(id)
                  .child(
                    S.editor()
                      .id(id)
                      .schemaType(id)
                      .documentId(id)
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Programs")
        .schemaType("program")
        .child(S.documentTypeList("program").title("Programs")),
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),
      S.listItem()
        .title("Partner Types")
        .schemaType("partnerType")
        .child(S.documentTypeList("partnerType").title("Partner Types")),
      S.listItem()
        .title("Focus Areas")
        .schemaType("focusArea")
        .child(S.documentTypeList("focusArea").title("Focus Areas")),
      S.listItem()
        .title("Stats")
        .schemaType("stat")
        .child(S.documentTypeList("stat").title("Stats")),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
    ]);

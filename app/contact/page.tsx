import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery, contactFormSectionQuery } from "@/sanity/lib/queries";
import { defaultContactPage } from "@/lib/cms-defaults";
import { defaultContactFormSection } from "@/lib/contact-types";
import type { SimplePageData } from "@/lib/cms-types";
import type { ContactFormSectionData } from "@/lib/contact-types";
import View from "./view";

export default async function ContactPage() {
  const [pageResult, formSection] = await Promise.all([
    sanityFetch<SimplePageData>({ query: contactPageQuery }),
    sanityFetch<ContactFormSectionData>({ query: contactFormSectionQuery }),
  ]);
  const data = pageResult?.hero ? pageResult : defaultContactPage;
  return (
    <View
      data={data}
      formSection={
        formSection && formSection.reasonsTitle
          ? formSection
          : defaultContactFormSection
      }
    />
  );
}

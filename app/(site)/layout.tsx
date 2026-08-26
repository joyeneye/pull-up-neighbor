import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisableDraftButton from "@/components/DisableDraftButton";
import DraftMotionConfig from "@/components/DraftMotionConfig";
import DebouncedSanityLive from "@/components/DebouncedSanityLive";

/**
 * Chrome for the public website only.
 *
 * This used to live in the root layout, which meant /studio (and now /admin)
 * rendered inside the marketing navbar and footer. Route groups keep the URLs
 * identical while letting the admin surfaces opt out.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraft = (await draftMode()).isEnabled;
  const body = (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );

  return (
    <>
      {isDraft ? <DraftMotionConfig>{body}</DraftMotionConfig> : body}
      <DebouncedSanityLive />
      {isDraft && (
        <>
          <VisualEditing />
          <DisableDraftButton />
        </>
      )}
    </>
  );
}

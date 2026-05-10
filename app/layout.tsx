import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisableDraftButton from "@/components/DisableDraftButton";
import { SanityLive } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Pull Up Neighbor | Community. Capital. Culture.",
  description:
    "Pull Up Neighbor transforms communities through housing, disaster recovery, civic engagement, youth empowerment, and strategic partnerships.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraft = (await draftMode()).isEnabled;
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SanityLive />
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftButton />
          </>
        )}
      </body>
    </html>
  );
}

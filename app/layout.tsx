import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pullupneighbor.com"),
  title: "Pull Up Neighbor | Community. Capital. Culture.",
  description:
    "Pull Up Neighbor transforms communities through housing, disaster recovery, civic engagement, youth empowerment, and strategic partnerships.",
};

/**
 * Root layout is deliberately bare — just the document shell. The public site's
 * navbar/footer live in app/(site)/layout.tsx so /admin and /studio can render
 * without them.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

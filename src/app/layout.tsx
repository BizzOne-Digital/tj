import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bebas_Neue, Inter } from "next/font/google";
import { SiteAnnouncementBar, SiteHeader } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { PageLoader, ShotClockProgress } from "@/components/motion/PageLoader";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: "Mounties Youth Basketball",
  description:
    "Philipsburg-Osceola Mountaineer Elementary Basketball Program — camps, leagues, training, and AAU travel teams in Central Pennsylvania.",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/brand/favicon.png" />
        <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body>
        {!isAdmin && <PageLoader />}
        {!isAdmin && <ShotClockProgress />}
        {!isAdmin && <SiteAnnouncementBar />}
        {!isAdmin && <SiteHeader />}
        {isAdmin ? children : <main>{children}</main>}
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}

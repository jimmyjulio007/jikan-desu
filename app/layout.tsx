import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import { NavBar } from "./_components/nav";
import { ThemeProvider } from "@/components/theme.provider";
import { Analytics } from "@vercel/analytics/react"

const MontserraSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Jikan Desu",
  description: "Explore & Discover Manga Like Never Before",
  openGraph: {
    title: "Jikan Desu",
    description: "Explore & Discover Manga Like Never Before",
    url: "https://jikan-desu.vercel.app/",
    siteName: "Jikan Desu",
    images: [
      {
        url: "https://jikan-desu.vercel.app/jikan-og.png",
        width: 1200,
        height: 630,
        alt: "Jikan Desu Open Graph Image",
      },
    ],
    locale: "mg_MG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${MontserraSans.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

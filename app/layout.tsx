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
  title: "Welcome to Jikan Desu",
  description: "Your best platform to search for anime and manga",
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

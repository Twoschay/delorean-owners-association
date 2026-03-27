import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DeLorean Owners Association",
    template: "%s | DeLorean Owners Association",
  },
  description:
    "The world's premier DeLorean community. 5,000+ members, established 1983. Forums, events, classifieds, technical resources, and more.",
  keywords: ["DeLorean", "DMC-12", "DeLorean owners", "car club", "DOA"],
  openGraph: {
    title: "DeLorean Owners Association",
    description: "The world's premier DeLorean community since 1983.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

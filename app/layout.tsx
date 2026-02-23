import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FarmEasy",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  description:
    "Swipe, discover, and book stunning farmhouse stays with your squad. TikTok-style discovery, bento-grid details, and collaborative trip planning.",
  keywords: "farmhouse, vacation, booking, farm stay, weekend getaway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>

        {children}
      </body>
    </html>
  );
}

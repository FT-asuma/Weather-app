import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.sass";
import AppProvider from "@/context/AppProvider";

const mont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900", "800", "600"],
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "Vue Weather",
  description: "Hi there, the website provides you with the weather details",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mont.variable}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

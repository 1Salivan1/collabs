import Navigation from "../components/Navigation/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import "../styles/adaptive.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collabs",
  description: "Collabs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}

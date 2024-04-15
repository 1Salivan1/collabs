import Navigation from "../components/Navigation/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import "../styles/adaptive.scss";
import StoreProvider from "../providers/StoreProvider";
import AuthProvider from "../providers/AuthProvider";

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
    <StoreProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navigation />
            <main>{children}</main>
          </body>
        </html>
      </AuthProvider>
    </StoreProvider>
  );
}

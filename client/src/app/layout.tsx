import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Navigation from "../components/Navigation/Navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import "../styles/adaptive.scss";
import StoreProvider from "../providers/StoreProvider";
import AuthProvider from "../providers/AuthProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export const metadata: Metadata = {
  title: "Collabs",
  description: "Collabs",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AuthProvider>
        <html lang="uk" className={inter.className}>
          <body>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <Navigation />
                <main>{children}</main>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </body>
        </html>
      </AuthProvider>
    </StoreProvider>
  );
}

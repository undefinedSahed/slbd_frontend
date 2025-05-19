import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppProvider from "@/provider/app-provider";
import LayoutShell from "./layout-shell";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Super Lighting BD",
  description: "Best Lighting Service Provider in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <main>
          <AppProvider>
            <LayoutShell>{children}</LayoutShell>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}

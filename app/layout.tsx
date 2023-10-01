import "./globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { Providers } from "./redux/provider";
import Header from "./layout/Header";

// const poppins = Poppins({
//   weight: ["400", "300", "500", "600", "700"],
//   variable: "--font-family",
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Google Review Link Generator",
  description: "Google Review Link Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <ThemeRegistry>
          {/* <Header /> */}
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}

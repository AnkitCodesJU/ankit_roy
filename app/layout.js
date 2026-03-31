import localFont from "next/font/local";
import "./globals.css";
import Cursor from "./components/Cursor";

const roadRage = localFont({
  src: "./fonts/Road_Rage.otf",
  variable: "--font-road-rage",
});

const racingEngine = localFont({
  src: [
    {
      path: "./fonts/RacingEngine-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/RacingEngine-Sharps.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-racing-engine",
});

const sakana = localFont({
  src: "./fonts/Sakana.ttf",
  variable: "--font-sakana",
});

export const metadata = {
  title: "Ankit's Portfolio",
  description: "A portfolio showcasing my projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roadRage.variable} ${racingEngine.variable} ${sakana.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Cursor />
        {children}
      </body>
    </html>
  );
}

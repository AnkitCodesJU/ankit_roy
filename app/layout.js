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
  metadataBase: new URL("https://ankit-roy.vercel.app/"),
  title: {
    default: "Ankit Roy | Software Engineer & Full-Stack Developer",
    template: "%s | Ankit Roy",
  },
  description: "Portfolio of Ankit Roy, an Information Technology Sophomore at Jadavpur University specializing in Full-Stack MERN Development, C++, and scalable systems.",
  keywords: ["Ankit Roy", "Software Engineer", "Full-Stack Developer", "MERN Stack", "React", "Next.js", "JavaScript", "C++", "Jadavpur University", "Portfolio"],
  authors: [{ name: "Ankit Roy", url: "https://ankit-roy.vercel.app/" }],
  creator: "Ankit Roy",
  openGraph: {
    title: "Ankit Roy | Software Engineer & Full-Stack Developer",
    description: "Portfolio of Ankit Roy, an Information Technology Sophomore at Jadavpur University specializing in Full-Stack MERN Development.",
    url: "https://ankit-roy.vercel.app/",
    siteName: "Ankit Roy Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Roy | Software Engineer & Full-Stack Developer",
    description: "Portfolio of Ankit Roy, an Information Technology Sophomore at Jadavpur University specializing in Full-Stack MERN Development.",
    creator: "@ankitroy72006",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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

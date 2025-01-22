import "@mantine/core/styles.css";
import "@/app/ui/globals.css";

import { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { theme } from "@/theme";
import ReactQueryProvider from "./ui/react-query-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default:
      "meowracle.live | Create Stunning LinkedIn Cover Images To Highlight Your AWS Certifications",
    template:
      "%s | meowracle.live | Create Stunning LinkedIn Cover Images To Highlight Your AWS Certifications",
  },
  description:
    "Effortlessly create stunning LinkedIn Cover Images to showcase your AWS certifications. This application provides templates and tools to design professional-looking banners for social media, LinkedIn, and more, highlighting your AWS accomplishments.",
};

const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased overflow-x-hidden scroll-smooth"
      >
        <MantineProvider theme={theme}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId={gaId!} />
    </html>
  );
}

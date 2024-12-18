import "@/app/ui/globals.css";
import "@mantine/core/styles.css";

import { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { theme } from "@/theme";

export const metadata: Metadata = {
  title: {
    default: "Meowracle.live | Create Stunning AWS Certification Banners",
    template: "%s | Meowracle.live | Create Stunning AWS Certification Banners",
  },
  description:
    "Effortlessly create stunning banners to showcase your AWS certifications. This application provides templates and tools to design professional-looking banners for social media, LinkedIn, and more, highlighting your AWS accomplishments.",
};

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
      <body suppressHydrationWarning className="antialiased">
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}

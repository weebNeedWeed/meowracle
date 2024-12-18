import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { nunito } from "@/app/ui/fonts";

export const theme = createTheme({
  fontFamily: nunito.style.fontFamily,
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily: `${nunito.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
});

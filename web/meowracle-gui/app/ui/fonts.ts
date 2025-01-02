import { Montserrat, Nunito, Open_Sans, Poppins } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "300", "900", "500", "800", "600"],
});

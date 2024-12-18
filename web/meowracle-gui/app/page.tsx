"use client";

import { HeroText } from "@/app/ui/hero-text";
import Usage from "@/app/ui/usage";
import { Footer } from "@/app/ui/footer";
import Navbar from "@/app/ui/navbar";

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroText />
      <Usage />
      <Footer />
    </main>
  );
}

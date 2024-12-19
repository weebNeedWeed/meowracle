import HeroText from "@/app/ui/hero-text";
import Usage from "@/app/ui/usage";
import Footer from "@/app/ui/footer";
import Menubar from "@/app/ui/menubar";

export default function Page() {
  return (
    <main>
      <Menubar />
      <HeroText />
      <Usage />
      <Footer />
    </main>
  );
}

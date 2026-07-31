import { Backdrop } from "./components/Backdrop";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { WorkIndex } from "./components/WorkIndex";
import { About } from "./components/About";
import { Stack } from "./components/Stack";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MARQUEE_ITEMS } from "./data/projects";

export default function App() {
  return (
    <div>
      <Backdrop />

      <Nav />

      <main>
        <Hero />

        <Marquee items={MARQUEE_ITEMS} className="py-4 border-t border-b border-border" />

        <WorkIndex />

        <Marquee
          items={MARQUEE_ITEMS}
          reverse
          className="py-4 border-t border-b border-border"
        />

        <About />

        <Stack />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

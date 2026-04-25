import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarsBackground from "../components/StarsBackground";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
      <StarsBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

export default Home;
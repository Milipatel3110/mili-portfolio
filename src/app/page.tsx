import Navbar from "@/components/common/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="bg-mesh min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Experience />
      <Research />
      <Certificates />
      <Contact />
      <Footer />
      {/* next: Skills, Experience, Education, Research, Certificates, Contact */}
    </main>
  );
}



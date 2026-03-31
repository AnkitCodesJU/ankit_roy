import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import GithubStats from './components/GithubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Achievements />
      <GithubStats />
      <Contact />
      <Footer />
    </>
  );
}

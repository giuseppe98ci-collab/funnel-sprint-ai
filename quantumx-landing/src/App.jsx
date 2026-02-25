import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Problems from './components/Problems';
import About from './components/About';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#010B32] min-h-screen text-white font-sans overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <Problems />
        <About />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;

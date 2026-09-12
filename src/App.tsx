import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FocusArea } from './components/FocusArea';
import { ProjectFeature } from './components/ProjectFeature';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IntroSignature } from './components/IntroSignature';

export const App: React.FC = () => {
  return (
    <div className="portfolio-app-root relative min-h-screen bg-[#060709] text-[#ededed] font-sans selection:bg-white/20 selection:text-white transition-colors duration-300">
      <IntroSignature />
      <Navbar />
      <main id="main-content">
        <Hero />
        <FocusArea />
        <ProjectFeature />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;

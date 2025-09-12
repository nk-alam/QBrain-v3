import React from 'react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import DynamicAchievements from '../components/DynamicAchievements';
import DynamicTeamStructure from '../components/DynamicTeamStructure';
import JoinTeam from '../components/JoinTeam';
import BlogSection from '../components/BlogSection';
import TechFocus from '../components/TechFocus';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import WelcomeManager from '../components/WelcomeManager';

const HomePage = () => {
  return (
    <>
      <SEOHead
        title="Qbrain Team - Elite B.Tech Student Technology Team | AUAT Techfest Winners"
        description="Join Qbrain Team, an elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions. AUAT Techfest 2025 Winners. Apply now for hackathon excellence."
        keywords="qbrain team, hackathon winners, AI IoT team, B.Tech students, smart india hackathon, tech competition, BWU, AUAT techfest, innovation team"
        url="https://qbrain.in"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white relative">
        <ParticleBackground />
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <DynamicAchievements />
          <DynamicTeamStructure />
          <JoinTeam />
          <BlogSection />
          <TechFocus />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WelcomeManager />
      </div>
    </>
  );
};

export default HomePage;
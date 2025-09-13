import React from 'react';
import { Heart, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import DynamicAchievements from '../components/DynamicAchievements';
import DynamicTeamStructure from '../components/DynamicTeamStructure';
import JoinTeam from '../components/JoinTeam';
import BlogSection from '../components/BlogSection';
import ProjectsSection from '../components/ProjectsSection';
import TechFocus from '../components/TechFocus';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import WelcomeManager from '../components/WelcomeManager';

const HomePage = () => {
  const navigate = useNavigate();

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
          <ProjectsSection />
          <div id="donate" className="py-20 bg-slate-900/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-400/10 to-red-400/10 border border-pink-400/30 rounded-full backdrop-blur-sm mb-6 sm:mb-8">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 mr-2 sm:mr-3" />
                  <span className="text-sm sm:text-base font-bold text-pink-400">Support Our Mission</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                  Help Us Innovate
                </h2>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto px-4 mb-8">
                  Your support enables us to participate in more hackathons, develop cutting-edge solutions, and build tomorrow's technology today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => navigate('/donate')}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-400/25 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Support Our Team
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => navigate('/projects')}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-pink-400/50 text-pink-400 font-semibold rounded-full hover:bg-pink-400/15 hover:border-pink-400 transition-all duration-300 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">
                      <Folder className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      View Our Work
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          <BlogSection />
          <TechFocus />
          <FAQ />
        </main>
        <Footer />
        <WelcomeManager />
      </div>
    </>
  );
};

export default HomePage;
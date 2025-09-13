import React, { useState, useEffect } from 'react';
import { ChevronDown, Trophy, Users, Lightbulb, Target, Rocket, Code, Zap, Brain, Shield, Award, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Slider from './ui/Slider';
import AnimatedSection from './ui/AnimatedSection';
import { useHackathons, useAchievements } from '../hooks/useFirebaseData';
import { format } from 'date-fns';

const Hero = () => {
  const navigate = useNavigate();
  const { hackathons } = useHackathons();
  const { achievements } = useAchievements();
  const [stats, setStats] = useState({ projects: 0, hackathons: 0, members: 0 });
  const finalStats = { projects: 15, hackathons: 8, members: 6 };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 50;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          projects: Math.floor(finalStats.projects * progress),
          hackathons: Math.floor(finalStats.hackathons * progress),
          members: Math.floor(finalStats.members * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Create slides from achievements and hackathons
  const createSlides = () => {
    const slides = [];
    
    // Add main hero slide
    slides.push({
      id: 'main',
      title: 'Building Tomorrow\'s Technology Today',
      description: 'Elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions',
      badge: 'AUAT Techfest 2025 Winners',
      action: {
        label: 'Join Our Team',
        onClick: () => navigate('/join')
      }
    });

    // Add achievement slides
    const recentAchievements = achievements.slice(0, 3);
    recentAchievements.forEach((achievement: any) => {
      slides.push({
        id: achievement.id,
        // title: achievement.title,
        // description: achievement.description,
        image: achievement.images?.[0],
        // badge: achievement.position || achievement.category,
        action: {
          label: 'View Achievements',
          onClick: () => navigate('/achievements')
        }
      });
    });

    // Add hackathon slides
    const recentHackathons = hackathons.filter((h: any) => h.status === 'completed').slice(0, 2);
    recentHackathons.forEach((hackathon: any) => {
      slides.push({
        id: hackathon.id,
        // title: hackathon.title,
        // description: hackathon.description,
        image: hackathon.imageUrl,
        badge: hackathon.result || 'Competition',
        action: {
          label: 'View Projects',
          onClick: () => navigate('/achievements')
        }
      });
    });

    return slides;
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const missionItems = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Developing cutting-edge artificial intelligence solutions"
    },
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Writing clean, scalable, and efficient code"
    },
    {
      icon: Rocket,
      title: "Competition Ready",
      description: "Building winning solutions for hackathons"
    },
    {
      icon: Shield,
      title: "Reliable Solutions",
      description: "Creating robust and secure applications"
    }
  ];

  return (
    <div className="min-h-screen mt-2">
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        {/* Enhanced Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400 rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-green-400 rotate-12 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-cyan-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-green-400 rotate-45 animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-cyan-400 rounded-full animate-pulse delay-700"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
            
            {/* Hero Slider */}
            <AnimatedSection animation="fadeIn" className="w-full max-w-6xl mb-16">
              <div className="relative -mx-6 sm:-mx-12 lg:-mx-24">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-3xl blur-2xl"></div>
                <div className="relative h-[500px] sm:h-[600px]">
                  <Slider
                    slides={createSlides()}
                    autoplay={true}
                    effect="fade"
                    showNavigation={true}
                    showPagination={true}
                    className="h-full"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Brand Logo */}
            <AnimatedSection animation="scale" delay={0.3} className="mb-8">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-none"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="bg-gradient-to-r from-white via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Qbrain
                </span>
              </motion.h1>
              <motion.h2 
                className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Where Innovation Meets Excellence
              </motion.h2>
            </AnimatedSection>

            {/* Mission Section */}
            <AnimatedSection animation="slideUp" delay={0.4} className="w-full max-w-6xl mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/5 to-green-400/5 border border-cyan-400/10 rounded-full backdrop-blur-sm mb-6">
                  <Target className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-sm font-medium text-cyan-400">Our Mission</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Transforming Ideas into Reality
                </h3>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  We're dedicated to pushing the boundaries of technology through innovative solutions, competitive excellence, and collaborative teamwork.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {missionItems.map((item, index) => {
                  const Icon = item.icon;
                  const isEven = index % 2 === 0;
                  const colorClasses = isEven 
                    ? 'from-cyan-400/10 to-cyan-400/5 border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400'
                    : 'from-green-400/10 to-green-400/5 border-green-400/20 hover:border-green-400/40 text-green-400';
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                      <div className={`relative bg-slate-800/50 border ${colorClasses.split(' ').slice(2, 4).join(' ')} rounded-xl p-6 backdrop-blur-sm transition-all duration-300 text-center group-hover:transform group-hover:scale-105 h-full flex flex-col`}>
                        <Icon className={`h-10 w-10 ${colorClasses.split(' ').slice(4).join(' ')} mx-auto mb-4`} />
                        <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed flex-grow">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="slideUp" delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
              <motion.button
                onClick={() => navigate('/join')}
                className="relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-base sm:text-lg rounded-full hover:shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300 transform hover:scale-110 group w-full sm:w-auto sm:min-w-52"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Join Our Team
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 rounded-full transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/achievements')}
                className="relative px-8 sm:px-12 py-4 sm:py-5 border-2 border-cyan-400/50 text-cyan-400 font-semibold text-base sm:text-lg rounded-full hover:bg-cyan-400/15 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto sm:min-w-52 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  View Projects
                </span>
              </motion.button>
            </AnimatedSection>

            {/* Enhanced Stats Counter */}
            <AnimatedSection animation="slideUp" delay={1.0} className="w-full max-w-5xl px-4">
              <div className="text-center mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Our Achievements</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-cyan-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full mb-6">
                        <Lightbulb className="h-12 w-12 text-cyan-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.projects}+</div>
                      <div className="text-base text-gray-400 font-medium">Projects Completed</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-green-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full mb-6">
                        <Trophy className="h-12 w-12 text-green-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.hackathons}+</div>
                      <div className="text-base text-gray-400 font-medium">Hackathons Won</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-cyan-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full mb-6">
                        <Users className="h-12 w-12 text-cyan-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.members}</div>
                      <div className="text-base text-gray-400 font-medium">Specialized Roles</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div 
              className="flex flex-col items-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-xs text-gray-500 mb-2">Discover More</span>
              <button
                onClick={() => scrollToSection('about')}
                className="text-cyan-400 hover:text-green-400 transition-colors duration-300 p-3 rounded-full hover:bg-cyan-400/10"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
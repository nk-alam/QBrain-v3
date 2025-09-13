import React from 'react';
import { Target, Eye, Heart, Award, Users, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technology solutions that transform industries',
      color: 'cyan',
      features: ['AI Integration', 'Novel Approaches', 'Creative Problem-Solving']
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for perfection in every project and competition with uncompromising quality',
      color: 'green',
      features: ['Quality Assurance', 'Best Practices', 'Continuous Improvement']
    },
    {
      icon: Heart,
      title: 'Teamwork',
      description: 'Collaborative spirit driving collective success through unified effort and shared vision',
      color: 'cyan',
      features: ['Collaborative Culture', 'Knowledge Sharing', 'Mutual Support']
    },
    {
      icon: Eye,
      title: 'Technical Mastery',
      description: 'Deep expertise across AI, IoT, and emerging technologies with proven track record',
      color: 'green',
      features: ['Advanced Skills', 'Cutting-edge Tech', 'Expert Knowledge']
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Team Formation',
      description: 'Assembled our elite B.Tech student technology team with specialized roles',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'AUAT Techfest Victory',
      description: 'Won first place with our AI-powered Smart Helmet solution',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'SIH Qualification',
      description: 'Target: Smart India Hackathon participation and victory',
      status: 'upcoming'
    },
    {
      year: '2025',
      title: 'National Recognition',
      description: 'Goal: Top 10 finish in national-level technology competitions',
      status: 'upcoming'
    }
  ];

  return (
    <>
      <SEOHead
        title="About Qbrain Team - Our Mission, Vision & Values | Elite B.Tech Technology Team"
        description="Learn about Qbrain Team's mission to transform innovative ideas into breakthrough technology solutions. Meet our team leader and discover our core values driving hackathon success."
        keywords="about qbrain, team mission, technology innovation, B.Tech student team, hackathon excellence, AI IoT solutions, team values"
        url="https://qbrain.in/about"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-20">
                <div className="relative inline-block mb-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    About Qbrain
                  </h1>
                  <div className="absolute -top-4 -right-4">
                    <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />
                  </div>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
                  An elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions
                </p>
              </AnimatedSection>

              {/* Mission & Vision */}
              <div className="grid lg:grid-cols-2 gap-12 mb-24">
                <AnimatedSection animation="slideLeft" className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-slate-800/70 border-2 border-cyan-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 h-full flex flex-col">
                    
                    <div className="flex items-center mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                        <div className="relative p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-2xl">
                          <Target className="h-10 w-10 text-cyan-400" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-white ml-4">Our Mission</h2>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg flex-grow">
                      To transform innovative ideas into breakthrough technology solutions that win competitions and create real-world impact. We operate on an annual innovation cycle, participating in major hackathons to showcase our technical prowess and build solutions that solve complex problems.
                    </p>
                    
                    <div className="space-y-4">
                      {['Innovation Excellence', 'Quality Assurance', 'Rapid Development'].map((item, index) => (
                        <div key={index} className="flex items-center text-cyan-400 group/item p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
                          <span className="text-base font-bold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slideRight" className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-slate-800/70 border-2 border-green-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-green-400/60 transition-all duration-500 h-full flex flex-col">
                    
                    <div className="flex items-center mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                        <div className="relative p-4 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-2xl">
                          <Eye className="h-10 w-10 text-green-400" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-white ml-4">Our Vision</h2>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg flex-grow">
                      To become the most recognized student technology team in the region, consistently delivering innovative solutions that win competitions while nurturing the next generation of tech leaders through hands-on experience and mentorship.
                    </p>
                    
                    <div className="space-y-4">
                      {['Regional Leadership', 'Student Mentorship', 'Global Impact'].map((item, index) => (
                        <div key={index} className="flex items-center text-green-400 group/item p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-4 group-hover/item:scale-125 transition-transform duration-300"></div>
                          <span className="text-base font-bold">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Team Leader Section */}
              <AnimatedSection animation="slideUp" className="mb-24">
                <div className="relative group max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-slate-800/70 border-2 border-yellow-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-yellow-400/60 transition-all duration-500">
                    
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                        <div className="relative p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl">
                          <Crown className="h-12 w-12 text-yellow-400" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-white ml-4">Team Leadership</h2>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg opacity-40 animate-spin" style={{animationDuration: '4s'}}></div>
                        <img 
                          src="https://lh3.googleusercontent.com/a/ACg8ocIYx7XYWzU5LvX5ajcNi6HSCYXpPEIHO4jwpj8HdFKJCsSZzXCq=s576-c-no" 
                          alt="Nurkausar Alam" 
                          className="relative w-48 h-48 rounded-full object-cover border-4 border-slate-700 shadow-2xl z-10"
                        />
                        <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-800 z-20 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-white mb-3">Nurkausar Alam</h3>
                        <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-4">
                          <p className="text-black font-bold">Founding Member & Team Lead</p>
                        </div>
                        <p className="text-gray-400 text-lg mb-4">B.Tech CSE AI & Robotics, First Year</p>
                        
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                          <span className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-bold border border-yellow-400/30">AI Specialist</span>
                          <span className="px-4 py-2 bg-orange-400/20 text-orange-400 rounded-full text-sm font-bold border border-orange-400/30">Team Leader</span>
                          <span className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-bold border border-yellow-400/30">Strategy</span>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed text-lg">
                          Driving vision and strategy for technical excellence and competition success. Leading our team with innovative thinking and strategic planning to achieve breakthrough results in every hackathon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Core Values */}
              <AnimatedSection animation="slideUp" className="mb-24">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Core Values</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                    The principles that guide every decision we make and every solution we build
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    const colorClasses = value.color === 'cyan' 
                      ? 'border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400'
                      : 'border-green-400/30 hover:border-green-400/60 text-green-400';
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group h-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className={`relative bg-slate-800/70 border-2 ${colorClasses} rounded-3xl p-10 backdrop-blur-md transition-all duration-500 text-center h-full flex flex-col group-hover:transform group-hover:scale-105`}>
                          
                          <div className="relative mb-6">
                            <div className={`relative p-4 ${value.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-green-400/10'} rounded-2xl w-fit mx-auto`}>
                              <Icon className={`h-12 w-12 ${colorClasses.split(' ')[2]}`} />
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-6">{value.title}</h3>
                          <p className="text-gray-300 leading-relaxed flex-grow mb-6">{value.description}</p>
                          
                          <div className="space-y-2">
                            {value.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center justify-center text-sm">
                                <div className={`w-2 h-2 ${value.color === 'cyan' ? 'bg-cyan-400' : 'bg-green-400'} rounded-full mr-2`}></div>
                                <span className="text-gray-400 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Timeline */}
              <AnimatedSection animation="slideUp" className="mb-20">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">Our Journey</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Key milestones in our path to becoming a leading student technology team
                  </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-cyan-400"></div>
                    
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
                      >
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full border-4 border-slate-900 z-10"></div>
                        
                        <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                          <div className="relative group">
                            <div className={`absolute inset-0 ${milestone.status === 'completed' ? 'bg-gradient-to-r from-green-400/10 to-cyan-400/10' : 'bg-gradient-to-r from-cyan-400/10 to-blue-400/10'} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                            <div className={`relative bg-slate-800/50 border ${milestone.status === 'completed' ? 'border-green-400/20 hover:border-green-400/40' : 'border-cyan-400/20 hover:border-cyan-400/40'} rounded-xl p-6 backdrop-blur-sm transition-all duration-300`}>
                              <div className="flex items-center justify-between mb-3">
                                <span className={`text-2xl font-bold ${milestone.status === 'completed' ? 'text-green-400' : 'text-cyan-400'}`}>
                                  {milestone.year}
                                </span>
                                <div className={`px-2 py-1 text-xs rounded-full ${
                                  milestone.status === 'completed' 
                                    ? 'bg-green-400/20 text-green-400' 
                                    : 'bg-cyan-400/20 text-cyan-400'
                                }`}>
                                  {milestone.status}
                                </div>
                              </div>
                              <h4 className="text-lg font-semibold text-white mb-2">{milestone.title}</h4>
                              <p className="text-gray-400 text-sm">{milestone.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* CTA Section */}
              <AnimatedSection animation="fadeIn" className="text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Mission?</h3>
                    <p className="text-gray-400 mb-6">
                      Be part of our journey to create breakthrough technology solutions and win competitions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={() => window.location.href = '/#join'}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Our Team
                      </motion.button>
                      <motion.button
                        onClick={() => window.location.href = '/contact'}
                        className="px-8 py-4 border border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us
                      </motion.button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
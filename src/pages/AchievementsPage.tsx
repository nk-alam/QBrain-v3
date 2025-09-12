import React from 'react';
import { Trophy, Calendar, MapPin, Award, Users, Star, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AchievementCard from '../components/AchievementCard';
import { useHackathons, useAchievements } from '../hooks/useFirebaseData';

const AchievementsPage = () => {
  const navigate = useNavigate();
  const { hackathons, loading: hackathonsLoading } = useHackathons();
  const { achievements, loading: achievementsLoading } = useAchievements();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const loading = hackathonsLoading || achievementsLoading;
  
  const handleAchievementClick = (achievementId: string) => {
    const achievement = achievements.find((a: any) => a.id === achievementId);
    if (achievement && achievement.slug) {
      navigate(`/achievements/${achievement.slug}`);
    } else {
      navigate(`/achievements/${achievementId}`);
    }
  };

  // Filter achievements
  const filteredAchievements = achievements.filter((achievement: any) => {
    const matchesSearch = achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(achievements.map((achievement: any) => achievement.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading achievements..." />
        </div>
        <Footer />
      </div>
    );
  }

  const completedHackathons = hackathons.filter((h: any) => h.status === 'completed');

  return (
    <>
      <SEOHead
        title="Achievements - Qbrain Team | Hackathon Winners & Tech Competitions"
        description="Explore Qbrain Team's achievements including AUAT Techfest 2025 victory, hackathon wins, and technical excellence in AI, IoT, and innovation competitions."
        keywords="qbrain achievements, hackathon winners, AUAT techfest, tech competition victories, AI IoT projects, student achievements"
        url="https://qbrain.in/achievements"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Our Achievements
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Celebrating our journey of innovation, competition victories, and technical excellence in the world of technology
                </p>
              </AnimatedSection>

              {/* Featured Achievement */}
              {completedHackathons.length > 0 && (
                <AnimatedSection animation="slideUp" className="mb-20">
                  <div className="relative group max-w-5xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-yellow-400/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                      
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full mb-4">
                          <Star className="h-5 w-5 mr-2" />
                          <span className="font-bold">Featured Achievement</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                          🏆 AUAT Techfest 2025 Winners
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed">
                          Our flagship victory showcasing innovation in AI-powered smart helmet technology
                        </p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-6 bg-slate-700/30 rounded-xl">
                          <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-white mb-2">First Place</h3>
                          <p className="text-gray-400">Out of 200+ teams</p>
                        </div>
                        <div className="p-6 bg-slate-700/30 rounded-xl">
                          <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-white mb-2">Innovation Award</h3>
                          <p className="text-gray-400">Best Technical Solution</p>
                        </div>
                        <div className="p-6 bg-slate-700/30 rounded-xl">
                          <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-white mb-2">Team Excellence</h3>
                          <p className="text-gray-400">Outstanding Collaboration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Hackathons Grid */}
              {completedHackathons.length > 0 && (
                <AnimatedSection animation="slideUp" className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Competition History</h2>
                    <p className="text-gray-400 text-lg">Our journey through various hackathons and tech competitions</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {completedHackathons.map((hackathon: any, index: number) => (
                      <motion.div
                        key={hackathon.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 h-full">
                          
                          {hackathon.imageUrl && (
                            <div className="h-48 overflow-hidden">
                              <img
                                src={hackathon.imageUrl}
                                alt={hackathon.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                                hackathon.result?.toLowerCase().includes('first') || hackathon.result?.toLowerCase().includes('winner')
                                  ? 'bg-yellow-400/20 text-yellow-400'
                                  : 'bg-green-400/20 text-green-400'
                              }`}>
                                {hackathon.status}
                              </span>
                              {hackathon.result && (
                                <div className="flex items-center text-yellow-400">
                                  <Trophy className="h-4 w-4 mr-1" />
                                  <span className="text-sm font-semibold">{hackathon.result}</span>
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2">{hackathon.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{hackathon.description}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-gray-400 text-xs">
                                <Calendar className="h-3 w-3 mr-2" />
                                {hackathon.date?.toDate ? format(hackathon.date.toDate(), 'MMM dd, yyyy') : 'TBD'}
                              </div>
                              {hackathon.location && (
                                <div className="flex items-center text-gray-400 text-xs">
                                  <MapPin className="h-3 w-3 mr-2" />
                                  {hackathon.location}
                                </div>
                              )}
                            </div>
                            
                            {hackathon.technologies && (
                              <div className="flex flex-wrap gap-1">
                                {hackathon.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {hackathon.technologies.length > 3 && (
                                  <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded">
                                    +{hackathon.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Achievement Gallery */}
              {!achievementsLoading && filteredAchievements.length > 0 && (
                <AnimatedSection animation="slideUp" className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Achievement Gallery</h2>
                    <p className="text-gray-400 text-lg">Showcasing our diverse accomplishments and recognitions</p>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search achievements..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                        />
                      </div>
                      
                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category} className="bg-slate-800">
                              {category === 'all' ? 'All Categories' : category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAchievements.map((achievement: any, index: number) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onClick={() => handleAchievementClick(achievement.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* CTA Section */}
              <AnimatedSection animation="fadeIn" className="text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Achieve More?</h3>
                    <p className="text-gray-400 mb-6">
                      Join our team and be part of the next breakthrough achievement in technology and innovation.
                    </p>
                    <motion.button
                      onClick={() => window.location.href = '/#join'}
                      className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Our Team
                    </motion.button>
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

export default AchievementsPage;
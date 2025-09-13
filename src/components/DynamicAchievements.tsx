import React from 'react';
import { Trophy, Calendar, Users, Target, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHackathons, useAchievements } from '../hooks/useFirebaseData';
import { format } from 'date-fns';
import AchievementCard from './AchievementCard';

const DynamicAchievements = () => {
  const navigate = useNavigate();
  const { hackathons, loading } = useHackathons();
  const { achievements, loading: achievementsLoading } = useAchievements();

  const staticMilestones = [
    {
      year: '2025',
      title: 'Team Formation',
      description: 'Assembling specialized tech team',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'SIH Qualification',
      description: 'Target: Smart India Hackathon participation',
      status: 'upcoming'
    },
    {
      year: '2025',
      title: 'National Recognition',
      description: 'Goal: Top 10 finish in national competition',
      status: 'upcoming'
    }
  ];

  if (loading) {
    return (
      <section id="achievements" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading achievements...</p>
          </div>
        </div>
      </section>
    );
  }

  const completedHackathons = hackathons.filter((h: any) => h.status === 'completed');
  const featuredHackathon = completedHackathons.find((h: any) => h.result?.toLowerCase().includes('first') || h.result?.toLowerCase().includes('winner')) || completedHackathons[0];

  const handleAchievementClick = (achievementId: string) => {
    const achievement = achievements.find((a: any) => a.id === achievementId);
    if (achievement && achievement.slug) {
      navigate(`/achievements/${achievement.slug}`);
    } else {
      navigate(`/achievements/${achievementId}`);
    }
  };

  const handleViewAllAchievements = () => {
    navigate('/achievements');
  };

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Our Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Celebrating our journey of innovation, competition victories, and technical excellence
            </p>
          </div>

          {/* Featured Achievement */}
          {featuredHackathon && (
            <div className="mb-16">
              <div className="relative group max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-yellow-400/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                  {featuredHackathon.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={featuredHackathon.imageUrl}
                        alt={featuredHackathon.title}
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <Trophy className="h-16 w-16 text-yellow-400" />
                      <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      🏆 {featuredHackathon.title}
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed mb-4">
                      {featuredHackathon.description}
                    </p>
                    {featuredHackathon.result && (
                      <div className="text-2xl font-bold text-yellow-400 mb-4">
                        {featuredHackathon.result}
                      </div>
                    )}
                    <div className="text-gray-400">
                      {featuredHackathon.date?.toDate && format(featuredHackathon.date.toDate(), 'MMMM yyyy')} • {featuredHackathon.location}
                    </div>
                  </div>

                  {featuredHackathon.technologies && (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {featuredHackathon.technologies.map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-700/50 border border-yellow-400/20 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All Hackathons Grid */}
          {hackathons.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center text-white mb-8">Competition History</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hackathons.map((hackathon: any) => (
                  <div key={hackathon.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                      {hackathon.imageUrl && (
                        <img
                          src={hackathon.imageUrl}
                          alt={hackathon.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{hackathon.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          hackathon.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                          hackathon.status === 'ongoing' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-blue-400/20 text-blue-400'
                        }`}>
                          {hackathon.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {hackathon.date?.toDate ? format(hackathon.date.toDate(), 'MMM yyyy') : 'TBD'}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{hackathon.description}</p>
                      
                      {hackathon.result && (
                        <div className="text-green-400 text-sm font-medium mb-3">
                          🏆 {hackathon.result}
                        </div>
                      )}
                      
                      {hackathon.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {hackathon.technologies.slice(0, 3).map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {hackathon.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded">
                              +{hackathon.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Gallery */}
          {!achievementsLoading && achievements.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center text-white mb-8">Achievement Gallery</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.slice(0, 6).map((achievement: any, index: number) => (
                  <div
                    key={achievement.id}
                    className="cursor-pointer"
                    onClick={() => handleAchievementClick(achievement.id)}
                  >
                    <AchievementCard
                      achievement={achievement}
                      onClick={() => handleAchievementClick(achievement.id)}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              
              {achievements.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleViewAllAchievements}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span>View All Achievements</span>
                    <Trophy className="h-4 w-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-12">Our Journey Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-cyan-400"></div>
              
              {/* Dynamic hackathon milestones */}
              {completedHackathons.map((hackathon: any, index: number) => (
                <div key={hackathon.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full border-4 border-slate-900 z-10"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/50 border border-green-400/20 hover:border-green-400/40 rounded-xl p-6 backdrop-blur-sm transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-green-400">
                            {hackathon.date?.toDate ? format(hackathon.date.toDate(), 'yyyy') : '2024'}
                          </span>
                          <Trophy className="h-5 w-5 text-green-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{hackathon.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{hackathon.description}</p>
                        {hackathon.result && (
                          <p className="text-green-400 text-sm font-medium">🏆 {hackathon.result}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Static milestones */}
              {staticMilestones.map((milestone, index) => {
                const adjustedIndex = completedHackathons.length + index;
                return (
                  <div key={milestone.title} className={`relative flex items-center ${adjustedIndex % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full border-4 border-slate-900 z-10"></div>
                    
                    <div className={`w-5/12 ${adjustedIndex % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${milestone.status === 'completed' ? 'from-green-400/10 to-cyan-400/10' : 'from-cyan-400/10 to-blue-400/10'} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                        <div className={`relative bg-slate-800/50 border ${milestone.status === 'completed' ? 'border-green-400/20 hover:border-green-400/40' : 'border-cyan-400/20 hover:border-cyan-400/40'} rounded-xl p-6 backdrop-blur-sm transition-all duration-300`}>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-2xl font-bold ${milestone.status === 'completed' ? 'text-green-400' : 'text-cyan-400'}`}>
                              {milestone.year}
                            </span>
                            {milestone.status === 'completed' ? (
                              <Trophy className="h-5 w-5 text-green-400" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-cyan-400" />
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">{milestone.title}</h4>
                          <p className="text-gray-400 text-sm">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicAchievements;
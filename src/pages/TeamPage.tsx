import React from 'react';
import { Users, Mail, Linkedin, Github, Star, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useTeamMembers } from '../hooks/useFirebaseData';

const TeamPage = () => {
  const { members, loading } = useTeamMembers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading team members..." />
        </div>
        <Footer />
      </div>
    );
  }

  const teamRoles = [
    {
      title: 'Team Leader & App Developer',
      description: 'Strategic leadership, mobile/web development, project coordination',
      skills: ['Leadership', 'React/React Native', 'Project Management', 'Full-stack Development'],
      icon: Crown,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      title: 'Hardware & Circuit Designer',
      description: 'PCB design, embedded systems, hardware prototyping',
      skills: ['PCB Design', 'Electronics', 'CAD Tools', 'Prototyping'],
      icon: Users,
      color: 'from-cyan-400 to-blue-400'
    },
    {
      title: 'Embedded/IoT Specialist',
      description: 'IoT solutions, sensor integration, embedded programming',
      skills: ['Arduino/Raspberry Pi', 'IoT Protocols', 'C/C++', 'Sensor Integration'],
      icon: Users,
      color: 'from-green-400 to-teal-400'
    },
    {
      title: 'AI/ML Engineer',
      description: 'Machine learning models, data analysis, AI integration',
      skills: ['Python/TensorFlow', 'Data Science', 'Deep Learning', 'Computer Vision'],
      icon: Users,
      color: 'from-purple-400 to-pink-400'
    },
    {
      title: 'Networking/Communication Specialist',
      description: 'Network protocols, communication systems, backend development',
      skills: ['Network Protocols', 'API Development', 'Database Design', 'System Architecture'],
      icon: Users,
      color: 'from-indigo-400 to-cyan-400'
    },
    {
      title: 'UI/UX & Testing Engineer',
      description: 'User interface design, user experience, quality assurance',
      skills: ['UI/UX Design', 'Testing Frameworks', 'Figma/Adobe XD', 'User Research'],
      icon: Users,
      color: 'from-pink-400 to-rose-400'
    }
  ];

  return (
    <>
      <SEOHead
        title="Our Team - Qbrain | Meet the Elite B.Tech Technology Specialists"
        description="Meet the talented members of Qbrain Team - specialized roles in AI/ML, IoT, hardware design, and software development. Join our elite B.Tech student technology team."
        keywords="qbrain team members, AI ML engineers, IoT specialists, hardware designers, software developers, B.Tech students, tech team"
        url="https://qbrain.in/team"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Meet Our Team
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Get to know the talented individuals who drive innovation and excellence in our technology team
                </p>
              </AnimatedSection>

              {/* Current Team Members */}
              {members.length > 0 && (
                <AnimatedSection animation="slideUp" className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                      <Award className="h-8 w-8 text-cyan-400" />
                      Current Team Members
                      <Award className="h-8 w-8 text-green-400" />
                    </h2>
                    <p className="text-gray-400 text-lg">Our dedicated professionals driving innovation forward</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member: any, index: number) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-slate-800/60 border-2 border-cyan-400/30 rounded-3xl p-8 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 hover:transform hover:scale-105 h-full">
                          
                          {/* Profile Image */}
                          <div className="relative mb-6 flex justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full blur-md animate-pulse opacity-30"></div>
                              {member.imageUrl ? (
                                <img
                                  src={member.imageUrl}
                                  alt={member.name}
                                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 relative z-10 shadow-2xl"
                                />
                              ) : (
                                <div className="w-32 h-32 rounded-full bg-slate-700 border-4 border-slate-600 flex items-center justify-center relative z-10 shadow-2xl">
                                  <Users className="h-16 w-16 text-gray-400" />
                                </div>
                              )}
                              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-slate-800 z-20 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </div>

                          {/* Member Info */}
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3">
                              <p className="text-black font-bold text-sm">{member.role}</p>
                            </div>
                            {member.description && (
                              <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                            )}
                          </div>

                          {/* Skills */}
                          {member.skills && Array.isArray(member.skills) && (
                            <div className="mb-6">
                              <div className="flex flex-wrap gap-2 justify-center">
                                {member.skills.slice(0, 6).map((skill: string, skillIndex: number) => (
                                  <span
                                    key={skillIndex}
                                    className="px-3 py-1 bg-slate-700/70 border border-slate-600/50 rounded-full text-xs text-gray-200 font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {member.skills.length > 6 && (
                                  <span className="px-3 py-1 bg-slate-700/70 border border-slate-600/50 rounded-full text-xs text-cyan-400 font-medium">
                                    +{member.skills.length - 6} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Social Links */}
                          <div className="flex justify-center space-x-4">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-white hover:bg-cyan-400/20 transition-all duration-300"
                              >
                                <Mail className="h-5 w-5" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-400/20 transition-all duration-300"
                              >
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-white hover:bg-gray-400/20 transition-all duration-300"
                              >
                                <Github className="h-5 w-5" />
                              </a>
                            )}
                          </div>

                          {/* Member rank */}
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Team Structure */}
              <AnimatedSection animation="slideUp" className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Team Structure & Roles</h2>
                  <p className="text-gray-400 text-lg">Specialized positions that drive our success in technology and innovation</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamRoles.map((role, index) => {
                    const Icon = role.icon;
                    const isOccupied = members.some((member: any) => 
                      member.role?.toLowerCase().includes(role.title.toLowerCase().split(' ')[0]) ||
                      member.role?.toLowerCase().includes(role.title.toLowerCase().split('&')[0]?.trim())
                    );
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5 rounded-3xl blur-xl group-hover:opacity-10 group-hover:blur-2xl transition-all duration-500`}></div>
                        <div className="relative bg-slate-800/60 border-2 border-cyan-400/30 rounded-3xl p-8 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 hover:transform hover:scale-105 h-full">
                          
                          <div className="flex items-start justify-between mb-6">
                            <div className={`p-4 bg-gradient-to-br ${role.color} rounded-2xl shadow-lg`}>
                              <Icon className="h-8 w-8 text-black" />
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-400 mb-2">Role #{index + 1}</div>
                              {isOccupied && (
                                <span className="px-3 py-1 bg-green-400/20 text-green-400 text-xs rounded-full font-semibold border border-green-400/30">
                                  ✓ Filled
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-4">{role.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed mb-6">{role.description}</p>
                          
                          <div className="mt-auto">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Star className="w-3 h-3 text-cyan-400" />
                              Key Skills
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {role.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-2 bg-slate-700/60 border border-slate-600/40 rounded-lg text-xs text-gray-200 font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Join Team CTA */}
              <AnimatedSection animation="fadeIn" className="text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Team?</h3>
                    <p className="text-gray-400 mb-6">
                      We're always looking for passionate and skilled individuals to join our elite technology team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={() => window.location.href = '/#join'}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply Now
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

export default TeamPage;
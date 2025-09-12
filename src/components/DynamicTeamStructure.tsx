import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Cpu, 
  Wifi, 
  Brain, 
  Network, 
  Palette, 
  IndianRupee,
  Users,
  BookOpen,
  TrendingUp,
  Mail,
  Github,
  Linkedin,
  Star,
  Award
} from 'lucide-react';
import { useTeamMembers } from '../hooks/useFirebaseData';

const DynamicTeamStructure = () => {
  const { members, loading } = useTeamMembers();
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Dynamic color combinations that change every 3 seconds
  const dynamicColors = [
    'from-cyan-400 via-blue-500 to-purple-600',
    'from-green-400 via-teal-500 to-cyan-600',
    'from-purple-400 via-pink-500 to-red-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-indigo-400 via-purple-500 to-pink-500',
    'from-teal-400 via-green-500 to-blue-500'
  ];

  const dynamicBorders = [
    'border-cyan-400/30 hover:border-cyan-400/60',
    'border-green-400/30 hover:border-green-400/60',
    'border-purple-400/30 hover:border-purple-400/60',
    'border-yellow-400/30 hover:border-yellow-400/60',
    'border-indigo-400/30 hover:border-indigo-400/60',
    'border-teal-400/30 hover:border-teal-400/60'
  ];

  const dynamicGlows = [
    'from-cyan-400/10 to-blue-400/10',
    'from-green-400/10 to-teal-400/10',
    'from-purple-400/10 to-pink-400/10',
    'from-yellow-400/10 to-orange-400/10',
    'from-indigo-400/10 to-purple-400/10',
    'from-teal-400/10 to-green-400/10'
  ];

  // Change colors every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % dynamicColors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [dynamicColors.length]);

  const defaultRoles = [
    {
      id: 1,
      title: 'Team Leader (Nk Alam)',
      icon: Crown,
      description: 'Strategic leadership, mobile/web development, project coordination',
      skills: ['Leadership', 'React/React Native', 'Project Management', 'Full-stack Development'],
      color: 'from-yellow-400 to-orange-400',
      borderColor: 'border-yellow-400/20 hover:border-yellow-400/40'
    },
    {
      id: 2,
      title: 'Hardware & Circuit Designer',
      icon: Cpu,
      description: 'PCB design, embedded systems, hardware prototyping',
      skills: ['PCB Design', 'Electronics', 'CAD Tools', 'Prototyping'],
      color: 'from-cyan-400 to-blue-400',
      borderColor: 'border-cyan-400/20 hover:border-cyan-400/40'
    },
    {
      id: 3,
      title: 'Embedded/IoT Specialist',
      icon: Wifi,
      description: 'IoT solutions, sensor integration, embedded programming',
      skills: ['Arduino/Raspberry Pi', 'IoT Protocols', 'C/C++', 'Sensor Integration'],
      color: 'from-green-400 to-teal-400',
      borderColor: 'border-green-400/20 hover:border-green-400/40'
    },
    {
      id: 4,
      title: 'AI/ML Engineer',
      icon: Brain,
      description: 'Machine learning models, data analysis, AI integration',
      skills: ['Python/TensorFlow', 'Data Science', 'Deep Learning', 'Computer Vision'],
      color: 'from-purple-400 to-pink-400',
      borderColor: 'border-purple-400/20 hover:border-purple-400/40'
    },
    {
      id: 5,
      title: 'Networking/Communication Specialist',
      icon: Network,
      description: 'Network protocols, communication systems, backend development',
      skills: ['Network Protocols', 'API Development', 'Database Design', 'System Architecture'],
      color: 'from-indigo-400 to-cyan-400',
      borderColor: 'border-indigo-400/20 hover:border-indigo-400/40'
    },
    {
      id: 6,
      title: 'UI/UX & Testing Engineer',
      icon: Palette,
      description: 'User interface design, user experience, quality assurance',
      skills: ['UI/UX Design', 'Testing Frameworks', 'Figma/Adobe XD', 'User Research'],
      color: 'from-pink-400 to-rose-400',
      borderColor: 'border-pink-400/20 hover:border-pink-400/40'
    }
  ];

  const benefits = [
    {
      icon: IndianRupee,
      title: '₹500 Monthly Stipend',
      description: 'Competitive financial support for dedicated team members'
    },
    {
      icon: BookOpen,
      title: 'Skill Development',
      description: 'Hands-on experience with cutting-edge technologies'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with industry professionals and mentors'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Portfolio building and leadership opportunities'
    }
  ];

  return (
    <section id="team" className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Our Team
              </h2>
              <div className="absolute -top-2 -right-2">
                <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Meet our talented team members and discover the specialized roles that drive our success in innovation and technology
            </p>
          </div>

          {/* Current Team Members */}
          {!loading && members.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                  <Award className="h-8 w-8 text-cyan-400" />
                  Current Team Members
                  <Award className="h-8 w-8 text-green-400" />
                </h3>
                <p className="text-gray-400 text-lg">Our dedicated professionals driving innovation forward</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, index) => {
                  const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                  return (
                    <div key={member.id} className="relative group">
                      {/* Dynamic animated background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse`}></div>
                      
                      {/* Main card */}
                      <div className={`relative bg-slate-800/60 border-2 ${dynamicBorders[colorIndex]} rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl`}>
                        {/* Profile Image Section */}
                        <div className="relative mb-6 flex justify-center">
                          <div className="relative">
                            {/* Dynamic rotating border */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${dynamicColors[colorIndex]} rounded-full blur-md animate-spin`} style={{animationDuration: '4s'}}></div>
                            
                            {/* Image container */}
                            <div className="relative">
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
                              
                              {/* Status indicator */}
                              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-slate-800 z-20 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="text-center mb-6">
                          <h4 className="text-2xl font-bold text-white mb-2 tracking-wide">{member.name}</h4>
                          <div className={`inline-block px-4 py-2 bg-gradient-to-r ${dynamicColors[colorIndex]} rounded-full mb-3`}>
                            <p className="text-black font-bold text-sm tracking-wide">{member.role}</p>
                          </div>
                          {member.description && (
                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">{member.description}</p>
                          )}
                        </div>

                        {/* Skills Section */}
                        {member.skills && Array.isArray(member.skills) && (
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {member.skills.slice(0, 6).map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-3 py-1 bg-slate-700/70 border border-slate-600/50 rounded-full text-xs text-gray-200 font-medium hover:bg-slate-600/70 transition-colors duration-300"
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
                              className="group/social relative p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                            >
                              <Mail className="h-5 w-5" />
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full scale-0 group-hover/social:scale-100 transition-transform duration-300"></div>
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                            >
                              <Linkedin className="h-5 w-5" />
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full scale-0 group-hover/social:scale-100 transition-transform duration-300"></div>
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative p-3 bg-slate-700/60 rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                            >
                              <Github className="h-5 w-5" />
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-slate-400/20 rounded-full scale-0 group-hover/social:scale-100 transition-transform duration-300"></div>
                            </a>
                          )}
                        </div>

                        {/* Member rank/badge */}
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Roles */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {members.length > 0 ? 'Team Structure & Open Positions' : 'Available Team Roles'}
              </h3>
              <p className="text-gray-400 text-lg">Join our diverse team of technology enthusiasts</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultRoles.map((role) => {
                const Icon = role.icon;
                const isOccupied = members.some((member) => 
                  member.role?.toLowerCase().includes(role.title.toLowerCase().split(' ')[0]) ||
                  member.role?.toLowerCase().includes(role.title.toLowerCase().split('&')[0]?.trim())
                );
                
                return (
                  <div key={role.id} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5 rounded-3xl blur-xl group-hover:opacity-10 group-hover:blur-2xl transition-all duration-500`}></div>
                    <div className={`relative bg-slate-800/60 border-2 ${role.borderColor} rounded-3xl p-8 backdrop-blur-md transition-all duration-500 hover:transform hover:scale-105 h-full ${isOccupied ? 'opacity-80' : ''}`}>
                      
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 bg-gradient-to-br ${role.color} rounded-2xl shadow-lg`}>
                          <Icon className="h-8 w-8 text-black" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-400 mb-2">Role #{role.id}</div>
                          {isOccupied && (
                            <span className="px-3 py-1 bg-green-400/20 text-green-400 text-xs rounded-full font-semibold border border-green-400/30">
                              ✓ Filled
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Role Title */}
                      <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
                        {role.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {role.description}
                      </p>
                      
                      {/* Skills */}
                      <div className="mt-auto">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                          Key Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-slate-700/60 border border-slate-600/40 rounded-lg text-xs text-gray-200 font-medium hover:bg-slate-600/60 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Why Join Qbrain?</h3>
              <p className="text-gray-400 text-lg">Unlock your potential with these amazing benefits</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-slate-800/60 border-2 border-cyan-400/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105 text-center h-full">
                      <div className="mb-4">
                        <Icon className="h-10 w-10 text-cyan-400 mx-auto" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligibility Section */}
          <div className="mt-20">
            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-800/60 border-2 border-green-400/30 rounded-3xl p-10 backdrop-blur-md">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Eligibility Requirements</h3>
                  <p className="text-gray-400 text-lg">Ready to join our innovative team?</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <BookOpen className="h-6 w-6 text-green-400" />
                      <h4 className="text-xl font-bold text-green-400">Academic Requirements</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">B.Tech students (all streams welcome)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">Strong academic performance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">Passion for technology and innovation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <TrendingUp className="h-6 w-6 text-cyan-400" />
                      <h4 className="text-xl font-bold text-cyan-400">Skills & Commitment</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">Relevant technical skills for chosen role</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">Dedication to team goals and projects</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <span className="text-gray-300">Availability for hackathons and competitions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicTeamStructure;
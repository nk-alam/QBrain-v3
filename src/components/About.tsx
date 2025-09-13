import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  User, 
  Code, 
  Lightbulb, 
  Trophy, 
  Rocket, 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Star,
  Sparkles,
  Crown,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Dynamic color combinations that change every 3.5 seconds
  const dynamicColors = [
    'from-cyan-400 via-blue-500 to-purple-600',
    'from-green-400 via-teal-500 to-cyan-600',
    'from-purple-400 via-pink-500 to-red-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-indigo-400 via-purple-500 to-pink-500',
    'from-teal-400 via-green-500 to-blue-500'
  ];

  const dynamicGlows = [
    'from-cyan-400/15 to-blue-400/15',
    'from-green-400/15 to-teal-400/15',
    'from-purple-400/15 to-pink-400/15',
    'from-yellow-400/15 to-orange-400/15',
    'from-indigo-400/15 to-purple-400/15',
    'from-teal-400/15 to-green-400/15'
  ];

  // Change colors every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % dynamicColors.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [dynamicColors.length]);

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

  const missionPoints = [
    {
      icon: Code,
      title: "Hackathon Excellence",
      description: "Competing in premier hackathons across the nation to showcase our technical prowess and innovative thinking",
      stats: "1+ Competitions Won"
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Developing cutting-edge artificial intelligence solutions that solve real-world problems and drive industry forward",
      stats: "1+ AI Projects"
    },
    {
      icon: Rocket,
      title: "Rapid Prototyping",
      description: "Building functional prototypes from concept to deployment in record time with precision and quality",
      stats: "48hr Development"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating technology solutions that have the potential to make a positive impact on communities worldwide",
      stats: "Regional Recognition"
    }
  ];

  const achievements = [
    {
      icon: Trophy,
      title: "AUAT Techfest 2025",
      subtitle: "First Place Winner",
      description: "Secured top position with our AI-powered healthcare solution that impressed judges with innovation and technical excellence",
      badge: "Champion",
      color: 'cyan'
    },
    {
      icon: Star,
      title: "Innovation Award",
      subtitle: "Best Technical Solution",
      description: "Recognized for outstanding technical implementation and creativity in developing breakthrough solutions",
      badge: "Excellence",
      color: 'green'
    },
    {
      icon: Zap,
      title: "Speed Coding Champion",
      subtitle: "Fastest Development",
      description: "Completed complex application development in record time while maintaining high quality standards",
      badge: "Speed",
      color: 'cyan'
    }
  ];

  return (
    <div className="min-h-screen">
      <section id="about" className="py-24 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 border-2 border-cyan-400 rotate-12 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-green-400 rotate-45 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-cyan-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-green-400 rotate-45 animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-purple-400 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Enhanced Section Header */}
            <div className="text-center mb-20">
              {/* <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-400/10 to-green-400/10 border border-cyan-400/30 rounded-full backdrop-blur-sm mb-6 sm:mb-8 hover:scale-105 transition-all duration-300">
                <Users className="h-5 w-5 text-cyan-400 mr-3" />
                <span className="text-sm sm:text-base font-bold text-cyan-400">Meet Our Team</span>
              </div> */}
              
              <div className="relative inline-block mb-8">
                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  About Qbrain
                </h2>
                <div className="absolute -top-4 -right-4">
                  <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />
                </div>
              </div>
              
              <div className="w-40 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8 rounded-full"></div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 leading-relaxed max-w-5xl mx-auto px-4">
                An elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions
              </p>
            </div>

            {/* Enhanced Mission Section */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
                  <Target className="h-8 w-8 text-cyan-400" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Our Mission</h3>
                  <Target className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                  Transforming innovative ideas into breakthrough technology solutions that win competitions and create real-world impact
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 px-4">
                {missionPoints.map((point, index) => {
                  const Icon = point.icon;
                  const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={index} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse`}></div>
                      <div className={`relative bg-slate-800/70 border-2 ${isEven ? 'border-cyan-400/30 hover:border-cyan-400/60' : 'border-green-400/30 hover:border-green-400/60'} rounded-3xl p-8 backdrop-blur-md transition-all duration-500 text-center h-full flex flex-col group-hover:transform group-hover:scale-105`}>
                        
                        {/* Icon with rotating background */}
                        <div className="relative mb-6">
                          <div className={`absolute inset-0 bg-gradient-to-r ${dynamicColors[colorIndex]} rounded-2xl blur-md animate-spin opacity-20`} style={{animationDuration: '8s'}}></div>
                          <div className={`relative p-4 ${isEven ? 'bg-cyan-400/10' : 'bg-green-400/10'} rounded-2xl w-fit mx-auto`}>
                            <Icon className={`h-10 w-10 ${isEven ? 'text-cyan-400' : 'text-green-400'}`} />
                          </div>
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-4">{point.title}</h4>
                        <p className="text-gray-300 leading-relaxed text-sm flex-grow mb-4">{point.description}</p>
                        
                        {/* Stats badge */}
                        <div className={`inline-flex items-center px-3 py-1 ${isEven ? 'bg-cyan-400/20 text-cyan-400' : 'bg-green-400/20 text-green-400'} rounded-full text-xs font-bold`}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {point.stats}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Achievements Section */}
            <div className="mb-24">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-3xl md:text-4xl font-bold text-white">Recent Achievements</h3>
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                  Celebrating our victories and recognitions in the competitive tech landscape
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-10 mb-16">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                  const colorClasses = achievement.color === 'cyan' 
                    ? 'border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400'
                    : 'border-green-400/30 hover:border-green-400/60 text-green-400';
                  
                  return (
                    <div key={index} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                      <div className={`relative bg-slate-800/70 border-2 ${colorClasses} rounded-3xl p-10 backdrop-blur-md transition-all duration-500 text-center h-full flex flex-col group-hover:transform group-hover:scale-105`}>
                        
                        <div className="relative mb-6">
                          <Icon className={`h-16 w-16 ${colorClasses.split(' ')[2]} mx-auto mb-4`} />
                          <div className={`absolute top-0 right-0 px-2 py-1 ${achievement.color === 'cyan' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-green-400/20 text-green-400'} rounded-full text-xs font-bold`}>
                            {achievement.badge}
                          </div>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-3">{achievement.title}</h4>
                        <p className={`${colorClasses.split(' ')[2]} font-bold text-lg mb-4`}>{achievement.subtitle}</p>
                        <p className="text-gray-300 leading-relaxed text-sm flex-grow">{achievement.description}</p>
                        
                        {/* Hover indicator */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className={`h-5 w-5 ${colorClasses.split(' ')[2]} mx-auto`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Team Leader Grid */}
            {/* <div className="grid lg:grid-cols-2 gap-12 mb-24">
                            <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/70 border-2 border-cyan-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 h-full flex flex-col">
                  
                  <div className="flex items-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                      <div className="relative p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-2xl">
                        <Target className="h-10 w-10 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white ml-4">Our Mission</h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg flex-grow">
                    Operating on an annual innovation cycle, we participate in major hackathons and competitions to showcase our technical prowess and build impactful technology solutions that solve real-world problems. We strive to push the boundaries of what's possible with emerging technologies.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-cyan-400 group/item p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                      <Lightbulb className="h-6 w-6 mr-4 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-base font-bold">Innovation Excellence</span>
                    </div>
                    <div className="flex items-center text-green-400 group/item p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                      <Shield className="h-6 w-6 mr-4 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-base font-bold">Quality Assurance</span>
                    </div>
                    <div className="flex items-center text-cyan-400 group/item p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                      <Rocket className="h-6 w-6 mr-4 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-base font-bold">Rapid Development</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/70 border-2 border-green-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-green-400/60 transition-all duration-500 h-full flex flex-col">
                  
                  <div className="flex items-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                      <div className="relative p-4 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-2xl">
                        <Crown className="h-10 w-10 text-green-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white ml-4">Team Leader</h3>
                  </div>
                  
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative mb-8">
                      <div className={`absolute inset-0 bg-gradient-to-r ${dynamicColors[currentColorIndex]} rounded-full blur-lg opacity-40 animate-spin`} style={{animationDuration: '4s'}}></div>
                      <img 
                        src="https://lh3.googleusercontent.com/a/ACg8ocIYx7XYWzU5LvX5ajcNi6HSCYXpPEIHO4jwpj8HdFKJCsSZzXCq=s576-c-no" 
                        alt="Nurkausar Alam" 
                        className="relative w-44 h-44 rounded-full object-cover border-4 border-slate-700 shadow-2xl z-10"
                      />
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-800 z-20 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-3xl font-bold text-white mb-3">Nurkausar Alam</h4>
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mb-3">
                        <p className="text-black font-bold text-sm">Founding Member & Team Lead</p>
                      </div>
                      <p className="text-gray-400 text-base mb-4">B.Tech CSE AI & Robotics, First Year</p>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <span className="px-4 py-2 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-400/30">AI Specialist</span>
                        <span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-bold border border-green-400/30">Team Leader</span>
                        <span className="px-4 py-2 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-400/30">Strategy</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-base flex-grow">
                    Driving vision and strategy for technical excellence and competition success. Leading our team with innovative thinking and strategic planning to achieve breakthrough results in every hackathon while fostering a culture of continuous learning and innovation.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Enhanced Vision Statement */}
            <div className="text-center mb-24">
              <div className="relative group max-w-6xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/70 border-2 border-cyan-400/30 rounded-3xl p-12 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500">
                  
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-2xl blur-md animate-pulse opacity-30"></div>
                      <div className="relative p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-2xl">
                        <Eye className="h-12 w-12 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white ml-4">Our Vision</h3>
                  </div>
                  
                  <p className="text-base text-gray-300 leading-relaxed">
                    To become the most recognized student technology team in the region, consistently delivering innovative solutions that win competitions while nurturing the next generation of tech leaders through hands-on experience and mentorship. We envision a future where our innovations contribute to solving global challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Core Values */}
            <div className="mb-12">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="h-8 w-8 text-purple-400" />
                  <h3 className="text-4xl md:text-5xl font-bold text-white">Core Values</h3>
                  <Star className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                  The principles that guide every decision we make and every solution we build
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                  const colorClasses = value.color === 'cyan' 
                    ? 'border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400'
                    : 'border-green-400/30 hover:border-green-400/60 text-green-400';
                  
                  return (
                    <div key={index} className="relative group h-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                      <div className={`relative bg-slate-800/70 border-2 ${colorClasses} rounded-3xl p-10 backdrop-blur-md transition-all duration-500 text-center h-full flex flex-col group-hover:transform group-hover:scale-105`}>
                        
                        <div className="relative mb-6">
                          <div className={`absolute inset-0 bg-gradient-to-r ${dynamicColors[colorIndex]} rounded-2xl blur-md animate-pulse opacity-20`}></div>
                          <div className={`relative p-4 ${value.color === 'cyan' ? 'bg-cyan-400/10' : 'bg-green-400/10'} rounded-2xl w-fit mx-auto`}>
                            <Icon className={`h-12 w-12 ${colorClasses.split(' ')[2]}`} />
                          </div>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-6">{value.title}</h4>
                        <p className="text-gray-300 leading-relaxed flex-grow mb-6">{value.description}</p>
                        
                        {/* Features list */}
                        <div className="space-y-2">
                          {value.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center justify-left text-sm">
                              <div className={`w-2 h-2 ${value.color === 'cyan' ? 'bg-cyan-400' : 'bg-green-400'} rounded-full mr-2`}></div>
                              <span className="text-gray-400 font-medium">{feature}</span>
                            </div>
                          ))}
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
    </div>
  );
};

export default About;
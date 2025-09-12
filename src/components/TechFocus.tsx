import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Wifi, 
  Smartphone, 
  Cpu, 
  BarChart3, 
  Code,
  Lightbulb,
  Zap,
  Target,
  Layers,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const TechFocus = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Dynamic color combinations that change every 4 seconds
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

  // Change colors every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % dynamicColors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [dynamicColors.length]);

  const techAreas = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Smart solutions powered by artificial intelligence and advanced algorithms',
      features: ['Predictive Analytics', 'Computer Vision', 'Natural Language Processing', 'Deep Learning Models'],
      color: 'from-purple-400 to-pink-400',
      borderColor: 'border-purple-400/30 hover:border-purple-400/60',
      projects: 'Smart Helmet AI System, Predictive Maintenance',
      accent: 'purple'
    },
    {
      icon: Wifi,
      title: 'IoT & Embedded Systems',
      description: 'Connected devices and intelligent automation for smart ecosystems',
      features: ['Sensor Networks', 'Real-time Monitoring', 'Edge Computing', 'Device Integration'],
      color: 'from-green-400 to-teal-400',
      borderColor: 'border-green-400/30 hover:border-green-400/60',
      projects: 'Smart Home Automation, Industrial IoT Solutions',
      accent: 'green'
    },
    {
      icon: Smartphone,
      title: 'Mobile & Web Development',
      description: 'Cross-platform applications and responsive web solutions that scale',
      features: ['React Native', 'Progressive Web Apps', 'Cloud Integration', 'Modern UI/UX'],
      color: 'from-cyan-400 to-blue-400',
      borderColor: 'border-cyan-400/30 hover:border-cyan-400/60',
      projects: 'Team Management App, Competition Tracker',
      accent: 'cyan'
    },
    {
      icon: Cpu,
      title: 'Hardware Integration',
      description: 'Circuit design, prototyping, and system optimization for performance',
      features: ['PCB Design', 'Microcontroller Programming', '3D Prototyping', 'Hardware Testing'],
      color: 'from-orange-400 to-red-400',
      borderColor: 'border-orange-400/30 hover:border-orange-400/60',
      projects: 'Custom Circuit Boards, Sensor Modules',
      accent: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Data Science & Analytics',
      description: 'Data-driven insights and intelligent visualization for informed decisions',
      features: ['Statistical Analysis', 'Data Visualization', 'Big Data Processing', 'Performance Metrics'],
      color: 'from-indigo-400 to-purple-400',
      borderColor: 'border-indigo-400/30 hover:border-indigo-400/60',
      projects: 'Hackathon Analytics, Team Performance Dashboard',
      accent: 'indigo'
    },
    {
      icon: Code,
      title: 'System Architecture',
      description: 'Scalable backend solutions and cloud infrastructure that perform',
      features: ['Microservices', 'API Development', 'Cloud Deployment', 'Database Design'],
      color: 'from-yellow-400 to-orange-400',
      borderColor: 'border-yellow-400/30 hover:border-yellow-400/60',
      projects: 'Competition Platform, Team Collaboration System',
      accent: 'yellow'
    }
  ];

  const innovations = [
    {
      icon: Lightbulb,
      title: 'Innovation-First Approach',
      description: 'Every project starts with a unique problem-solving perspective that challenges conventions'
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Quick iteration cycles to validate ideas and improve solutions with agile methodologies'
    },
    {
      icon: Target,
      title: 'Competition-Ready',
      description: 'Solutions designed to win hackathons and impress judges with cutting-edge technology'
    },
    {
      icon: Layers,
      title: 'Full-Stack Expertise',
      description: 'End-to-end development from hardware to cloud deployment with seamless integration'
    }
  ];

  const techStack = {
    Frontend: {
      color: 'text-cyan-400',
      items: ['React / React Native', 'TypeScript', 'Tailwind CSS', 'Next.js']
    },
    Backend: {
      color: 'text-green-400',
      items: ['Node.js / Python', 'Express / FastAPI', 'PostgreSQL / MongoDB', 'Redis']
    },
    'AI/ML': {
      color: 'text-purple-400',
      items: ['TensorFlow / PyTorch', 'OpenCV', 'Scikit-learn', 'Pandas / NumPy']
    },
    Hardware: {
      color: 'text-yellow-400',
      items: ['Arduino / Raspberry Pi', 'ESP32 / ESP8266', 'KiCad / Eagle', '3D Printing']
    }
  };

  return (
    <section id="tech" className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Technology Focus Areas
              </h2>
              <div className="absolute -top-3 -right-3">
                <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              We specialize in cutting-edge technologies that drive innovation and create competitive advantages in hackathons and real-world applications
            </p>
          </div>

          {/* Tech Areas Grid */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            {techAreas.map((area, index) => {
              const Icon = area.icon;
              const colorIndex = (currentColorIndex + index) % dynamicColors.length;
              
              return (
                <div key={index} className="relative group">
                  {/* Dynamic animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse`}></div>
                  
                  {/* Main card */}
                  <div className={`relative bg-slate-800/60 border-2 ${area.borderColor} rounded-3xl p-8 backdrop-blur-md transition-all duration-700 hover:transform hover:scale-105 h-full`}>
                    
                    {/* Header Section */}
                    <div className="flex items-start space-x-6 mb-8">
                      <div className="relative">
                        {/* Rotating background for icon */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${dynamicColors[colorIndex]} rounded-2xl blur-md animate-spin opacity-20`} style={{animationDuration: '6s'}}></div>
                        <div className={`relative p-4 bg-gradient-to-br ${area.color} rounded-2xl shadow-2xl`}>
                          <Icon className="h-8 w-8 text-black" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{area.title}</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{area.description}</p>
                      </div>
                      
                      {/* Index badge */}
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Key Capabilities */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="h-5 w-5 text-cyan-400" />
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider">Key Capabilities</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {area.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="group/feature flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors duration-300">
                            <div className={`w-2 h-2 bg-gradient-to-r ${area.color} rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300`}></div>
                            <span className="text-gray-200 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="border-t-2 border-slate-700/50 pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider">Recent Projects</h4>
                      </div>
                      <p className="text-gray-300 font-medium">{area.projects}</p>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Innovation Highlights */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Zap className="h-8 w-8 text-cyan-400" />
                Our Innovation Edge
                <Zap className="h-8 w-8 text-green-400" />
              </h3>
              <p className="text-gray-400 text-lg">What sets our technology approach apart from the competition</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {innovations.map((innovation, index) => {
                const Icon = innovation.icon;
                const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                
                return (
                  <div key={index} className="relative group text-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                    <div className="relative bg-slate-800/60 border-2 border-cyan-400/30 rounded-2xl p-8 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 hover:transform hover:scale-105 h-full">
                      <div className="mb-6">
                        <Icon className="h-12 w-12 text-cyan-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">{innovation.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{innovation.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-cyan-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-800/60 border-2 border-purple-400/30 rounded-3xl p-10 backdrop-blur-md">
                
                {/* Header */}
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <Code className="h-8 w-8 text-purple-400" />
                    Our Technology Stack
                    <Code className="h-8 w-8 text-cyan-400" />
                  </h3>
                  <p className="text-gray-400 text-lg">The powerful tools and frameworks that drive our innovations</p>
                </div>
                
                {/* Tech Stack Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Object.entries(techStack).map(([category, data], index) => {
                    const colorIndex = (currentColorIndex + index) % dynamicColors.length;
                    
                    return (
                      <div key={category} className="relative group/stack">
                        <div className={`absolute inset-0 bg-gradient-to-br ${dynamicGlows[colorIndex]} rounded-2xl blur-lg group-hover/stack:blur-xl transition-all duration-300`}></div>
                        <div className="relative bg-slate-700/50 border border-slate-600/50 rounded-2xl p-6 backdrop-blur-sm group-hover/stack:border-slate-500/70 transition-all duration-300">
                          
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-3 h-3 ${data.color.replace('text-', 'bg-')} rounded-full`}></div>
                            <h4 className={`${data.color} font-bold text-lg`}>{category}</h4>
                          </div>
                          
                          <div className="space-y-3">
                            {data.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="group/item flex items-center gap-2 p-2 rounded-lg hover:bg-slate-600/30 transition-colors duration-300">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                                <span className="text-gray-200 font-medium text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom accent */}
                <div className="mt-10 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full border border-cyan-400/20">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    <span className="text-gray-300 font-medium">Continuously evolving our tech stack</span>
                    <Sparkles className="h-5 w-5 text-purple-400" />
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

export default TechFocus;
import React, { useState } from 'react';
import { Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JoinTeam = () => {
  const navigate = useNavigate();
  
  const benefits = [
    {
      icon: '💰',
      title: '₹500 Monthly Stipend',
      description: 'Competitive financial support for dedicated team members'
    },
    {
      icon: '📚',
      title: 'Skill Development',
      description: 'Hands-on experience with cutting-edge technologies'
    },
    {
      icon: '🤝',
      title: 'Professional Network',
      description: 'Connect with industry professionals and mentors'
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Portfolio building and leadership opportunities'
    }
  ];

  const requirements = [
    'B.Tech students (all streams welcome)',
    'Strong academic performance',
    'Passion for technology and innovation',
    'Relevant technical skills for chosen role',
    'Dedication to team goals and projects',
    'Availability for hackathons and competitions'
  ];
  
  const handleJoinTeam = () => {
    navigate('/join');
  };

  return (
    <section id="join" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Join Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed">
              Ready to be part of something extraordinary? Complete our application process and join the future of tech innovation.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/60 border-2 border-cyan-400/20 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-500 text-center h-full">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Requirements & CTA */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-800/60 border-2 border-purple-400/30 rounded-3xl p-8 backdrop-blur-md hover:border-purple-400/60 transition-all duration-500 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-purple-400" />
                  Eligibility Requirements
                </h3>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Star className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application CTA */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-slate-800/60 border-2 border-cyan-400/30 rounded-3xl p-8 backdrop-blur-md hover:border-cyan-400/60 transition-all duration-500 h-full flex flex-col justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Complete our comprehensive application process including technical assessment, resume review, and interview scheduling.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center text-sm text-gray-400">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                      <span>4-step application process</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span>Technical quiz with 70% minimum score</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-400">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                      <span>Personal interview with team leader</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={handleJoinTeam}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">
                      Start Application
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-16 text-center">
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl blur-xl"></div>
              <div className="relative bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3">Need Help?</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Have questions about the application process or technical requirements? We're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/+918695205637?text=Hi! I have questions about joining Qbrain team."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors duration-300"
                  >
                    WhatsApp Support
                  </a>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center px-4 py-2 border border-cyan-400/50 text-cyan-400 rounded-full text-sm hover:bg-cyan-400/10 transition-colors duration-300"
                  >
                    Contact Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeam;
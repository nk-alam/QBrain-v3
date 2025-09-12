import React from 'react';
import { Zap, Heart, ExternalLink, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Team', href: '/team' },
    { name: 'Join Team', href: '/join' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const resources = [
    { name: 'Application Process', href: '/join' },
    { name: 'Technical Quiz', href: '/join' },
    { name: 'Interview Guide', href: '/join' },
    { name: 'Team Benefits', href: '/team' }
  ];

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Zap className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Qbrain
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              An elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="h-4 w-4 text-red-400 mr-2" />
              Made with passion by Team Qbrain
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <div className="space-y-3">
              {resources.map((resource) => (
                <button
                  key={resource.name}
                  onClick={() => handleNavigation(resource.href)}
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
                >
                  {resource.name}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://wa.me/+918695205637?text=Hi! I need help with the application process."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300 text-sm"
              >
                Get Help
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <div>BWU Campus</div>
                  <div>398, Ramkrishnapur Rd</div>
                   <div>near Jagadighata Market, Barasat</div>
                  <div>Kolkata, West Bengal 700125</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:team@qbrain.tech"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  team@qbrain.in
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                  <div>Weekend: By appointment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2025 Qbrain. All rights reserved. Building tomorrow's technology today.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-500">
                🏆 AUAT Techfest Winners (2025)
              </div>
              <div className="text-sm text-gray-500">
                🎯 SIH 2025 Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
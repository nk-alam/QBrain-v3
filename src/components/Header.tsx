import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-cyan-400/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateToPage('/')}>
            <div className="relative">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Qbrain
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {[
              { name: 'About', path: '/about' },
              { name: 'Achievements', path: '/achievements' },
              { name: 'Team', path: '/team' },
              { name: 'Join', path: '/join' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.path.startsWith('#') && location.pathname === '/') {
                    scrollToSection(item.path.substring(1));
                  } else {
                    navigateToPage(item.path);
                  }
                }}
                className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 group text-sm xl:text-base"
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
            <button
              onClick={() => navigateToPage('/blog')}
              className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 group flex items-center space-x-1 text-sm xl:text-base"
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => navigateToPage('/join')}
              className="relative px-4 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
            >
              Join Team
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-300 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-3 pt-4">
              {[
                { name: 'About', path: '/about' },
                { name: 'Achievements', path: '/achievements' },
                { name: 'Team', path: '/team' },
                { name: 'Join', path: '/join' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.path.startsWith('#') && location.pathname === '/') {
                      scrollToSection(item.path.substring(1));
                    } else {
                      navigateToPage(item.path);
                    }
                  }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left py-2 px-2 rounded-lg hover:bg-slate-700/30"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => navigateToPage('/blog')}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left py-2 px-2 rounded-lg hover:bg-slate-700/30 flex items-center space-x-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </button>
              <button
                onClick={() => navigateToPage('/join')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full transition-all duration-300 text-center"
              >
                Join Team
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
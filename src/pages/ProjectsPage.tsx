import React, { useState } from 'react';
import { Calendar, Users, ExternalLink, Github, Search, Filter, Folder, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import AnimatedSection from '../components/ui/AnimatedSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useProjects } from '../hooks/useFirebaseData';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleProjectClick = (projectId: string) => {
    const project = projects.find((p: any) => p.id === projectId);
    if (project && project.slug) {
      navigate(`/projects/${project.slug}`);
    } else {
      navigate(`/projects/${projectId}`);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project: any) => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories and statuses
  const categories = ['all', ...new Set(projects.map((project: any) => project.category).filter(Boolean))];
  const statuses = ['all', ...new Set(projects.map((project: any) => project.status).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading projects..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Projects - Qbrain Team | Innovative Technology Solutions & Developments"
        description="Explore Qbrain Team's innovative projects including AI/ML solutions, IoT systems, web applications, and cutting-edge technology developments."
        keywords="qbrain projects, AI ML projects, IoT solutions, web applications, technology innovations, student projects"
        url="https://qbrain.in/projects"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              
              {/* Page Header */}
              <AnimatedSection animation="fadeIn" className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Our Projects
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Discover our innovative technology solutions, from AI-powered applications to IoT systems and cutting-edge developments
                </p>
              </AnimatedSection>

              {/* Search and Filters */}
              <div className="mb-12">
                <div className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex gap-4">
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
                    
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status} className="bg-slate-800">
                          {status === 'all' ? 'All Status' : status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project: any, index: number) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group cursor-pointer"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/50 border border-blue-400/20 rounded-xl overflow-hidden hover:border-blue-400/40 transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
                        
                        {/* Featured Image */}
                        {project.images && project.images.length > 0 && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {project.featured && (
                              <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                                Featured
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                              project.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                              project.status === 'ongoing' ? 'bg-yellow-400/20 text-yellow-400' :
                              project.status === 'paused' ? 'bg-red-400/20 text-red-400' :
                              'bg-blue-400/20 text-blue-400'
                            }`}>
                              {project.status}
                            </span>
                            
                            {project.category && (
                              <span className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded">
                                {project.category}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            {project.startDate && (
                              <div className="flex items-center text-gray-400 text-xs">
                                <Calendar className="h-3 w-3 mr-2" />
                                {format(project.startDate.toDate(), 'MMM dd, yyyy')}
                                {project.endDate && ` - ${format(project.endDate.toDate(), 'MMM dd, yyyy')}`}
                              </div>
                            )}
                            
                            {project.teamMembers && project.teamMembers.length > 0 && (
                              <div className="flex items-center text-gray-400 text-xs">
                                <Users className="h-3 w-3 mr-2" />
                                {project.teamMembers.slice(0, 2).join(', ')}
                                {project.teamMembers.length > 2 && ` +${project.teamMembers.length - 2}`}
                              </div>
                            )}
                          </div>
                          
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            
                            <div className="text-xs text-gray-400">
                              Click to learn more
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="relative group max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                      <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-3">No Projects Found</h3>
                      <p className="text-gray-400">
                        {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                          ? 'Try adjusting your search or filter criteria.'
                          : 'We haven\'t published any projects yet. Check back soon!'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <AnimatedSection animation="fadeIn" className="mt-16 text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Inspired by Our Work?</h3>
                    <p className="text-gray-400 mb-6">
                      Join our team and contribute to the next breakthrough project in technology and innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={() => navigate('/join')}
                        className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Our Team
                      </motion.button>
                      <motion.button
                        onClick={() => navigate('/contact')}
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

export default ProjectsPage;
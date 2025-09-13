import React from 'react';
import { Folder, Calendar, Users, ArrowRight, Code, Star, ExternalLink, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useProjects } from '../hooks/useFirebaseData';

const ProjectsSection = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  const handleProjectClick = (projectId: string) => {
    const project = featuredProjects.find((p: any) => p.id === projectId);
    if (project && project.slug) {
      navigate(`/projects/${project.slug}`);
    } else {
      navigate(`/projects/${projectId}`);
    }
  };

  const handleViewAllProjects = () => {
    navigate('/projects');
  };

  // Get featured projects and limit to 3 for homepage
  const featuredProjects = projects.filter((project: any) => project.featured).slice(0, 3);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return null; // Don't show section if no featured projects
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/30 rounded-full backdrop-blur-sm mb-6 sm:mb-8">
              <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-bold text-blue-400">Featured Projects</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Our Innovations
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto px-4">
              Explore our cutting-edge technology solutions and innovative projects that showcase our expertise
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {featuredProjects.map((project: any, index: number) => (
              <article key={project.id} className="relative group cursor-pointer" onClick={() => handleProjectClick(project.id)}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/60 border border-blue-400/20 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md hover:border-blue-400/40 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full flex flex-col">
                  
                  {/* Featured Image */}
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-full backdrop-blur-sm ${
                          project.status === 'completed' ? 'bg-green-400/90 text-black' :
                          project.status === 'ongoing' ? 'bg-yellow-400/90 text-black' :
                          project.status === 'paused' ? 'bg-red-400/90 text-white' :
                          'bg-blue-400/90 text-black'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <div className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-yellow-400/90 text-black text-xs sm:text-sm rounded-full backdrop-blur-sm">
                          <Star className="h-3 w-3" />
                          <span className="font-bold">Featured</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Team Project</span>
                      </div>
                      {project.startDate && (
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>
                            {format(project.startDate.toDate(), 'MMM yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-1">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    {project.technologies && Array.isArray(project.technologies) && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                        {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded-full flex items-center"
                          >
                            <Code className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Action Links */}
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
                      
                      {/* Learn More Button */}
                      <button
                        onClick={() => handleProjectClick(project.id)}
                        className="group/btn flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 text-sm sm:text-base"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllProjects}
              className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="flex items-center space-x-2">
                <Folder className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>View All Projects</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-15 rounded-full transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
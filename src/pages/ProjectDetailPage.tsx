import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowLeft, ExternalLink, Github, Star, Folder } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getProjectBySlug } from '../services/firebaseService';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    if (!slug) return;

    setLoading(true);
    const result = await getProjectBySlug(slug);
    if (result.success) {
      setProject(result.data);
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate('/projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading project details..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
              <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
              <button
                onClick={handleBack}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${project.seoTitle || project.title} - Qbrain Team Project`}
        description={project.seoDescription || project.description}
        keywords={`qbrain project, ${project.category}, ${project.technologies?.join(', ')}`}
        image={project.images?.[0]}
        url={`https://qbrain.in/projects/${project.slug}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />

        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

              {/* Back Button */}
              <button
                onClick={handleBack}
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Projects</span>
              </button>

              {/* Project Header */}
              <div className="relative group mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-slate-800/50 border border-blue-400/30 rounded-3xl p-8 backdrop-blur-sm">

                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-4 py-2 text-sm rounded-full font-semibold ${
                      project.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                      project.status === 'ongoing' ? 'bg-yellow-400/20 text-yellow-400' :
                      project.status === 'paused' ? 'bg-red-400/20 text-red-400' :
                      'bg-blue-400/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>

                    {project.featured && (
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-6 w-6 mr-2" />
                        <span className="text-lg font-bold">Featured</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">{project.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project.startDate && (
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-5 w-5 mr-3 text-cyan-400" />
                        <div>
                          <div className="text-sm text-gray-400">Duration</div>
                          <div className="font-medium">
                            {format(project.startDate.toDate(), 'MMM yyyy')}
                            {project.endDate && ` - ${format(project.endDate.toDate(), 'MMM yyyy')}`}
                          </div>
                        </div>
                      </div>
                    )}

                    {project.teamMembers && project.teamMembers.length > 0 && (
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5 mr-3 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-400">Team Size</div>
                          <div className="font-medium">{project.teamMembers.length} members</div>
                        </div>
                      </div>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        <Github className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-400">Source Code</div>
                          <div className="font-medium">View on GitHub</div>
                        </div>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                      >
                        <ExternalLink className="h-5 w-5 mr-3 text-cyan-400" />
                        <div>
                          <div className="text-sm text-gray-400">Live Demo</div>
                          <div className="font-medium">View Project</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              {project.content && (
                <div className="relative group mb-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-green-400/5 rounded-xl blur-xl"></div>
                  <div className="relative bg-slate-800/30 border border-cyan-400/20 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
                    <div 
                      className="prose prose-lg prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>

                  {/* Main Image */}
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-cyan-400/20 rounded-2xl overflow-hidden">
                      <img
                        src={project.images[selectedImageIndex]}
                        alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                        className="w-full h-auto max-h-[600px] object-contain bg-slate-900/50"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                      {project.images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            selectedImageIndex === index
                              ? 'border-cyan-400'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {selectedImageIndex === index && (
                            <div className="absolute inset-0 bg-cyan-400/20 flex items-center justify-center">
                              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Project Details Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Team Members */}
                {project.teamMembers && project.teamMembers.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-green-400/5 rounded-xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-cyan-400/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-cyan-400" />
                        Team Members
                      </h3>
                      <div className="space-y-2">
                        {project.teamMembers.map((member: string, index: number) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <Star className="h-3 w-3 mr-2 text-cyan-400" />
                            <span>{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-cyan-400/5 rounded-xl blur-xl"></div>
                    <div className="relative bg-slate-800/30 border border-green-400/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Folder className="h-5 w-5 mr-2 text-green-400" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-slate-700/50 border border-green-400/20 rounded-lg text-sm text-gray-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Interested in Our Work?</h3>
                    <p className="text-gray-400 mb-6">
                      Join our team and contribute to innovative projects like this one.
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
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;
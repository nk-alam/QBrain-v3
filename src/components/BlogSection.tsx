import React from 'react';
import { Calendar, User, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlogs } from '../hooks/useFirebaseData';

const BlogSection = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();

  const handleReadMore = (blogId: string) => {
    // Find the blog to get its slug
    const blog = blogs.find((b: any) => b.id === blogId);
    if (blog && blog.slug) {
      navigate(`/blog/${blog.slug}`);
    } else {
      navigate(`/blog/${blogId}`); // Fallback to ID if no slug
    }
  };

  const handleViewAllBlogs = () => {
    navigate('/blog');
  };

  // Get published blogs and limit to 3 for homepage
  const publishedBlogs = blogs.filter((blog: any) => blog.status === 'published').slice(0, 3);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (publishedBlogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 border border-purple-400/30 rounded-full backdrop-blur-sm mb-6 sm:mb-8">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-bold text-purple-400">Latest Insights</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              From Our Blog
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto px-4">
              Discover insights, tutorials, and stories from our journey in technology and innovation
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {publishedBlogs.map((blog: any, index: number) => (
              <article key={blog.id} className="relative group cursor-pointer" onClick={() => handleReadMore(blog.id)}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-slate-800/60 border border-purple-400/20 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md hover:border-purple-400/40 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full flex flex-col">
                  
                  {/* Featured Image */}
                  {blog.featuredImage && (
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      {blog.category && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="px-2 sm:px-3 py-1 bg-purple-400/90 text-black text-xs sm:text-sm font-bold rounded-full backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      )}
                      
                      {/* Reading Time */}
                      {blog.readingTime && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <div className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-black/60 text-white text-xs sm:text-sm rounded-full backdrop-blur-sm">
                            <Clock className="h-3 w-3" />
                            <span>{blog.readingTime} min</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Team Qbrain</span>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {blog.publishedAt?.toDate ? 
                            format(blog.publishedAt.toDate(), 'MMM dd, yyyy') : 
                            blog.createdAt?.toDate ? 
                            format(blog.createdAt.toDate(), 'MMM dd, yyyy') :
                            'Recent'
                          }
                        </span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-1">
                      {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                    </p>
                    
                    {/* Tags */}
                    {blog.tags && Array.isArray(blog.tags) && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                        {blog.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded-full flex items-center"
                          >
                            <Tag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded-full">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Read More Button */}
                    <button
                      onClick={() => handleReadMore(blog.id)}
                      className="group/btn flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 text-sm sm:text-base"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllBlogs}
              className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-bold rounded-full hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>View All Posts</span>
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

export default BlogSection;
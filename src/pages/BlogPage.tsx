import React, { useState } from 'react';
import { Calendar, User, Clock, Tag, Search, Filter, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBlogs } from '../hooks/useFirebaseData';

const BlogPage = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleReadMore = (blogId: string) => {
    // Find the blog to get its slug
    const blog = publishedBlogs.find((b: any) => b.id === blogId);
    if (blog && blog.slug) {
      navigate(`/blog/${blog.slug}`);
    } else {
      navigate(`/blog/${blogId}`); // Fallback to ID if no slug
    }
  };

  // Get published blogs only
  const publishedBlogs = blogs.filter((blog: any) => blog.status === 'published');

  // Filter blogs based on search and category
  const filteredBlogs = publishedBlogs.filter((blog: any) => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(publishedBlogs.map((blog: any) => blog.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading blog posts...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Our Blog
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Insights, tutorials, and stories from our journey in technology and innovation
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                  />
                </div>
                
                {/* Category Filter */}
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
              </div>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog: any) => (
                  <article key={blog.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-slate-800/60 border border-purple-400/20 rounded-3xl overflow-hidden backdrop-blur-md hover:border-purple-400/40 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full flex flex-col">
                      
                      {/* Featured Image */}
                      {blog.featuredImage && (
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Category Badge */}
                          {blog.category && (
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-purple-400/90 text-black text-sm font-bold rounded-full backdrop-blur-sm">
                                {blog.category}
                              </span>
                            </div>
                          )}
                          
                          {/* Reading Time */}
                          {blog.readingTime && (
                            <div className="absolute top-4 right-4">
                              <div className="flex items-center space-x-1 px-3 py-1 bg-black/60 text-white text-sm rounded-full backdrop-blur-sm">
                                <Clock className="h-3 w-3" />
                                <span>{blog.readingTime} min</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Team Qbrain</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
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
                        <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                          {blog.title}
                        </h2>
                        
                        {/* Excerpt */}
                        <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3 flex-1">
                          {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                        </p>
                        
                        {/* Tags */}
                        {blog.tags && Array.isArray(blog.tags) && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded-full flex items-center"
                              >
                                <Tag className="h-3 w-3 mr-1" />
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
                          className="group/btn flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                        >
                          <span>Read More</span>
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="relative group max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-3">No Blog Posts Found</h3>
                    <p className="text-gray-400">
                      {searchTerm || selectedCategory !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'We haven\'t published any blog posts yet. Check back soon!'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
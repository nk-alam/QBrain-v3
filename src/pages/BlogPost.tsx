import React from 'react';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getBlogBySlug } from '../services/firebaseService';

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        setLoading(true);
        const result = await getBlogBySlug(slug);
        if (result.success) {
          setBlog(result.data);
        }
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleBack = () => {
    navigate('/blog');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead
          title="Loading... - Qbrain Team Blog"
          description="Loading blog post from Qbrain Team"
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
          <Header />
          <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" text="Loading blog post..." />
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <SEOHead
          title="Blog Post Not Found - Qbrain Team"
          description="The requested blog post could not be found."
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
          <Header />
          <div className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
                <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
                <button
                  onClick={handleBack}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Blog</span>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const publishedDate = blog.publishedAt?.toDate ? 
    format(blog.publishedAt.toDate(), 'yyyy-MM-dd') : 
    blog.createdAt?.toDate ? 
    format(blog.createdAt.toDate(), 'yyyy-MM-dd') :
    null;

  return (
    <>
      <SEOHead
        title={`${blog.seoTitle || blog.title} - Qbrain Team Blog`}
        description={blog.seoDescription || blog.excerpt || blog.content?.substring(0, 160)}
        keywords={blog.tags ? blog.tags.join(', ') : 'qbrain, technology, blog'}
        image={blog.featuredImage}
        url={`https://qbrain.in/blog/${blog.slug}`}
        type="article"
        publishedTime={publishedDate}
        modifiedTime={blog.updatedAt?.toDate ? format(blog.updatedAt.toDate(), 'yyyy-MM-dd') : undefined}
      />
      
      {/* Blog Article Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.seoDescription || blog.excerpt,
          "image": blog.featuredImage,
          "author": {
            "@type": "Organization",
            "name": "Team Qbrain"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Qbrain Team",
            "logo": {
              "@type": "ImageObject",
              "url": "https://qbrain.in/favicon.png"
            }
          },
          "datePublished": publishedDate,
          "dateModified": blog.updatedAt?.toDate ? format(blog.updatedAt.toDate(), 'yyyy-MM-dd') : publishedDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://qbrain.in/blog/${blog.slug}`
          }
        })}
      </script>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </button>

              {/* Article Header */}
              <article className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-cyan-400/5 rounded-3xl blur-xl"></div>
                <div className="relative bg-slate-800/30 border border-purple-400/20 rounded-3xl overflow-hidden backdrop-blur-md">
                  
                  {/* Featured Image */}
                  {blog.featuredImage && (
                    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      {blog.category && (
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-purple-400/90 text-black font-bold rounded-full backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 sm:p-8 lg:p-12">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Team Qbrain</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {blog.publishedAt?.toDate ? 
                              format(blog.publishedAt.toDate(), 'MMMM dd, yyyy') : 
                              blog.createdAt?.toDate ? 
                              format(blog.createdAt.toDate(), 'MMMM dd, yyyy') :
                              'Recent'
                            }
                          </span>
                        </div>
                        {blog.readingTime && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{blog.readingTime} min read</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      {blog.title}
                    </h1>
                    
                    {/* Excerpt */}
                    {blog.excerpt && (
                      <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        {blog.excerpt}
                      </p>
                    )}
                    
                    {/* Tags */}
                    {blog.tags && Array.isArray(blog.tags) && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-700/50 text-sm text-gray-300 rounded-full flex items-center"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Content */}
                    <div 
                      className="prose prose-lg prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      style={{
                        color: '#e2e8f0',
                        lineHeight: '1.8'
                      }}
                    />
                  </div>
                </div>
              </article>

              {/* Related Posts or CTA */}
              <div className="mt-16 text-center">
                <div className="relative group max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-slate-800/50 border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this post?</h3>
                    <p className="text-gray-400 mb-6">
                      Check out more of our insights and join our community of tech innovators.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                      >
                        More Blog Posts
                      </button>
                      <button
                        onClick={() => navigate('/#join')}
                        className="px-6 py-3 border border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 transition-all duration-300"
                      >
                        Join Our Team
                      </button>
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

export default BlogPost;
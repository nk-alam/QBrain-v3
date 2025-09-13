import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Calendar, Tag, Search } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addBlog, getBlogs, updateBlog, deleteBlog } from '../../services/firebaseService';
import { format } from 'date-fns';
import slugify from 'slugify';
import toast from 'react-hot-toast';

interface BlogManagerProps {
  onUpdate: () => void;
}

const BlogManager: React.FC<BlogManagerProps> = ({ onUpdate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    category: '',
    status: 'draft',
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    slug: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      ['formula'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['direction'],
      ['clean']
    ]
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const result = await getBlogs();
    if (result.success) {
      setBlogs(result.data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      category: '',
      status: 'draft',
      featuredImage: '',
      seoTitle: '',
      seoDescription: '',
      slug: ''
    });
    setImageFile(null);
    setEditingBlog(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return slugify(title, { lower: true, strict: true });
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: title
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        publishedAt: formData.status === 'published' ? new Date() : null,
        readingTime: Math.ceil(formData.content.split(' ').length / 200)
      };

      if (editingBlog) {
        const result = await updateBlog(editingBlog.id, blogData, imageFile || undefined);
        if (result.success) {
          toast.success('Blog updated successfully!');
          resetForm();
          fetchBlogs();
          onUpdate();
        } else {
          toast.error('Failed to update blog');
        }
      } else {
        const result = await addBlog(blogData, imageFile || undefined);
        if (result.success) {
          toast.success('Blog created successfully!');
          resetForm();
          fetchBlogs();
          onUpdate();
        } else {
          toast.error('Failed to create blog');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      category: blog.category || '',
      status: blog.status || 'draft',
      featuredImage: blog.featuredImage || '',
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      slug: blog.slug || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (blog: any) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deleteBlog(blog.id, blog.featuredImage);
      if (result.success) {
        toast.success('Blog deleted successfully!');
        fetchBlogs();
        onUpdate();
      } else {
        toast.error('Failed to delete blog');
      }
    }
  };

  const filteredBlogs = blogs.filter((blog: any) =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-white">Loading blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            <span>New Blog</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="Technology, Tutorial, News..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="url-friendly-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                placeholder="Brief description of the blog post..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
              <div className="bg-white rounded-lg">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={quillModules}
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
              <div className="text-xs text-gray-400 mt-1">
                Recommended size: 1200x630px for optimal display and SEO
              </div>
            </div>

            {/* SEO Section */}
            <div className="border-t border-slate-600/50 pt-6">
              <h4 className="text-lg font-semibold text-white mb-4">SEO Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                    maxLength={60}
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.seoTitle.length}/60 characters
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">SEO Description</label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                    rows={3}
                    maxLength={160}
                    placeholder="Meta description for search engines..."
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.seoDescription.length}/160 characters
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{submitting ? 'Saving...' : 'Save Blog'}</span>
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog: any) => (
          <div key={blog.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  blog.status === 'published' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {blog.status}
                </span>
                <div className="flex items-center text-gray-400 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {blog.createdAt?.toDate ? format(blog.createdAt.toDate(), 'MMM dd, yyyy') : 'Unknown'}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
              
              {blog.tags && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">
                  {blog.readingTime} min read
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(blog)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
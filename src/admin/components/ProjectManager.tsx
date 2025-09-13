import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Folder, Calendar, Users, ExternalLink, Github } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useProjects } from '../../hooks/useFirebaseData';
import { addProject, updateProject, deleteProject } from '../../services/firebaseService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface ProjectManagerProps {
  onUpdate: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onUpdate }) => {
  const { projects, loading, refetch } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    slug: '',
    category: '',
    status: 'upcoming',
    technologies: '',
    teamMembers: '',
    startDate: '',
    endDate: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    seoTitle: '',
    seoDescription: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
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
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      ['clean']
    ]
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      slug: '',
      category: '',
      status: 'upcoming',
      technologies: '',
      teamMembers: '',
      startDate: '',
      endDate: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      seoTitle: '',
      seoDescription: ''
    });
    setImageFiles([]);
    setFeaturedImageFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
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
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        teamMembers: formData.teamMembers.split(',').map(member => member.trim()),
        startDate: formData.startDate ? new Date(formData.startDate) : null,
        endDate: formData.endDate ? new Date(formData.endDate) : null
      };

      if (editingProject) {
        const allImages = featuredImageFile ? [featuredImageFile, ...imageFiles] : imageFiles;
        const result = await updateProject(editingProject.id, projectData, allImages);
        if (result.success) {
          toast.success('Project updated successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to update project');
        }
      } else {
        const allImages = featuredImageFile ? [featuredImageFile, ...imageFiles] : imageFiles;
        const result = await addProject(projectData, allImages);
        if (result.success) {
          toast.success('Project added successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to add project');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      content: project.content || '',
      slug: project.slug || '',
      category: project.category || '',
      status: project.status || 'upcoming',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      teamMembers: Array.isArray(project.teamMembers) ? project.teamMembers.join(', ') : '',
      startDate: project.startDate?.toDate ? format(project.startDate.toDate(), 'yyyy-MM-dd') : '',
      endDate: project.endDate?.toDate ? format(project.endDate.toDate(), 'yyyy-MM-dd') : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured || false,
      seoTitle: project.seoTitle || '',
      seoDescription: project.seoDescription || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (project: any) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProject(project.id, project.images);
      if (result.success) {
        toast.success('Project deleted successfully!');
        refetch();
        onUpdate();
      } else {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  if (loading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Project Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingProject ? 'Edit Project' : 'Add New Project'}
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
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                >
                  <option value="">Select Category</option>
                  <option value="ai-ml">AI/ML</option>
                  <option value="iot">IoT</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="hardware">Hardware</option>
                  <option value="data-science">Data Science</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="seo-friendly-url-slug"
              />
              <div className="text-xs text-gray-400 mt-1">
                URL: /projects/{formData.slug || 'auto-generated-from-title'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Content</label>
              <div className="bg-white rounded-lg">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={quillModules}
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="React, Node.js, AI/ML, IoT"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Members</label>
                <input
                  type="text"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="Member1, Member2, Member3"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="https://github.com/qbrain/project"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="https://project-demo.qbrain.in"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 text-cyan-400 border-slate-600 rounded focus:ring-cyan-400"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                Featured Project (show on homepage)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                required={!editingProject}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
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
                <span>{submitting ? 'Saving...' : 'Save Project'}</span>
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
        {projects.map((project: any) => (
          <div key={project.id} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/50 border border-blue-400/20 rounded-xl overflow-hidden hover:border-blue-400/40 transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
              
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
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
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
                    {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
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
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(project)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
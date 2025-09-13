import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Trophy, Calendar, MapPin, Award } from 'lucide-react';
import { useAchievements } from '../../hooks/useFirebaseData';
import { addAchievement, updateAchievement, deleteAchievement } from '../../services/firebaseService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface AchievementManagerProps {
  onUpdate: () => void;
}

const AchievementManager: React.FC<AchievementManagerProps> = ({ onUpdate }) => {
  const { achievements, loading, refetch } = useAchievements();
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    date: '',
    location: '',
    category: '',
    position: '',
    prize: '',
    teamMembers: '',
    technologies: '',
    highlights: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      slug: '',
      date: '',
      location: '',
      category: '',
      position: '',
      prize: '',
      teamMembers: '',
      technologies: '',
      highlights: ''
    });
    setImageFiles([]);
    setFeaturedImageFile(null);
    setEditingAchievement(null);
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
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const achievementData = {
        ...formData,
        teamMembers: formData.teamMembers.split(',').map(member => member.trim()),
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        highlights: formData.highlights.split(',').map(highlight => highlight.trim()),
        date: new Date(formData.date)
      };

      if (editingAchievement) {
        const allImages = featuredImageFile ? [featuredImageFile, ...imageFiles] : imageFiles;
        const result = await updateAchievement(editingAchievement.id, achievementData, allImages);
        if (result.success) {
          toast.success('Achievement updated successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to update achievement');
        }
      } else {
        const allImages = featuredImageFile ? [featuredImageFile, ...imageFiles] : imageFiles;
        const result = await addAchievement(achievementData, allImages);
        if (result.success) {
          toast.success('Achievement added successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to add achievement');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (achievement: any) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title || '',
      description: achievement.description || '',
      slug: achievement.slug || '',
      date: achievement.date?.toDate ? format(achievement.date.toDate(), 'yyyy-MM-dd') : '',
      location: achievement.location || '',
      category: achievement.category || '',
      position: achievement.position || '',
      prize: achievement.prize || '',
      teamMembers: Array.isArray(achievement.teamMembers) ? achievement.teamMembers.join(', ') : '',
      technologies: Array.isArray(achievement.technologies) ? achievement.technologies.join(', ') : '',
      highlights: Array.isArray(achievement.highlights) ? achievement.highlights.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (achievement: any) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      const result = await deleteAchievement(achievement.id, achievement.images);
      if (result.success) {
        toast.success('Achievement deleted successfully!');
        refetch();
        onUpdate();
      } else {
        toast.error('Failed to delete achievement');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  if (loading) {
    return <div className="text-white">Loading achievements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Achievement Gallery</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
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
                  <option value="hackathon">Hackathon</option>
                  <option value="competition">Competition</option>
                  <option value="award">Award</option>
                  <option value="certification">Certification</option>
                  <option value="project">Project</option>
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
                URL: /achievements/{formData.slug || 'auto-generated-from-title'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="City, State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Position/Rank</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="1st Place, Winner, etc."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prize/Recognition</label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="₹50,000, Trophy, Certificate"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Highlights</label>
              <input
                type="text"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="Innovation Award, Best Technical Solution, Audience Choice"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                required={!editingAchievement}
              />
              <div className="text-xs text-gray-400 mt-1">
                Recommended size: 1200x630px for optimal display and SEO
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Additional Images (Gallery)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
              <div className="text-xs text-gray-400 mt-1">
                Upload additional images (certificates, team photos, project demos, etc.)
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{submitting ? 'Saving...' : 'Save Achievement'}</span>
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
        {achievements.map((achievement: any) => (
          <div key={achievement.id} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/50 border border-yellow-400/20 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300">
              
              {/* Image Gallery */}
              {achievement.images && achievement.images.length > 0 && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={achievement.images[0]}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {achievement.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      +{achievement.images.length - 1} more
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    achievement.category === 'hackathon' ? 'bg-purple-400/20 text-purple-400' :
                    achievement.category === 'competition' ? 'bg-blue-400/20 text-blue-400' :
                    achievement.category === 'award' ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-green-400/20 text-green-400'
                  }`}>
                    {achievement.category}
                  </span>
                  
                  {achievement.position && (
                    <div className="flex items-center text-yellow-400">
                      <Trophy className="h-4 w-4 mr-1" />
                      <span className="text-sm font-semibold">{achievement.position}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{achievement.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{achievement.description}</p>
                
                <div className="space-y-2 mb-4">
                  {achievement.date && (
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="h-3 w-3 mr-2" />
                      {format(achievement.date.toDate(), 'MMM dd, yyyy')}
                    </div>
                  )}
                  
                  {achievement.location && (
                    <div className="flex items-center text-gray-400 text-xs">
                      <MapPin className="h-3 w-3 mr-2" />
                      {achievement.location}
                    </div>
                  )}
                  
                  {achievement.prize && (
                    <div className="flex items-center text-green-400 text-xs">
                      <Award className="h-3 w-3 mr-2" />
                      {achievement.prize}
                    </div>
                  )}
                </div>
                
                {achievement.technologies && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {achievement.technologies.slice(0, 3).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {achievement.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded">
                        +{achievement.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(achievement)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(achievement)}
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

export default AchievementManager;
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar } from 'lucide-react';
import { useHackathons } from '../../hooks/useFirebaseData';
import { addHackathon, updateHackathon, deleteHackathon } from '../../services/firebaseService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface HackathonManagerProps {
  onUpdate: () => void;
}

const HackathonManager: React.FC<HackathonManagerProps> = ({ onUpdate }) => {
  const { hackathons, loading, refetch } = useHackathons();
  const [showForm, setShowForm] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    status: 'upcoming',
    result: '',
    technologies: '',
    teamSize: '',
    prize: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      status: 'upcoming',
      result: '',
      technologies: '',
      teamSize: '',
      prize: ''
    });
    setImageFile(null);
    setEditingHackathon(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const hackathonData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        date: new Date(formData.date)
      };

      if (editingHackathon) {
        const result = await updateHackathon(editingHackathon.id, hackathonData, imageFile || undefined);
        if (result.success) {
          toast.success('Hackathon updated successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to update hackathon');
        }
      } else {
        const result = await addHackathon(hackathonData, imageFile || undefined);
        if (result.success) {
          toast.success('Hackathon added successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to add hackathon');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (hackathon: any) => {
    setEditingHackathon(hackathon);
    setFormData({
      title: hackathon.title || '',
      description: hackathon.description || '',
      date: hackathon.date?.toDate ? format(hackathon.date.toDate(), 'yyyy-MM-dd') : '',
      location: hackathon.location || '',
      status: hackathon.status || 'upcoming',
      result: hackathon.result || '',
      technologies: Array.isArray(hackathon.technologies) ? hackathon.technologies.join(', ') : '',
      teamSize: hackathon.teamSize || '',
      prize: hackathon.prize || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (hackathon: any) => {
    if (window.confirm('Are you sure you want to delete this hackathon?')) {
      const result = await deleteHackathon(hackathon.id, hackathon.imageUrl);
      if (result.success) {
        toast.success('Hackathon deleted successfully!');
        refetch();
        onUpdate();
      } else {
        toast.error('Failed to delete hackathon');
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading hackathons...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hackathons</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Hackathon</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingHackathon ? 'Edit Hackathon' : 'Add New Hackathon'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
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
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
                <input
                  type="text"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="4-6 members"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prize</label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="₹50,000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Result</label>
                <input
                  type="text"
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="1st Place, Winner"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="React, Node.js, AI/ML"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{submitting ? 'Saving...' : 'Save'}</span>
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
        {hackathons.map((hackathon: any) => (
          <div key={hackathon.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            {hackathon.imageUrl && (
              <img
                src={hackathon.imageUrl}
                alt={hackathon.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{hackathon.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  hackathon.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                  hackathon.status === 'ongoing' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-blue-400/20 text-blue-400'
                }`}>
                  {hackathon.status}
                </span>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {hackathon.date?.toDate ? format(hackathon.date.toDate(), 'MMM dd, yyyy') : 'No date'}
              </div>
              
              <p className="text-gray-400 text-sm mb-3">{hackathon.description}</p>
              
              {hackathon.result && (
                <div className="text-green-400 text-sm font-medium mb-2">
                  🏆 {hackathon.result}
                </div>
              )}
              
              {hackathon.technologies && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {hackathon.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(hackathon)}
                className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleDelete(hackathon)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonManager;
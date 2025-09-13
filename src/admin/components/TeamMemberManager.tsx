import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useTeamMembers } from '../../hooks/useFirebaseData';
import { addTeamMember, updateTeamMember, deleteTeamMember } from '../../services/firebaseService';
import toast from 'react-hot-toast';

interface TeamMemberManagerProps {
  onUpdate: () => void;
}

const TeamMemberManager: React.FC<TeamMemberManagerProps> = ({ onUpdate }) => {
  const { members, loading, refetch } = useTeamMembers();
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    skills: '',
    linkedin: '',
    github: '',
    email: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      description: '',
      skills: '',
      linkedin: '',
      github: '',
      email: ''
    });
    setImageFile(null);
    setEditingMember(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const memberData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      };

      if (editingMember) {
        const result = await updateTeamMember(editingMember.id, memberData, imageFile || undefined);
        if (result.success) {
          toast.success('Team member updated successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to update team member');
        }
      } else {
        const result = await addTeamMember(memberData, imageFile || undefined);
        if (result.success) {
          toast.success('Team member added successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to add team member');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      description: member.description || '',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      email: member.email || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (member: any) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      const result = await deleteTeamMember(member.id, member.imageUrl);
      if (result.success) {
        toast.success('Team member deleted successfully!');
        refetch();
        onUpdate();
      } else {
        toast.error('Failed to delete team member');
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading team members...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Team Members</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma separated)</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="React, Node.js, Python"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
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
        {members.map((member: any) => (
          <div key={member.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-cyan-400 text-sm">{member.role}</p>
              <p className="text-gray-400 text-sm mt-2">{member.description}</p>
            </div>

            {member.skills && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleDelete(member)}
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

export default TeamMemberManager;
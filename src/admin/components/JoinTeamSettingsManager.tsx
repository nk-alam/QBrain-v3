import React, { useState, useEffect } from 'react';
import { Users, Save, Plus, Trash2, Edit, X } from 'lucide-react';
import { getJoinTeamSettings, updateJoinTeamSettings } from '../../services/firebaseService';
import toast from 'react-hot-toast';

const JoinTeamSettingsManager = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    title: 'Join Our Team',
    description: 'Ready to be part of something extraordinary? Complete our application process and join the future of tech innovation.',
    benefits: [
      {
        icon: '💰',
        title: '₹500 Monthly Stipend',
        description: 'Competitive financial support for dedicated team members'
      },
      {
        icon: '📚',
        title: 'Skill Development',
        description: 'Hands-on experience with cutting-edge technologies'
      },
      {
        icon: '🤝',
        title: 'Professional Network',
        description: 'Connect with industry professionals and mentors'
      },
      {
        icon: '📈',
        title: 'Career Growth',
        description: 'Portfolio building and leadership opportunities'
      }
    ],
    requirements: [
      'B.Tech students (all streams welcome)',
      'Strong academic performance',
      'Passion for technology and innovation',
      'Relevant technical skills for chosen role',
      'Dedication to team goals and projects',
      'Availability for hackathons and competitions'
    ],
    applicationSteps: [
      {
        title: 'Basic Information',
        description: 'Fill out your personal and academic details',
        duration: '10 minutes'
      },
      {
        title: 'Technical Quiz',
        description: 'Complete our technical assessment (70% minimum)',
        duration: '30 minutes'
      },
      {
        title: 'Resume Upload',
        description: 'Upload your latest resume in PDF format',
        duration: '5 minutes'
      },
      {
        title: 'Interview Schedule',
        description: 'Schedule your technical interview with our team',
        duration: '5 minutes'
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<number | null>(null);
  const [newBenefit, setNewBenefit] = useState({ icon: '', title: '', description: '' });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getJoinTeamSettings();
      if (result.success && result.data) {
        setSettings({ ...settings, ...result.data });
      }
    } catch (error) {
      console.error('Error loading join team settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateJoinTeamSettings(settings);
      if (result.success) {
        toast.success('Join team settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      setSettings(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit]
      }));
      setNewBenefit({ icon: '', title: '', description: '' });
    }
  };

  const removeBenefit = (index: number) => {
    setSettings(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const updateBenefit = (index: number, benefit: any) => {
    setSettings(prev => ({
      ...prev,
      benefits: prev.benefits.map((b, i) => i === index ? benefit : b)
    }));
    setEditingBenefit(null);
  };

  if (loading) {
    return <div className="text-white">Loading join team settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Join Team Page Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Basic Settings */}
      <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Page Content
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-medium">Enable Join Team Page</h4>
              <p className="text-gray-400 text-sm">Allow users to apply to join the team</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => setSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Page Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Benefits Management */}
      <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Team Benefits</h3>
        
        <div className="space-y-4 mb-6">
          {settings.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              {editingBenefit === index ? (
                <div className="flex-1 grid md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => updateBenefit(index, { ...benefit, icon: e.target.value })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="🎯"
                  />
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, { ...benefit, title: e.target.value })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Benefit title"
                  />
                  <input
                    type="text"
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, { ...benefit, description: e.target.value })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Benefit description"
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center space-x-4">
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <h4 className="text-white font-medium">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                {editingBenefit === index ? (
                  <button
                    onClick={() => setEditingBenefit(null)}
                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingBenefit(index)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                
                <button
                  onClick={() => removeBenefit(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add New Benefit */}
        <div className="border-t border-slate-600/50 pt-4">
          <h4 className="text-white font-medium mb-3">Add New Benefit</h4>
          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              value={newBenefit.icon}
              onChange={(e) => setNewBenefit(prev => ({ ...prev, icon: e.target.value }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="🎯 Icon"
            />
            <input
              type="text"
              value={newBenefit.title}
              onChange={(e) => setNewBenefit(prev => ({ ...prev, title: e.target.value }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Benefit title"
            />
            <input
              type="text"
              value={newBenefit.description}
              onChange={(e) => setNewBenefit(prev => ({ ...prev, description: e.target.value }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Description"
            />
          </div>
          <button
            onClick={addBenefit}
            className="flex items-center space-x-2 px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Benefit</span>
          </button>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Eligibility Requirements</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Requirements (one per line)
          </label>
          <textarea
            value={settings.requirements.join('\n')}
            onChange={(e) => setSettings(prev => ({ 
              ...prev, 
              requirements: e.target.value.split('\n').filter(req => req.trim()) 
            }))}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
            rows={6}
            placeholder="Enter each requirement on a new line..."
          />
        </div>
      </div>
    </div>
  );
};

export default JoinTeamSettingsManager;
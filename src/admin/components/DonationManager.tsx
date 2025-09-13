import React, { useState, useEffect } from 'react';
import { Heart, Save, QrCode, CreditCard, Plus, Trash2, Edit, X } from 'lucide-react';
import { getDonationSettings, updateDonationSettings } from '../../services/firebaseService';
import toast from 'react-hot-toast';

const DonationManager = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    title: 'Support Our Innovation',
    description: 'Help us build tomorrow\'s technology today. Your support enables us to participate in more hackathons and develop cutting-edge solutions.',
    upiId: 'qbrain@paytm',
    paypalEmail: 'donations@qbrain.in',
    donationGoals: [
      {
        title: 'Hardware Components',
        description: 'Arduino, Raspberry Pi, sensors for IoT projects',
        amount: 25000,
        raised: 5000
      },
      {
        title: 'Competition Travel',
        description: 'Travel expenses for national hackathons',
        amount: 50000,
        raised: 12000
      },
      {
        title: 'Software Licenses',
        description: 'Professional development tools and cloud services',
        amount: 15000,
        raised: 8000
      }
    ],
    thankYouMessage: 'Thank you for supporting our journey in technology innovation! Your contribution helps us build amazing solutions.',
    minimumAmount: 100,
    suggestedAmounts: [500, 1000, 2500, 5000]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', amount: 0, raised: 0 });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getDonationSettings();
      if (result.success && result.data) {
        setSettings({ ...settings, ...result.data });
      }
    } catch (error) {
      console.error('Error loading donation settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateDonationSettings(settings);
      if (result.success) {
        toast.success('Donation settings saved successfully!');
      } else {
        toast.error('Failed to save donation settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.amount > 0) {
      setSettings(prev => ({
        ...prev,
        donationGoals: [...prev.donationGoals, newGoal]
      }));
      setNewGoal({ title: '', description: '', amount: 0, raised: 0 });
    }
  };

  const removeGoal = (index: number) => {
    setSettings(prev => ({
      ...prev,
      donationGoals: prev.donationGoals.filter((_, i) => i !== index)
    }));
  };

  const updateGoal = (index: number, goal: any) => {
    setSettings(prev => ({
      ...prev,
      donationGoals: prev.donationGoals.map((g, i) => i === index ? goal : g)
    }));
    setEditingGoal(null);
  };

  if (loading) {
    return <div className="text-white">Loading donation settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Donation Management</h2>
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
          <Heart className="h-5 w-5 mr-2" />
          Donation Page Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-medium">Enable Donations</h4>
              <p className="text-gray-400 text-sm">Allow users to support the team</p>
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
              Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thank You Message
            </label>
            <textarea
              value={settings.thankYouMessage}
              onChange={(e) => setSettings(prev => ({ ...prev, thankYouMessage: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Methods
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              value={settings.upiId}
              onChange={(e) => setSettings(prev => ({ ...prev, upiId: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="yourname@paytm"
            />
            <div className="text-xs text-gray-400 mt-1">
              UPI ID for generating QR codes
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PayPal Email
            </label>
            <input
              type="email"
              value={settings.paypalEmail}
              onChange={(e) => setSettings(prev => ({ ...prev, paypalEmail: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="donations@qbrain.in"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Minimum Amount (₹)
            </label>
            <input
              type="number"
              value={settings.minimumAmount}
              onChange={(e) => setSettings(prev => ({ ...prev, minimumAmount: Number(e.target.value) }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Suggested Amounts (comma separated)
            </label>
            <input
              type="text"
              value={settings.suggestedAmounts.join(', ')}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                suggestedAmounts: e.target.value.split(',').map(amount => Number(amount.trim())).filter(amount => amount > 0)
              }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="500, 1000, 2500, 5000"
            />
          </div>
        </div>
      </div>

      {/* Donation Goals */}
      <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Donation Goals</h3>
        
        <div className="space-y-4 mb-6">
          {settings.donationGoals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              {editingGoal === index ? (
                <div className="flex-1 grid md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => updateGoal(index, { ...goal, title: e.target.value })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Goal title"
                  />
                  <input
                    type="text"
                    value={goal.description}
                    onChange={(e) => updateGoal(index, { ...goal, description: e.target.value })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={goal.amount}
                    onChange={(e) => updateGoal(index, { ...goal, amount: Number(e.target.value) })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Target amount"
                  />
                  <input
                    type="number"
                    value={goal.raised}
                    onChange={(e) => updateGoal(index, { ...goal, raised: Number(e.target.value) })}
                    className="px-3 py-2 bg-slate-600/50 border border-slate-500/50 rounded text-white"
                    placeholder="Raised amount"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <h4 className="text-white font-medium">{goal.title}</h4>
                  <p className="text-gray-400 text-sm">{goal.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">₹{goal.raised.toLocaleString()}</span>
                      <span className="text-gray-400">₹{goal.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((goal.raised / goal.amount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {Math.round((goal.raised / goal.amount) * 100)}% completed
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                {editingGoal === index ? (
                  <button
                    onClick={() => setEditingGoal(null)}
                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingGoal(index)}
                    className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                
                <button
                  onClick={() => removeGoal(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add New Goal */}
        <div className="border-t border-slate-600/50 pt-4">
          <h4 className="text-white font-medium mb-3">Add New Goal</h4>
          <div className="grid md:grid-cols-4 gap-3 mb-3">
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Goal title"
            />
            <input
              type="text"
              value={newGoal.description}
              onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Description"
            />
            <input
              type="number"
              value={newGoal.amount || ''}
              onChange={(e) => setNewGoal(prev => ({ ...prev, amount: Number(e.target.value) }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Target amount"
            />
            <input
              type="number"
              value={newGoal.raised || ''}
              onChange={(e) => setNewGoal(prev => ({ ...prev, raised: Number(e.target.value) }))}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="Raised amount"
            />
          </div>
          <button
            onClick={addGoal}
            className="flex items-center space-x-2 px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationManager;
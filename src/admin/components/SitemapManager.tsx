import React, { useState, useEffect } from 'react';
import { Globe, Download, RefreshCw, Save, ExternalLink } from 'lucide-react';
import { getSitemapSettings, updateSitemapSettings, generateSitemap } from '../../services/sitemapService';
import toast from 'react-hot-toast';

const SitemapManager = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    baseUrl: 'https://qbrain.in',
    includeBlogs: true,
    includeAchievements: true,
    changeFrequency: 'weekly',
    priority: {
      homepage: '1.0',
      about: '0.8',
      team: '0.8',
      achievements: '0.9',
      blog: '0.9',
      contact: '0.7',
      join: '0.8'
    },
    excludePages: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getSitemapSettings();
      if (result.success && result.data) {
        setSettings({ ...settings, ...result.data });
        setLastGenerated(result.data.lastGenerated?.toDate() || null);
      }
    } catch (error) {
      console.error('Error loading sitemap settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateSitemapSettings(settings);
      if (result.success) {
        toast.success('Sitemap settings saved successfully!');
      } else {
        toast.error('Failed to save sitemap settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setGenerating(true);
    try {
      const result = await generateSitemap(settings);
      if (result.success) {
        toast.success('Sitemap generated successfully!');
        setLastGenerated(new Date());
        
        // Trigger sitemap regeneration
        try {
          const response = await fetch('/api/sitemap', { 
            method: 'GET',
            cache: 'no-cache'
          });
          if (response.ok) {
            console.log('Sitemap API triggered successfully');
          }
        } catch (error) {
          console.log('Sitemap API trigger failed, but settings saved');
        }
      } else {
        toast.error('Failed to generate sitemap');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading sitemap settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Sitemap Manager</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleGenerateSitemap}
            disabled={generating}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-400/20 text-purple-400 rounded-lg hover:bg-purple-400/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Generating...' : 'Generate Sitemap'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Basic Settings */}
      <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Sitemap Configuration
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Enable Sitemap Generation</h4>
              <p className="text-gray-400 text-sm">Automatically generate and update sitemap.xml</p>
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
              Base URL
            </label>
            <input
              type="url"
              value={settings.baseUrl}
              onChange={(e) => setSettings(prev => ({ ...prev, baseUrl: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="https://qbrain.in"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Change Frequency
              </label>
              <select
                value={settings.changeFrequency}
                onChange={(e) => setSettings(prev => ({ ...prev, changeFrequency: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.includeBlogs}
                  onChange={(e) => setSettings(prev => ({ ...prev, includeBlogs: e.target.checked }))}
                  className="mr-2 h-4 w-4 text-cyan-400 border-slate-600 rounded focus:ring-cyan-400"
                />
                <span className="text-gray-300">Include Blogs</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.includeAchievements}
                  onChange={(e) => setSettings(prev => ({ ...prev, includeAchievements: e.target.checked }))}
                  className="mr-2 h-4 w-4 text-cyan-400 border-slate-600 rounded focus:ring-cyan-400"
                />
                <span className="text-gray-300">Include Achievements</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Settings */}
      <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Page Priorities</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(settings.priority).map(([page, priority]) => (
            <div key={page}>
              <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                {page} Page Priority
              </label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={priority}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  priority: { ...prev.priority, [page]: e.target.value }
                }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Sitemap Status</h3>
        
        <div className="space-y-4">
          {lastGenerated && (
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <div className="text-white font-medium">Last Generated</div>
                <div className="text-gray-400 text-sm">
                  {format(lastGenerated, 'MMMM dd, yyyy at HH:mm')}
                </div>
              </div>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>View Sitemap</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
          
          <div className="text-sm text-gray-400">
            <p>• Sitemap is dynamically generated from your content</p>
            <p>• Search engines will be notified of updates</p>
            <p>• All public pages, blogs, and achievements will be included</p>
            <p>• SEO-friendly URLs are automatically generated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapManager;
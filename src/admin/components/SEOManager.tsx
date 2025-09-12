import React, { useState, useEffect } from 'react';
import { Search, Code, Save, Globe, Tag } from 'lucide-react';
import { getSEOSettings, updateSEOSettings } from '../../services/firebaseService';
import toast from 'react-hot-toast';

const SEOManager = () => {
  const [settings, setSettings] = useState({
    globalTitle: 'Qbrain Team - Elite B.Tech Student Technology Team',
    globalDescription: 'Join Qbrain Team, an elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions.',
    globalKeywords: 'qbrain team, hackathon winners, AI IoT team, B.Tech students, smart india hackathon, tech competition',
    siteName: 'Qbrain Team',
    twitterHandle: '@qbrain',
    facebookAppId: '',
    googleAnalyticsId: '',
    googleSearchConsoleCode: '',
    facebookPixelId: '',
    headerScripts: '',
    footerScripts: '',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapUrl: 'https://qbrain.in/sitemap.xml'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getSEOSettings();
      if (result.success && result.data) {
        setSettings({ ...settings, ...result.data });
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateSEOSettings(settings);
      if (result.success) {
        toast.success('SEO settings saved successfully!');
      } else {
        toast.error('Failed to save SEO settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading SEO settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">SEO & Analytics Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Global SEO Settings */}
      <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Global SEO Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Global Site Title
            </label>
            <input
              type="text"
              value={settings.globalTitle}
              onChange={(e) => setSettings(prev => ({ ...prev, globalTitle: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              maxLength={60}
            />
            <div className="text-xs text-gray-400 mt-1">{settings.globalTitle.length}/60 characters</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Global Meta Description
            </label>
            <textarea
              value={settings.globalDescription}
              onChange={(e) => setSettings(prev => ({ ...prev, globalDescription: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              rows={3}
              maxLength={160}
            />
            <div className="text-xs text-gray-400 mt-1">{settings.globalDescription.length}/160 characters</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Global Keywords
            </label>
            <input
              type="text"
              value={settings.globalKeywords}
              onChange={(e) => setSettings(prev => ({ ...prev, globalKeywords: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Twitter Handle
              </label>
              <input
                type="text"
                value={settings.twitterHandle}
                onChange={(e) => setSettings(prev => ({ ...prev, twitterHandle: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="@qbrain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Settings */}
      <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Analytics & Tracking
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.googleAnalyticsId}
              onChange={(e) => setSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Google Search Console Verification Code
            </label>
            <input
              type="text"
              value={settings.googleSearchConsoleCode}
              onChange={(e) => setSettings(prev => ({ ...prev, googleSearchConsoleCode: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              placeholder="google-site-verification=..."
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facebook App ID
              </label>
              <input
                type="text"
                value={settings.facebookAppId}
                onChange={(e) => setSettings(prev => ({ ...prev, facebookAppId: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Facebook Pixel ID
              </label>
              <input
                type="text"
                value={settings.facebookPixelId}
                onChange={(e) => setSettings(prev => ({ ...prev, facebookPixelId: e.target.value }))}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scripts */}
      <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Code className="h-5 w-5 mr-2" />
          Custom Scripts & Code
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Header Scripts (Before &lt;/head&gt;)
            </label>
            <textarea
              value={settings.headerScripts}
              onChange={(e) => setSettings(prev => ({ ...prev, headerScripts: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono text-sm"
              rows={6}
              placeholder="<!-- Google Analytics, Search Console, etc. -->"
            />
            <div className="text-xs text-gray-400 mt-1">
              Add tracking codes, meta tags, or other scripts that should be in the head section
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Footer Scripts (Before &lt;/body&gt;)
            </label>
            <textarea
              value={settings.footerScripts}
              onChange={(e) => setSettings(prev => ({ ...prev, footerScripts: e.target.value }))}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono text-sm"
              rows={6}
              placeholder="<!-- Chat widgets, analytics, etc. -->"
            />
            <div className="text-xs text-gray-400 mt-1">
              Add scripts that should load at the end of the page
            </div>
          </div>
        </div>
      </div>

      {/* Robots.txt */}
      <div className="bg-slate-800/50 border border-yellow-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Robots.txt Configuration</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Robots.txt Content
          </label>
          <textarea
            value={settings.robotsTxt}
            onChange={(e) => setSettings(prev => ({ ...prev, robotsTxt: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white font-mono text-sm"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SEOManager;
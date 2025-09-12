import React, { useState, useEffect } from 'react';
import { Palette, Save, RotateCcw, Eye, Monitor } from 'lucide-react';
import { getUISettings, updateUISettings } from '../../services/firebaseService';
import toast from 'react-hot-toast';

const UICustomizer = () => {
  const [settings, setSettings] = useState({
    primaryColor: '#00D4FF',
    secondaryColor: '#39FF14',
    accentColor: '#8B5CF6',
    backgroundColor: '#0F172A',
    cardBackground: '#1E293B',
    textColor: '#FFFFFF',
    mutedTextColor: '#94A3B8',
    borderRadius: '12',
    spacing: '6',
    fontFamily: 'Inter',
    headerStyle: 'gradient',
    buttonStyle: 'rounded',
    animationSpeed: 'normal'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const result = await getUISettings();
    if (result.success && result.data) {
      setSettings({ ...settings, ...result.data });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateUISettings(settings);
    if (result.success) {
      toast.success('UI settings saved successfully!');
      // Apply settings to CSS variables
      applySettings();
    } else {
      toast.error('Failed to save settings');
    }
    setSaving(false);
  };

  const applySettings = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--secondary-color', settings.secondaryColor);
    root.style.setProperty('--accent-color', settings.accentColor);
    root.style.setProperty('--bg-color', settings.backgroundColor);
    root.style.setProperty('--card-bg', settings.cardBackground);
    root.style.setProperty('--text-color', settings.textColor);
    root.style.setProperty('--muted-text', settings.mutedTextColor);
    root.style.setProperty('--border-radius', `${settings.borderRadius}px`);
    root.style.setProperty('--spacing', `${settings.spacing * 4}px`);
  };

  const resetToDefault = () => {
    setSettings({
      primaryColor: '#00D4FF',
      secondaryColor: '#39FF14',
      accentColor: '#8B5CF6',
      backgroundColor: '#0F172A',
      cardBackground: '#1E293B',
      textColor: '#FFFFFF',
      mutedTextColor: '#94A3B8',
      borderRadius: '12',
      spacing: '6',
      fontFamily: 'Inter',
      headerStyle: 'gradient',
      buttonStyle: 'rounded',
      animationSpeed: 'normal'
    });
  };

  const colorPresets = [
    { name: 'Ocean', primary: '#00D4FF', secondary: '#39FF14' },
    { name: 'Sunset', primary: '#FF6B6B', secondary: '#FFE66D' },
    { name: 'Forest', primary: '#4ECDC4', secondary: '#45B7D1' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
    { name: 'Fire', primary: '#F59E0B', secondary: '#EF4444' }
  ];

  if (loading) {
    return <div className="text-white">Loading UI settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">UI Customizer</h2>
        <div className="flex space-x-3">
          <button
            onClick={resetToDefault}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Color Settings */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Color Scheme
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-12 h-10 rounded border border-slate-600"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="w-12 h-10 rounded border border-slate-600"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="w-12 h-10 rounded border border-slate-600"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Background</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.cardBackground}
                      onChange={(e) => setSettings({ ...settings, cardBackground: e.target.value })}
                      className="w-12 h-10 rounded border border-slate-600"
                    />
                    <input
                      type="text"
                      value={settings.cardBackground}
                      onChange={(e) => setSettings({ ...settings, cardBackground: e.target.value })}
                      className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setSettings({
                        ...settings,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary
                      })}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg hover:bg-slate-600/50 transition-colors"
                    >
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.primary }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.secondary }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Layout Settings */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Layout & Spacing</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius</label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({ ...settings, borderRadius: e.target.value })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400 mt-1">{settings.borderRadius}px</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Spacing Scale</label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={settings.spacing}
                    onChange={(e) => setSettings({ ...settings, spacing: e.target.value })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-400 mt-1">{settings.spacing * 4}px base</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Header Style</label>
                  <select
                    value={settings.headerStyle}
                    onChange={(e) => setSettings({ ...settings, headerStyle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white"
                  >
                    <option value="gradient">Gradient</option>
                    <option value="solid">Solid</option>
                    <option value="transparent">Transparent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Button Style</label>
                  <select
                    value={settings.buttonStyle}
                    onChange={(e) => setSettings({ ...settings, buttonStyle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white"
                  >
                    <option value="rounded">Rounded</option>
                    <option value="square">Square</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Live Preview
          </h3>
          
          <div 
            className="rounded-lg p-6 space-y-4"
            style={{ 
              backgroundColor: settings.cardBackground,
              borderRadius: `${settings.borderRadius}px`
            }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                }}
              >
                <Monitor className="h-6 w-6 text-black" />
              </div>
              <div>
                <h4 style={{ color: settings.textColor }} className="font-semibold">
                  Sample Card Title
                </h4>
                <p style={{ color: settings.mutedTextColor }} className="text-sm">
                  This is how your content will look
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                className="px-4 py-2 font-semibold text-black transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                  borderRadius: settings.buttonStyle === 'pill' ? '9999px' : 
                               settings.buttonStyle === 'square' ? '4px' : 
                               `${settings.borderRadius}px`
                }}
              >
                Primary Button
              </button>
              
              <div 
                className="p-3 border"
                style={{ 
                  borderColor: settings.primaryColor + '40',
                  backgroundColor: settings.primaryColor + '10',
                  borderRadius: `${settings.borderRadius}px`
                }}
              >
                <p style={{ color: settings.textColor }} className="text-sm">
                  Sample notification or alert component
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UICustomizer;
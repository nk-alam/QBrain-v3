import React, { useState, useEffect } from 'react';
import { Volume2, Upload, Save, Play, Pause, Plus, Trash2 } from 'lucide-react';
import { getWelcomeSettings, updateWelcomeSettings } from '../../services/firebaseService';
import toast from 'react-hot-toast';

const WelcomeSettingsManager = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    message: '',
    welcomeMessages: [
      "Welcome to QBrain! Where innovation meets excellence.",
      "Hello there! Ready to explore the future of technology?",
      "Welcome to our world of cutting-edge innovation!",
      "Greetings! Discover what makes QBrain extraordinary."
    ],
    clickSoundUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getWelcomeSettings();
      if (result.success && result.data) {
        setSettings({ ...settings, ...result.data });
      }
    } catch (error) {
      console.error('Error loading welcome settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateWelcomeSettings(settings, audioFile || undefined);
      if (result.success) {
        toast.success('Welcome settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addMessage = () => {
    if (newMessage.trim()) {
      setSettings(prev => ({
        ...prev,
        welcomeMessages: [...prev.welcomeMessages, newMessage.trim()]
      }));
      setNewMessage('');
    }
  };

  const removeMessage = (index: number) => {
    setSettings(prev => ({
      ...prev,
      welcomeMessages: prev.welcomeMessages.filter((_, i) => i !== index)
    }));
  };

  const testWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const message = settings.message || settings.welcomeMessages[0];
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return <div className="text-white">Loading welcome settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Welcome & Audio Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Welcome Message Settings */}
      <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Volume2 className="h-5 w-5 mr-2" />
          Welcome Message Settings
        </h3>
        
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Enable Welcome Message</h4>
              <p className="text-gray-400 text-sm">Play welcome message when users first visit</p>
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

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Welcome Message (Optional)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={settings.message}
                onChange={(e) => setSettings(prev => ({ ...prev, message: e.target.value }))}
                className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="Leave empty to use random messages"
              />
              <button
                onClick={testWelcomeMessage}
                className="px-4 py-2 bg-cyan-400/20 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-colors"
              >
                <Play className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Random Messages */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Random Welcome Messages
            </label>
            <div className="space-y-3">
              {settings.welcomeMessages.map((message, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => {
                      const newMessages = [...settings.welcomeMessages];
                      newMessages[index] = e.target.value;
                      setSettings(prev => ({ ...prev, welcomeMessages: newMessages }));
                    }}
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  />
                  <button
                    onClick={() => removeMessage(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="Add new welcome message..."
                />
                <button
                  onClick={addMessage}
                  className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Sound Settings */}
      <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Click Sound Effects</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Click Sound (MP3)
            </label>
            <input
              type="file"
              accept="audio/mp3,audio/mpeg"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
            />
            <div className="text-xs text-gray-400 mt-1">
              Upload an MP3 file for click sound effects (max 1MB)
            </div>
          </div>
          
          {settings.clickSoundUrl && (
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <p className="text-green-400 text-sm mb-2">✓ Click sound uploaded</p>
              <audio controls className="w-full">
                <source src={settings.clickSoundUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSettingsManager;
import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { getWelcomeSettings } from '../services/firebaseService';

const WelcomeManager: React.FC = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    // Load welcome settings
    loadWelcomeSettings();
  }, []);

  const loadWelcomeSettings = async () => {
    try {
      const result = await getWelcomeSettings();
      if (result.success && result.data) {
        setIsEnabled(result.data.enabled !== false);
        setWelcomeMessage(result.data.message || '');
        
        if (result.data.clickSoundUrl) {
          audioManager.setClickSound(result.data.clickSoundUrl);
        }
        
        if (result.data.welcomeMessages && Array.isArray(result.data.welcomeMessages)) {
          audioManager.setWelcomeMessages(result.data.welcomeMessages);
        }
        
        // Set selected voice
        if (result.data.selectedVoiceName) {
          const voices = speechSynthesis.getVoices();
          const selectedVoice = voices.find(voice => voice.name === result.data.selectedVoiceName);
          if (selectedVoice) {
            audioManager.setVoice(selectedVoice);
          }
        }
      }
    } catch (error) {
      console.error('Error loading welcome settings:', error);
    }
  };

  const playWelcome = () => {
    if (isEnabled) {
      // Add a small delay to ensure page is loaded
      setTimeout(() => {
        audioManager.playWelcomeMessage(welcomeMessage);
        setHasPlayed(true);
      }, 1000);
    }
  };

  // Auto-play on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isEnabled) {
        playWelcome();
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!hasPlayed && (
        <button
          onClick={playWelcome}
          className="group relative p-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Play welcome message"
        >
          <Volume2 className="h-5 w-5" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
        </button>
      )}
    </div>
  );
};

export default WelcomeManager;
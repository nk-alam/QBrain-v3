import React, { useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

interface ClickSoundProviderProps {
  children: React.ReactNode;
}

const ClickSoundProvider: React.FC<ClickSoundProviderProps> = ({ children }) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Only play sound for interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        audioManager.playClickSound();
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <>{children}</>;
};

export default ClickSoundProvider;
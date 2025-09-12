export class AudioManager {
  private static instance: AudioManager;
  private clickSound: HTMLAudioElement | null = null;
  private welcomeMessages: string[] = [
    "Welcome to QBrain! Where innovation meets excellence.",
    "Hello there! Ready to explore the future of technology?",
    "Welcome to our world of cutting-edge innovation!",
    "Greetings! Discover what makes QBrain extraordinary.",
    "Welcome aboard! Let's build tomorrow's technology today.",
    "Hello and welcome! Your journey into innovation starts here.",
    "Welcome to QBrain! Where brilliant minds create amazing solutions.",
    "Greetings, innovator! Ready to see what we've been building?"
  ];

  private constructor() {
    this.initializeClickSound();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initializeClickSound() {
    // Create a default click sound using Web Audio API
    this.createDefaultClickSound();
  }

  private createDefaultClickSound() {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a simple click sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio context not available');
    }
  }

  public playClickSound() {
    if (this.clickSound) {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {
        // Ignore autoplay restrictions
      });
    } else {
      this.createDefaultClickSound();
    }
  }

  public setClickSound(audioUrl: string) {
    this.clickSound = new Audio(audioUrl);
    this.clickSound.volume = 0.3;
  }

  public playWelcomeMessage(customMessage?: string) {
    if ('speechSynthesis' in window) {
      const message = customMessage || this.getRandomWelcomeMessage();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.7;
      
      // Try to use a pleasant voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.lang.includes('en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  }

  private getRandomWelcomeMessage(): string {
    return this.welcomeMessages[Math.floor(Math.random() * this.welcomeMessages.length)];
  }

  public setWelcomeMessages(messages: string[]) {
    this.welcomeMessages = messages;
  }
}

export const audioManager = AudioManager.getInstance();
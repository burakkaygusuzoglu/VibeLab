// src/utils/soundManager.ts
// Minimal Sound Manager - Sound system disabled until audio files are added
import { Audio } from 'expo-av';

export type SoundType = string;
export type BackgroundMusicType = 'chill' | 'romantic' | 'playful';

class SoundManager {
  private soundEnabled = false; // Disabled until sounds are added
  private soundVolume = 0.7;
  private backgroundMusicEnabled = false;
  private backgroundMusicVolume = 0.2;
  private currentBackgroundTrack: Audio.Sound | null = null;
  private currentMood: BackgroundMusicType = 'chill';
  private loadedSounds: Map<string, Audio.Sound> = new Map();

  async initialize() {
    // Disabled - no sound files available
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async play(_type: SoundType, _volumeOverride?: number) {
    // Disabled - no sound files available
  }

  async playBackgroundMusic(_mood?: BackgroundMusicType) {
    // Disabled - no background music files available
  }

  async stopBackgroundMusic() {
    if (this.currentBackgroundTrack) {
      try {
        await this.currentBackgroundTrack.stopAsync();
        await this.currentBackgroundTrack.unloadAsync();
        this.currentBackgroundTrack = null;
      } catch (error) {
        console.error('Failed to stop background music:', error);
      }
    }
  }

  async setBackgroundMusicVolume(volume: number) {
    this.backgroundMusicVolume = Math.max(0, Math.min(0.3, volume));
  }

  async changeMood(mood: BackgroundMusicType) {
    this.currentMood = mood;
  }

  setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  async setVolume(volume: number) {
    this.soundVolume = Math.max(0, Math.min(1, volume));
  }

  setBackgroundMusicEnabled(enabled: boolean) {
    this.backgroundMusicEnabled = enabled;
  }

  async unloadAll() {
    for (const sound of this.loadedSounds.values()) {
      try {
        await sound.unloadAsync();
      } catch {
        // Ignore errors during cleanup
      }
    }
    this.loadedSounds.clear();
    await this.stopBackgroundMusic();
  }

  getEnabled(): boolean {
    return this.soundEnabled;
  }

  getVolume(): number {
    return this.soundVolume;
  }

  getBackgroundMusicEnabled(): boolean {
    return this.backgroundMusicEnabled;
  }

  getBackgroundMusicVolume(): number {
    return this.backgroundMusicVolume;
  }

  getCurrentMood(): BackgroundMusicType {
    return this.currentMood;
  }

  async playClick() {}
  async playCorrect() {}
  async playWrong() {}
  async playSuccess() {}
  async playError() {}
}

export const soundManager = new SoundManager();

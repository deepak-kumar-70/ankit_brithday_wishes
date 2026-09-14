/**
 * Web Audio API ambient synthesizer for background lo-fi music and celebratory sound effects
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private isMuted = false;
  private currentTrackIndex = 0;
  private masterGain: GainNode | null = null;

  public tracks = [
    { title: "birthday-music.mp3", label: "Why You're Great • birthday-music.mp3", bpm: 82 },
    { title: "lofi-dorm-vibes.mp3", label: "Late Night Dorm Room Vibes • Lo-fi", bpm: 72 },
    { title: "midnight-memories.mp3", label: "Midnight Shenanigans • Acoustic", bpm: 90 }
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.start();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public setMuted(mute: boolean) {
    this.isMuted = mute;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(mute ? 0 : 0.12, this.ctx.currentTime, 0.05);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.getCurrentTrack();
  }

  private start() {
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // Lo-Fi Birthday chord progression: Cmaj7 -> Am7 -> Dm7 -> G7sus4 -> Em7
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [146.83, 220.00, 261.63, 349.23], // Dm7
      [196.00, 261.63, 293.66, 392.00], // G7sus4
      [164.81, 246.94, 293.66, 329.63], // Em7
      [220.00, 277.18, 329.63, 440.00], // A7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G7
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      // Play soft warm electric piano/pad tone
      chord.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        // Warm lowpass filter for that lo-fi warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650 + i * 120, this.ctx!.currentTime);
        filter.Q.setValueAtTime(1.5, this.ctx!.currentTime);

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        const now = this.ctx!.currentTime;
        const duration = 2.4;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.045 / (i + 1), now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.05); // slight strum stagger
        osc.stop(now + duration + 0.2);
      });

      // Play subtle chime / sparkler note
      if (Math.random() > 0.4) {
        const chimeFreq = [523.25, 659.25, 783.99, 987.77, 1046.50][Math.floor(Math.random() * 5)];
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(chimeFreq, this.ctx.currentTime);

        const now = this.ctx.currentTime + 0.3;
        chimeGain.gain.setValueAtTime(0, now);
        chimeGain.gain.linearRampToValueAtTime(0.02, now + 0.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.masterGain);
        chimeOsc.start(now);
        chimeOsc.stop(now + 1.4);
      }

      this.timer = window.setTimeout(playNextChord, 2200);
    };

    playNextChord();
  }

  private stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // Sound effects
  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.7);
    });
  }

  public playBlowSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // White noise puff for candle blow
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
  }

  public playSuccessSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.6);
    });
  }
}

export const soundEngine = new SoundEngine();

/**
 * Web Audio API based Sound and Music Engine
 * Zero external audio dependencies, 100% reliable, zero latency, compliant with modern browser autoplay policies.
 * Supports multiple sound themes: Retro Arcade, Cyber Sci-Fi, Cartoon Fun, and Soft Zen.
 */

import { SoundThemeType } from '../types/curriculum';

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7; // 0 to 1
  private soundTheme: SoundThemeType = 'retro-arcade';
  private bgmGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private currentTrack: number = 0; // 0: Informatika Santai, 1: Digital Quest, 2: Cyber Focus
  private bgmIntervalId: any = null;
  private miniGameIntervalId: any = null;
  private miniGameGainNode: GainNode | null = null;
  private activeMiniGameId: string | null = null;
  private isMiniGameBgmEnabled: boolean = true;

  constructor() {
    try {
      const savedTheme = localStorage.getItem('spenmakro_sound_theme') as SoundThemeType;
      if (savedTheme) {
        this.soundTheme = savedTheme;
      }
      const savedVol = localStorage.getItem('spenmakro_sound_volume');
      if (savedVol !== null) {
        this.volume = Number(savedVol) / 100;
      }
    } catch (e) {}
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundTheme(theme: SoundThemeType) {
    this.soundTheme = theme;
    try {
      localStorage.setItem('spenmakro_sound_theme', theme);
    } catch (e) {}
  }

  public getSoundTheme(): SoundThemeType {
    return this.soundTheme;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.bgmGainNode) {
      this.bgmGainNode.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!muted && this.bgmGainNode && this.isBgmPlaying) {
      this.bgmGainNode.gain.setValueAtTime(this.volume * 0.15, this.ctx?.currentTime || 0);
    }
    if (muted && this.miniGameGainNode) {
      this.miniGameGainNode.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    } else if (!muted && this.miniGameGainNode && this.activeMiniGameId && this.isMiniGameBgmEnabled) {
      this.miniGameGainNode.gain.setValueAtTime(this.volume * 0.16, this.ctx?.currentTime || 0);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('spenmakro_sound_volume', String(Math.round(this.volume * 100)));
    } catch (e) {}
    if (this.bgmGainNode && !this.isMuted && this.isBgmPlaying) {
      this.bgmGainNode.gain.setValueAtTime(this.volume * 0.15, this.ctx?.currentTime || 0);
    }
    if (this.miniGameGainNode && !this.isMuted && this.activeMiniGameId && this.isMiniGameBgmEnabled) {
      this.miniGameGainNode.gain.setValueAtTime(this.volume * 0.16, this.ctx?.currentTime || 0);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // UI Sound Effects customized per SoundTheme
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (this.soundTheme === 'retro-arcade') {
        // 8-bit square wave blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(1200, now + 0.02);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (this.soundTheme === 'cyber-scifi') {
        // High-tech laser chirp
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now);
        gain.gain.setValueAtTime(this.volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (this.soundTheme === 'cartoon-fun') {
        // Playful pop / woodblock
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);
        gain.gain.setValueAtTime(this.volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else {
        // Soft Zen (gentle water drop / bell tap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.06);
        gain.gain.setValueAtTime(this.volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  }

  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (this.soundTheme === 'retro-arcade') {
        // Super Mario coin jump arpeggio (B5 -> E6)
        const notes = [987.77, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(this.volume * 0.2, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.29);
        });
      } else if (this.soundTheme === 'cyber-scifi') {
        // Sci-Fi power up triad (F#5 -> A#5 -> C#6)
        const notes = [739.99, 932.33, 1108.73, 1479.98];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(this.volume * 0.22, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.23);
        });
      } else if (this.soundTheme === 'cartoon-fun') {
        // Bouncy cheerful marimba C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(this.volume * 0.26, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.26);
        });
      } else {
        // Soft Zen (warm singing bowl chord)
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(0.001, now + idx * 0.09);
          gain.gain.linearRampToValueAtTime(this.volume * 0.18, now + idx * 0.09 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.42);
        });
      }
    } catch (e) {}
  }

  public playError() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (this.soundTheme === 'retro-arcade') {
        // 8-bit low buzz
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.setValueAtTime(120, now + 0.08);
        gain.gain.setValueAtTime(this.volume * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (this.soundTheme === 'cyber-scifi') {
        // Cyber alert sweep
        [300, 240].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(this.volume * 0.16, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.14);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.15);
        });
      } else if (this.soundTheme === 'cartoon-fun') {
        // Comical slide down
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
        gain.gain.setValueAtTime(this.volume * 0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.27);
      } else {
        // Soft Zen (gentle double low note)
        [220, 196].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(this.volume * 0.14, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.16);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.17);
        });
      }
    } catch (e) {}
  }

  public playFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (this.soundTheme === 'retro-arcade') {
        // Victory 8-bit fanfare C5 -> E5 -> G5 -> C6 -> E6 -> G6
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);
          gain.gain.setValueAtTime(this.volume * 0.2, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.36);
        });
      } else {
        // Rich celebratory arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = this.soundTheme === 'cartoon-fun' ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.11);
          gain.gain.setValueAtTime(this.volume * 0.25, now + idx * 0.11);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + idx * 0.11);
          osc.stop(now + idx * 0.11 + 0.46);
        });
      }
    } catch (e) {}
  }

  public playTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(this.volume * 0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Background Lo-Fi / Study Synth Player
  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public setTrack(trackIdx: number) {
    this.currentTrack = trackIdx % 3;
    if (this.isBgmPlaying) {
      this.stopBgm();
      this.startBgm();
    }
  }

  public getTrack(): number {
    return this.currentTrack;
  }

  public isMusicPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public startBgm() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.isBgmPlaying) return;

      this.isBgmPlaying = true;
      this.bgmGainNode = this.ctx.createGain();
      const currentGain = this.isMuted ? 0 : this.volume * 0.12;
      this.bgmGainNode.gain.setValueAtTime(currentGain, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);

      let step = 0;
      const tempo = this.currentTrack === 1 ? 400 : 600;

      const tracksData = [
        [
          [220, 261.63, 329.63, 392],
          [174.61, 220, 261.63, 329.63],
          [261.63, 329.63, 392, 493.88],
          [196, 246.94, 293.66, 392]
        ],
        [
          [261.63, 329.63, 392, 523.25],
          [293.66, 349.23, 440, 587.33],
          [329.63, 392, 493.88, 659.25],
          [349.23, 440, 523.25, 698.46]
        ],
        [
          [146.83, 220, 293.66, 440],
          [164.81, 246.94, 329.63, 493.88],
          [174.61, 261.63, 349.23, 523.25],
          [130.81, 196, 261.63, 392]
        ]
      ];

      const currentChords = tracksData[this.currentTrack];

      const playChord = () => {
        if (!this.ctx || !this.isBgmPlaying || !this.bgmGainNode) return;
        const chord = currentChords[step % currentChords.length];
        const now = this.ctx.currentTime;

        chord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const noteGain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          osc.type = this.currentTrack === 2 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650, now);

          noteGain.gain.setValueAtTime(0.001, now);
          noteGain.gain.linearRampToValueAtTime(0.2, now + 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000) * 1.5);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.bgmGainNode!);

          osc.start(now);
          osc.stop(now + (tempo / 1000) * 1.6);
        });

        step++;
      };

      playChord();
      this.bgmIntervalId = setInterval(playChord, tempo);
    } catch (e) {
      this.isBgmPlaying = false;
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    if (this.bgmGainNode && this.ctx) {
      try {
        this.bgmGainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch (e) {}
    }
  }

  private createNoiseBuffer(durationSec: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = Math.floor(this.ctx.sampleRate * durationSec);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // ============================================================================
  // REALISTIC SOUND EFFECTS FOR ROBOT TINJU 3D (REAL STEEL BOXING)
  // ============================================================================

  /** Lonceng Ring Tinju ("DING-DING!") saat ronde dimulai atau berganti */
  public playBoxingBell(strikes: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      for (let s = 0; s < strikes; s++) {
        const offset = s * 0.24;
        // Metallic bell partials
        const partials = [
          { freq: 860, gain: 0.28, decay: 0.75 },
          { freq: 1315, gain: 0.22, decay: 0.55 },
          { freq: 2140, gain: 0.16, decay: 0.4 },
          { freq: 2920, gain: 0.1, decay: 0.25 }
        ];
        partials.forEach((p) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(p.freq, now + offset);
          gain.gain.setValueAtTime(this.volume * p.gain, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + p.decay);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + offset);
          osc.stop(now + offset + p.decay + 0.02);
        });
      }
    } catch (e) {}
  }

  /** Suara Pukulan Robot Tinju (Servo Hidrolik + Dentuman Baja + Percikan Listrik) */
  public playRobotPunchHit(isHeavyUppercut: boolean = false) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Hydraulic Servo Whine before impact (0.00s - 0.12s)
      const servoOsc = this.ctx.createOscillator();
      const servoGain = this.ctx.createGain();
      servoOsc.type = 'sawtooth';
      servoOsc.frequency.setValueAtTime(190, now);
      servoOsc.frequency.exponentialRampToValueAtTime(isHeavyUppercut ? 780 : 540, now + 0.11);
      servoGain.gain.setValueAtTime(this.volume * 0.14, now);
      servoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      servoOsc.connect(servoGain);
      servoGain.connect(this.ctx.destination);
      servoOsc.start(now);
      servoOsc.stop(now + 0.14);

      // 2. Heavy Sub-Bass Fist Impact (0.11s - 0.45s)
      const impactTime = now + 0.1;
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(isHeavyUppercut ? 150 : 120, impactTime);
      subOsc.frequency.exponentialRampToValueAtTime(28, impactTime + (isHeavyUppercut ? 0.38 : 0.26));
      subGain.gain.setValueAtTime(this.volume * (isHeavyUppercut ? 0.55 : 0.42), impactTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, impactTime + (isHeavyUppercut ? 0.4 : 0.28));
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(impactTime);
      subOsc.stop(impactTime + 0.42);

      // 3. Metallic Armor Crunch (Filtered Noise + Clank Oscillators)
      const noiseBuf = this.createNoiseBuffer(0.32);
      if (noiseBuf) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuf;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isHeavyUppercut ? 1200 : 950, impactTime);
        filter.Q.setValueAtTime(2.2, impactTime);
        const nGain = this.ctx.createGain();
        nGain.gain.setValueAtTime(this.volume * (isHeavyUppercut ? 0.45 : 0.32), impactTime);
        nGain.gain.exponentialRampToValueAtTime(0.001, impactTime + 0.26);
        noise.connect(filter);
        filter.connect(nGain);
        nGain.connect(this.ctx.destination);
        noise.start(impactTime);
        noise.stop(impactTime + 0.28);
      }

      // 4. Steel Clank Resonance
      const clankFreqs = isHeavyUppercut ? [380, 710, 1180] : [420, 790];
      clankFreqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, impactTime + idx * 0.02);
        osc.frequency.exponentialRampToValueAtTime(f * 0.65, impactTime + 0.22);
        g.gain.setValueAtTime(this.volume * 0.2, impactTime + idx * 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, impactTime + 0.24);
        osc.connect(g);
        g.connect(this.ctx!.destination);
        osc.start(impactTime + idx * 0.02);
        osc.stop(impactTime + 0.25);
      });
    } catch (e) {}
  }

  /** Suara Saat Salah Jawab / Terkena Pukulan Balasan (Counter Hit + Cockpit Warning) */
  public playRobotCounterHit() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Heavy thud on player's armor
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'sawtooth';
      thud.frequency.setValueAtTime(140, now);
      thud.frequency.exponentialRampToValueAtTime(42, now + 0.25);
      thudGain.gain.setValueAtTime(this.volume * 0.35, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thud.start(now);
      thud.stop(now + 0.28);

      // Metallic scrape noise
      const noiseBuf = this.createNoiseBuffer(0.22);
      if (noiseBuf) {
        const src = this.ctx.createBufferSource();
        src.buffer = noiseBuf;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, now);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(this.volume * 0.28, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        src.connect(filter);
        filter.connect(g);
        g.connect(this.ctx.destination);
        src.start(now);
        src.stop(now + 0.21);
      }

      // Cockpit Warning Beep-Beep
      [440, 310].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + 0.14 + idx * 0.09);
        g.gain.setValueAtTime(this.volume * 0.14, now + 0.14 + idx * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.14 + idx * 0.09 + 0.08);
        osc.connect(g);
        g.connect(this.ctx!.destination);
        osc.start(now + 0.14 + idx * 0.09);
        osc.stop(now + 0.14 + idx * 0.09 + 0.09);
      });
    } catch (e) {}
  }

  /** Suara Robot Kritis / Pusing (Sparks & Servo Malfunction) */
  public playRobotCriticalSparks() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const freqs = [1650, 980, 2100, 1250];
      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + idx * 0.045);
        g.gain.setValueAtTime(this.volume * 0.12, now + idx * 0.045);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.04);
        osc.connect(g);
        g.connect(this.ctx!.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.045);
      });
    } catch (e) {}
  }

  /** Suara Robot K.O. (Mesin Power-Down + Jatuh ke Kanvas + Lonceng 3x) */
  public playRobotKO() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Power-down turbine whine
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.65);
      g.gain.setValueAtTime(this.volume * 0.3, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.68);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);

      // Heavy canvas slam at 0.35s
      const slam = this.ctx.createOscillator();
      const slamG = this.ctx.createGain();
      slam.type = 'sine';
      slam.frequency.setValueAtTime(95, now + 0.35);
      slam.frequency.exponentialRampToValueAtTime(24, now + 0.75);
      slamG.gain.setValueAtTime(this.volume * 0.5, now + 0.35);
      slamG.gain.exponentialRampToValueAtTime(0.001, now + 0.78);
      slam.connect(slamG);
      slamG.connect(this.ctx.destination);
      slam.start(now + 0.35);
      slam.stop(now + 0.8);

      // 3x Boxing Bell Ding-Ding-Ding!
      setTimeout(() => {
        this.playBoxingBell(3);
      }, 450);
    } catch (e) {}
  }

  // ============================================================================
  // REALISTIC SOUND EFFECTS FOR BALAP MOTOR FUTURISTIK 3D (CYBER MOTO GP)
  // ============================================================================

  /** Deru Mesin Motor Cyber Saat Pindah Sektor / Siap Gas */
  public playMotoRevStart() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.32);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      gain.gain.setValueAtTime(this.volume * 0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  /** Suara Turbo Nitro Plasma Boost + Raungan Mesin Superbike 2-Gear Shift */
  public playMotoNitroBoost() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Dual detuned Superbike Engine Roar with Gear Shift
      [1, 1.03].forEach((detuneFactor) => {
        const eng = this.ctx!.createOscillator();
        const filter = this.ctx!.createBiquadFilter();
        const g = this.ctx!.createGain();

        eng.type = 'sawtooth';
        // Gear 1 acceleration
        eng.frequency.setValueAtTime(110 * detuneFactor, now);
        eng.frequency.exponentialRampToValueAtTime(380 * detuneFactor, now + 0.22);
        // Quick upshift into Gear 2 high RPM
        eng.frequency.setValueAtTime(270 * detuneFactor, now + 0.23);
        eng.frequency.exponentialRampToValueAtTime(560 * detuneFactor, now + 0.55);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.linearRampToValueAtTime(1800, now + 0.5);

        g.gain.setValueAtTime(this.volume * 0.22, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

        eng.connect(filter);
        filter.connect(g);
        g.connect(this.ctx!.destination);
        eng.start(now);
        eng.stop(now + 0.6);
      });

      // 2. Plasma Afterburner Jet Whoosh (Bandpass Noise Sweep)
      const noiseBuf = this.createNoiseBuffer(0.55);
      if (noiseBuf) {
        const src = this.ctx.createBufferSource();
        src.buffer = noiseBuf;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + 0.35);
        filter.Q.setValueAtTime(1.8, now);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(this.volume * 0.34, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

        src.connect(filter);
        filter.connect(g);
        g.connect(this.ctx.destination);
        src.start(now);
        src.stop(now + 0.54);
      }

      // 3. High-tech Turbo Spool Whistle
      const turbo = this.ctx.createOscillator();
      const turboG = this.ctx.createGain();
      turbo.type = 'sine';
      turbo.frequency.setValueAtTime(680, now);
      turbo.frequency.exponentialRampToValueAtTime(1950, now + 0.42);
      turboG.gain.setValueAtTime(this.volume * 0.14, now);
      turboG.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      turbo.connect(turboG);
      turboG.connect(this.ctx.destination);
      turbo.start(now);
      turbo.stop(now + 0.46);
    } catch (e) {}
  }

  /** Suara Ban Motor Selip di Tikungan (Tire Screech) + Mesin Downshift */
  public playMotoTireSlip() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Tire Screech (High-Q resonant noise + dual modulated sine)
      const screechOsc = this.ctx.createOscillator();
      const screechG = this.ctx.createGain();
      screechOsc.type = 'triangle';
      screechOsc.frequency.setValueAtTime(1480, now);
      screechOsc.frequency.linearRampToValueAtTime(1180, now + 0.15);
      screechOsc.frequency.linearRampToValueAtTime(1320, now + 0.28);
      screechG.gain.setValueAtTime(this.volume * 0.18, now);
      screechG.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      screechOsc.connect(screechG);
      screechG.connect(this.ctx.destination);
      screechOsc.start(now);
      screechOsc.stop(now + 0.35);

      const noiseBuf = this.createNoiseBuffer(0.35);
      if (noiseBuf) {
        const src = this.ctx.createBufferSource();
        src.buffer = noiseBuf;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1350, now);
        filter.Q.setValueAtTime(5.0, now);
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(this.volume * 0.28, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        src.connect(filter);
        filter.connect(g);
        g.connect(this.ctx.destination);
        src.start(now);
        src.stop(now + 0.34);
      }

      // 2. Engine RPM Drop / Bog Down
      const eng = this.ctx.createOscillator();
      const engG = this.ctx.createGain();
      eng.type = 'sawtooth';
      eng.frequency.setValueAtTime(240, now);
      eng.frequency.exponentialRampToValueAtTime(68, now + 0.32);
      engG.gain.setValueAtTime(this.volume * 0.22, now);
      engG.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      eng.connect(engG);
      engG.connect(this.ctx.destination);
      eng.start(now);
      eng.stop(now + 0.35);
    } catch (e) {}
  }

  /** Suara Doppler Flyby saat Motor Menyalip Lawan */
  public playMotoOvertake() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.32);
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(this.volume * 0.24, now + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  /** Suara Lintasi Garis Finish (Flyby + Race Horn + Fanfare) */
  public playMotoFinishLine() {
    if (this.isMuted) return;
    try {
      this.playMotoOvertake();
      setTimeout(() => {
        this.playFanfare();
      }, 180);
    } catch (e) {}
  }

  // ============================================================================
  // DYNAMIC MINI-GAME SOUNDTRACK ENGINE (TAILORED TO EACH OF THE 12 MINI-GAMES)
  // ============================================================================

  public getMiniGameTrackName(gameId: string): string {
    const names: Record<string, string> = {
      'battle-bot': '🥊 Cyber Boxing Rock Beat',
      'balap-robot': '🏎️ Turbo Nitro Synthwave GP',
      'tebak-kata': '🔤 Chiptune Word Puzzle',
      'tebak-gambar': '🖼️ Mystery Tile Funk',
      'tug-of-war': '⚡ Power Pull Stadium Rhythm',
      'bomb-defusal': '💣 Cyber Bomb Defusal Pulse',
      'tower-defense': '🛡️ Firewall Fortress March',
      'whack-a-mole': '🔨 Hyper Arcade Virus Buster',
      'robo-maze': '🤖 Algorithmic Grid Runner',
      'spin-wheel': '🎡 Lucky Wheel Game Show',
      'cyber-detective': '🕵️ CSI Cyber Noir Synth',
      'sketsa-cepat': '🎨 Creative Sketch Studio Groove'
    };
    return names[gameId] || '🎮 Musik Arena Mini Game';
  }

  public isMiniGameMusicActive(): boolean {
    return this.isMiniGameBgmEnabled && !this.isMuted;
  }

  public toggleMiniGameMusic(gameId?: string): boolean {
    this.isMiniGameBgmEnabled = !this.isMiniGameBgmEnabled;
    if (!this.isMiniGameBgmEnabled) {
      this.stopMiniGameMusic();
      return false;
    } else {
      if (this.isMuted) {
        this.setMuted(false);
      }
      if (gameId || this.activeMiniGameId) {
        this.startMiniGameMusic(gameId || this.activeMiniGameId!);
      }
      return true;
    }
  }

  public stopMiniGameMusic() {
    if (this.miniGameIntervalId) {
      clearInterval(this.miniGameIntervalId);
      this.miniGameIntervalId = null;
    }
    if (this.miniGameGainNode && this.ctx) {
      try {
        this.miniGameGainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch (e) {}
    }
  }

  public startMiniGameMusic(gameId: string) {
    this.activeMiniGameId = gameId;
    this.stopMiniGameMusic();

    if (!this.isMiniGameBgmEnabled || this.isMuted) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      this.miniGameGainNode = this.ctx.createGain();
      this.miniGameGainNode.gain.setValueAtTime(this.volume * 0.16, this.ctx.currentTime);
      this.miniGameGainNode.connect(this.ctx.destination);

      // Distinct musical profiles (tempo, bass sequence, lead melody, wave types) for each mini-game
      interface GameMusicProfile {
        stepMs: number;
        leadType: OscillatorType;
        bassType: OscillatorType;
        bassNotes: number[];
        leadNotes: number[];
        percussive: boolean;
      }

      const profiles: Record<string, GameMusicProfile> = {
        'sketsa-cepat': {
          // Upbeat, creative art studio marimba/pluck melody (C major pentatonic groove)
          stepMs: 240,
          leadType: 'triangle',
          bassType: 'sine',
          bassNotes: [261.63, 261.63, 329.63, 392.0, 349.23, 349.23, 392.0, 293.66],
          leadNotes: [523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33],
          percussive: true
        },
        'battle-bot': {
          // Energetic Cyber Boxing Arena Rock (E minor power riff)
          stepMs: 200,
          leadType: 'sawtooth',
          bassType: 'square',
          bassNotes: [164.81, 164.81, 196.0, 220.0, 164.81, 164.81, 246.94, 220.0],
          leadNotes: [329.63, 0, 392.0, 440.0, 493.88, 440.0, 392.0, 329.63, 329.63, 0, 493.88, 587.33, 659.25, 587.33, 493.88, 392.0],
          percussive: true
        },
        'balap-robot': {
          // Fast Turbo Nitro Synthwave GP (A minor high-speed arpeggio)
          stepMs: 165,
          leadType: 'sawtooth',
          bassType: 'sawtooth',
          bassNotes: [220.0, 220.0, 261.63, 220.0, 174.61, 174.61, 196.0, 196.0],
          leadNotes: [440.0, 523.25, 659.25, 880.0, 783.99, 659.25, 523.25, 659.25, 349.23, 440.0, 523.25, 698.46, 659.25, 587.33, 493.88, 392.0],
          percussive: true
        },
        'tebak-kata': {
          // Curious Chiptune Word Puzzle (F major playful bounce)
          stepMs: 250,
          leadType: 'square',
          bassType: 'triangle',
          bassNotes: [174.61, 261.63, 220.0, 261.63, 233.08, 293.66, 261.63, 196.0],
          leadNotes: [349.23, 440.0, 523.25, 0, 587.33, 523.25, 440.0, 392.0, 349.23, 440.0, 523.25, 698.46, 659.25, 587.33, 523.25, 0],
          percussive: false
        },
        'tebak-gambar': {
          // Mystery Tile Detective Funk (D minor groovy bass + bell hints)
          stepMs: 240,
          leadType: 'sine',
          bassType: 'triangle',
          bassNotes: [146.83, 0, 174.61, 196.0, 220.0, 0, 196.0, 174.61],
          leadNotes: [587.33, 0, 698.46, 659.25, 587.33, 523.25, 440.0, 0, 587.33, 698.46, 880.0, 0, 783.99, 698.46, 587.33, 0],
          percussive: true
        },
        'tug-of-war': {
          // Power Stadium Pull Rhythm (G minor driving beat)
          stepMs: 210,
          leadType: 'sawtooth',
          bassType: 'square',
          bassNotes: [196.0, 196.0, 233.08, 261.63, 196.0, 196.0, 293.66, 261.63],
          leadNotes: [392.0, 392.0, 466.16, 523.25, 587.33, 523.25, 466.16, 392.0],
          percussive: true
        },
        'bomb-defusal': {
          // Suspenseful Cyber Bomb Defusal Pulse
          stepMs: 220,
          leadType: 'sine',
          bassType: 'sawtooth',
          bassNotes: [130.81, 130.81, 138.59, 130.81, 146.83, 130.81, 155.56, 146.83],
          leadNotes: [523.25, 0, 0, 523.25, 622.25, 0, 587.33, 0],
          percussive: true
        },
        'tower-defense': {
          // Firewall Fortress Tactical March
          stepMs: 210,
          leadType: 'triangle',
          bassType: 'sawtooth',
          bassNotes: [220.0, 261.63, 329.63, 261.63, 196.0, 246.94, 293.66, 246.94],
          leadNotes: [440.0, 523.25, 659.25, 880.0, 783.99, 659.25, 587.33, 493.88],
          percussive: true
        },
        'whack-a-mole': {
          // Hyper Arcade Virus Buster (Fast cheerful G major chiptune)
          stepMs: 175,
          leadType: 'square',
          bassType: 'triangle',
          bassNotes: [196.0, 246.94, 293.66, 392.0, 261.63, 329.63, 392.0, 293.66],
          leadNotes: [392.0, 493.88, 587.33, 783.99, 659.25, 783.99, 587.33, 493.88],
          percussive: true
        },
        'robo-maze': {
          // Algorithmic Grid Runner (Tron-like digital sequence)
          stepMs: 200,
          leadType: 'sine',
          bassType: 'triangle',
          bassNotes: [146.83, 220.0, 293.66, 220.0, 174.61, 261.63, 349.23, 261.63],
          leadNotes: [587.33, 659.25, 698.46, 880.0, 698.46, 659.25, 587.33, 523.25],
          percussive: false
        },
        'spin-wheel': {
          // Lucky Wheel Game Show Fanfare
          stepMs: 215,
          leadType: 'triangle',
          bassType: 'sine',
          bassNotes: [261.63, 329.63, 392.0, 523.25, 349.23, 440.0, 392.0, 293.66],
          leadNotes: [523.25, 659.25, 783.99, 1046.5, 880.0, 1046.5, 783.99, 659.25],
          percussive: true
        },
        'cyber-detective': {
          // CSI Cyber Noir Synthwave
          stepMs: 235,
          leadType: 'sawtooth',
          bassType: 'triangle',
          bassNotes: [164.81, 196.0, 246.94, 220.0, 146.83, 174.61, 220.0, 196.0],
          leadNotes: [659.25, 0, 587.33, 493.88, 0, 440.0, 392.0, 493.88],
          percussive: true
        }
      };

      const prof = profiles[gameId] || profiles['sketsa-cepat'];
      let tick = 0;

      const playStep = () => {
        if (!this.ctx || !this.miniGameGainNode || !this.isMiniGameBgmEnabled || this.isMuted) return;
        const now = this.ctx.currentTime;
        const durSec = (prof.stepMs / 1000) * 0.85;

        // 1. Bass note
        const bassFreq = prof.bassNotes[tick % prof.bassNotes.length];
        if (bassFreq > 0) {
          const bOsc = this.ctx.createOscillator();
          const bGain = this.ctx.createGain();
          const bFilter = this.ctx.createBiquadFilter();
          bOsc.type = prof.bassType;
          bOsc.frequency.setValueAtTime(bassFreq, now);
          bFilter.type = 'lowpass';
          bFilter.frequency.setValueAtTime(520, now);

          bGain.gain.setValueAtTime(0.28, now);
          bGain.gain.exponentialRampToValueAtTime(0.001, now + durSec);

          bOsc.connect(bFilter);
          bFilter.connect(bGain);
          bGain.connect(this.miniGameGainNode);
          bOsc.start(now);
          bOsc.stop(now + durSec + 0.02);
        }

        // 2. Lead melody note
        const leadFreq = prof.leadNotes[tick % prof.leadNotes.length];
        if (leadFreq > 0) {
          const lOsc = this.ctx.createOscillator();
          const lGain = this.ctx.createGain();
          const lFilter = this.ctx.createBiquadFilter();
          lOsc.type = prof.leadType;
          lOsc.frequency.setValueAtTime(leadFreq, now);
          lFilter.type = 'lowpass';
          lFilter.frequency.setValueAtTime(1600, now);

          lGain.gain.setValueAtTime(0.22, now);
          lGain.gain.exponentialRampToValueAtTime(0.001, now + durSec * 0.95);

          lOsc.connect(lFilter);
          lFilter.connect(lGain);
          lGain.connect(this.miniGameGainNode);
          lOsc.start(now);
          lOsc.stop(now + durSec);
        }

        // 3. Light rhythmic hi-hat / kick pulse on even/odd steps
        if (prof.percussive && tick % 2 === 0) {
          const pOsc = this.ctx.createOscillator();
          const pGain = this.ctx.createGain();
          pOsc.type = 'sine';
          const isDownbeat = tick % 4 === 0;
          pOsc.frequency.setValueAtTime(isDownbeat ? 110 : 900, now);
          pOsc.frequency.exponentialRampToValueAtTime(isDownbeat ? 35 : 300, now + 0.06);
          pGain.gain.setValueAtTime(isDownbeat ? 0.25 : 0.06, now);
          pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
          pOsc.connect(pGain);
          pGain.connect(this.miniGameGainNode);
          pOsc.start(now);
          pOsc.stop(now + 0.07);
        }

        tick++;
      };

      playStep();
      this.miniGameIntervalId = setInterval(playStep, prof.stepMs);
    } catch (e) {}
  }
}

export const soundManager = new SoundSystem();


import * as Tone from 'tone';
import { keyToMidi } from './pianoScore';

// Tone.js's Salamander grand piano samples. Load once and share decoded buffers
// between the keyboard and song instruments so either can be stopped independently.
const samples = {
  C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', A4: 'A4.mp3',
  C5: 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3', A5: 'A5.mp3',
  C6: 'C6.mp3', 'D#6': 'Ds6.mp3', 'F#6': 'Fs6.mp3', A6: 'A6.mp3',
  C7: 'C7.mp3',
};

// Sampler treats plain numeric pitches as Hertz, so pass explicit note names.
const midiToNote = (midi) => {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return `${names[midi % 12]}${Math.floor(midi / 12) - 1}`;
};

export default class PianoAudio {
  constructor(onStatus = () => {}) {
    this.onStatus = onStatus;
    this.held = new Set();
    this.speed = 1;
    this.autoplay = false;
    this.running = false;
    this.disposed = false;
    this.samplesReady = false;
  }

  initialize() {
    this.context = this.context || new Tone.Context({ latencyHint: 'interactive', lookAhead: 0 });
    this.master = this.master || new Tone.Gain({ context: this.context, gain: 0.65 }).toDestination();
    this.output = this.output || new Tone.Limiter({ context: this.context, threshold: -3 }).connect(this.master);
  }

  load() {
    if (this.disposed) return Promise.reject(new Error('Piano has been disposed'));
    this.initialize();
    if (this.loading) {
      if (!this.samplesReady) this.onStatus('loading');
      return this.loading;
    }
    this.onStatus('loading');
    this.loading = new Promise((resolve, reject) => {
      let settled = false;
      const fail = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(this.loadTimeout);
        this.buffers.dispose();
        this.loading = null;
        if (!this.disposed) this.onStatus('error');
        reject(error);
      };
      this.buffers = new Tone.ToneAudioBuffers({
        urls: samples,
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        onload: () => {
          if (settled || this.disposed) return;
          settled = true;
          clearTimeout(this.loadTimeout);
          this.samplesReady = true;
          this.keyboard = this.keyboard || this.createInstrument();
          this.instrument = this.instrument || this.createInstrument();
          this.onStatus('ready');
          resolve();
        },
        onerror: fail,
      });
      this.cancelLoad = () => fail(new Error('Piano loading cancelled'));
      this.loadTimeout = setTimeout(() => fail(new Error('Piano samples took too long to load')), 30000);
    });
    return this.loading;
  }

  createInstrument() {
    if (!this.context || !this.output || this.disposed) return null;
    if (!this.samplesReady) return null;
    const urls = Object.fromEntries(Object.keys(samples).map((note) => [note, this.buffers.get(note)]));
    return new Tone.Sampler({ context: this.context, urls, attack: 0, release: 0.8, volume: 6 }).connect(this.output);
  }

  async start() {
    const loaded = this.load();
    // Resume directly in the input handler, before awaiting the downloads.
    await Promise.all([loaded, this.context.resume()]);
  }

  press(key) {
    const midi = keyToMidi(key);
    if (this.disposed || midi === null || this.held.has(key)) return;
    const press = {};
    this.held.add(key);
    this.presses = this.presses || new Map();
    this.presses.set(key, press);
    const attack = () => {
      if (!this.disposed && this.presses.get(key) === press && this.held.has(key)) {
        this.keyboard.triggerAttack(midiToNote(midi), this.context.immediate(), 0.8);
      }
    };
    if (this.keyboard && this.context.state === 'running') attack();
    else this.start().then(attack).catch(() => {});
  }

  release(key) {
    if (!this.held.delete(key)) return;
    this.presses?.delete(key);
    this.keyboard?.triggerRelease(midiToNote(keyToMidi(key)), this.context.immediate());
  }

  silenceKeyboard() {
    this.held.clear();
    this.presses?.clear();
    if (this.keyboard) {
      this.keyboard.dispose();
      this.keyboard = this.createInstrument();
    }
  }

  setScore(score) {
    this.pause();
    this.score = score;
    this.position = score ? score.start : 0;
    this.speed = 1;
    this.autoplay = false;
  }

  getPosition() {
    return this.running ? this.position + (this.context.immediate() - this.anchor) * this.speed : this.position;
  }

  play() {
    if (!this.score || !this.instrument || this.running || this.disposed) return;
    this.anchor = this.context.immediate();
    this.running = true;
    this.scheduleFromPosition();
  }

  pause() {
    if (this.running) this.position = this.getPosition();
    this.running = false;
    this.clearSchedule();
  }

  clearSchedule() {
    if (this.interval !== undefined) {
      this.context.clearInterval(this.interval);
      this.interval = undefined;
    }
    // Disconnect even notes already queued on the Web Audio clock, including
    // their release tails. Reusing decoded buffers makes this inexpensive.
    if (this.instrument) {
      this.instrument.dispose();
      this.instrument = this.createInstrument();
    }
  }

  setSpeed(speed) {
    const wasRunning = this.running;
    this.pause();
    this.speed = speed;
    if (wasRunning) this.play();
  }

  setAutoplay(enabled) {
    const wasRunning = this.running;
    this.pause();
    this.autoplay = enabled;
    if (wasRunning) this.play();
  }

  restart() {
    const wasRunning = this.running;
    this.pause();
    this.position = this.score?.start || 0;
    if (wasRunning) this.play();
  }

  scheduleFromPosition() {
    if (!this.autoplay) return;
    const notes = this.score.notes.filter((note) => note.end > this.position);
    let index = 0;
    const schedule = () => {
      const now = this.context.immediate();
      const position = this.getPosition();
      const horizon = position + 0.1 * this.speed;
      while (index < notes.length && notes[index].start <= horizon) {
        const note = notes[index++];
        if (note.end <= position) continue;
        const start = Math.max(position, note.start);
        this.instrument.triggerAttackRelease(midiToNote(note.midi), (note.end - start) / this.speed,
          now + (start - position) / this.speed, 0.75);
      }
    };
    schedule();
    this.interval = this.context.setInterval(schedule, 0.025);
  }

  dispose() {
    this.disposed = true;
    if (this.interval !== undefined) this.context.clearInterval(this.interval);
    this.cancelLoad?.();
    this.held.clear();
    this.keyboard?.dispose();
    this.instrument?.dispose();
    this.output?.dispose();
    this.master?.dispose();
    this.buffers?.dispose();
    this.context?.dispose();
  }
}

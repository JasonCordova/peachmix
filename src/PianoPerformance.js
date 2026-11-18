const PERFECT_WINDOW = 0.08;
const HIT_WINDOW = 0.18;
const TIMING_EPSILON = 1e-9;

export default class PianoPerformance {
  constructor(notes) {
    // A pitch shared by both hands at the same instant needs only one press.
    const unique = new Map(notes.map((note) => [`${note.note}:${note.start.toFixed(6)}`, note]));
    this.notes = [...unique.values()].map((note) => ({ key: note.note, start: note.start, result: null }))
      .sort((a, b) => a.start - b.start);
    this.end = Math.max(0, ...notes.map((note) => note.end));
    this.cursor = 0;
    this.perfect = this.good = this.missed = this.wrong = 0;
    this.streak = this.best = 0;
    this.autoplay = false;
    this.feedback = 'Waiting for notes';
  }

  advance(position, speed) {
    // Windows are measured in real seconds, regardless of playback speed.
    const limit = this.autoplay ? position : position - HIT_WINDOW * speed - TIMING_EPSILON;
    let changed = false;
    while (this.cursor < this.notes.length && this.notes[this.cursor].start <= limit) {
      const note = this.notes[this.cursor++];
      if (note.result) continue;
      if (this.autoplay) this.hitPerfect(note);
      else {
        note.result = 'missed';
        this.missed++;
        this.streak = 0;
        this.feedback = 'Miss';
      }
      changed = true;
    }
    return changed;
  }

  press(key, position, speed) {
    if (this.autoplay || position > this.end + HIT_WINDOW * speed) return false;
    const changed = this.advance(position, speed);
    let closest = null;
    let distance = Infinity;
    this.notes.forEach((note) => {
      const offset = Math.abs(note.start - position) / speed;
      if (!note.result && note.key === key && offset <= HIT_WINDOW + TIMING_EPSILON && offset < distance) {
        closest = note;
        distance = offset;
      }
    });
    if (!closest) {
      // Allow warm-up during the lead-in.
      if (position < 0) return changed;
      this.wrong++;
      this.streak = 0;
      this.feedback = 'Wrong note';
    } else if (distance <= PERFECT_WINDOW + TIMING_EPSILON) {
      this.hitPerfect(closest);
    } else {
      closest.result = 'good';
      this.good++;
      this.streak = 0;
      this.feedback = 'Good';
    }
    return true;
  }

  hitPerfect(note) {
    note.result = 'perfect';
    this.perfect++;
    this.streak++;
    this.best = Math.max(this.best, this.streak);
    this.feedback = this.streak >= 5 && this.streak % 5 === 0 ? `${this.streak} note streak!` : 'Perfect';
  }

  setAutoplay(enabled, position, speed, running) {
    if (running) this.advance(position, speed);
    this.autoplay = enabled;
    this.feedback = enabled ? 'Autoplay' : 'Keep playing';
    if (running) this.advance(position, speed);
  }

  snapshot() {
    const total = this.perfect + this.good + this.missed + this.wrong;
    const accuracy = total ? Math.round((this.perfect + this.good * 0.5) / total * 1000) / 10 : 0;
    const grade = !total ? '—' : accuracy >= 95 ? 'S' : accuracy >= 90 ? 'A'
      : accuracy >= 80 ? 'B' : accuracy >= 70 ? 'C' : accuracy >= 60 ? 'D' : 'F';
    return { grade, accuracy, total, perfect: this.perfect, good: this.good,
      missed: this.missed, wrong: this.wrong, streak: this.streak, best: this.best, feedback: this.feedback };
  }
}

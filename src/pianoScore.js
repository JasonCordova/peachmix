// Scores store chromatic notes as keyboard key codes. Start at C4,
// covering C4 through B6 for both manual playing and autoplay.
export const pianoKeys = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 90, 83, 88, 68, 67, 70, 86, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191, 222, 16];

export const keyToMidi = (key) => {
  const index = pianoKeys.indexOf(key);
  return index === -1 ? null : 60 + index;
};

export function createPianoScore(song) {
  const markers = song.notes.filter((note) => note.note === null)
    .slice().sort((a, b) => a.delay - b.delay);
  const segments = [{ beat: 0, seconds: 0, tempo: 60, signature: 1, secondsPerBeat: 1 }];

  markers.forEach((marker) => {
    const previous = segments[segments.length - 1];
    const tempo = marker.tempo > 0 ? marker.tempo : previous.tempo;
    // Scores use a numeric time-signature ratio, matching the original guide.
    const signature = marker.timeSignature > 0 ? marker.timeSignature : previous.signature;
    const segment = {
      beat: marker.delay,
      seconds: previous.seconds + (marker.delay - previous.beat) * previous.secondsPerBeat,
      tempo,
      signature,
      secondsPerBeat: 60 / (tempo * signature),
    };
    if (previous.beat === segment.beat) segments[segments.length - 1] = segment;
    else segments.push(segment);
  });

  const beatToSeconds = (beat) => {
    const segment = segments.slice().reverse().find((entry) => entry.beat <= beat) || segments[0];
    return segment.seconds + (beat - segment.beat) * segment.secondsPerBeat;
  };
  const secondsToBeat = (seconds) => {
    const segment = segments.slice().reverse().find((entry) => entry.seconds <= seconds) || segments[0];
    return segment.beat + (seconds - segment.seconds) / segment.secondsPerBeat;
  };
  const notes = song.notes.filter((note) => keyToMidi(note.note) !== null && note.length > 0)
    .map((note) => ({ ...note, midi: keyToMidi(note.note), start: beatToSeconds(note.delay), end: beatToSeconds(note.delay + note.length) }))
    .sort((a, b) => a.start - b.start);

  return {
    notes, beatToSeconds, secondsToBeat,
    start: beatToSeconds(-3),
    end: Math.max(0, ...notes.map((note) => note.end)),
    endBeat: Math.max(0, ...notes.map((note) => note.delay + note.length)),
  };
}

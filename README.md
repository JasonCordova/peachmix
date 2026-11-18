# PeachMix

**PeachMix** is an interactive web-based music platform that allows users to create sounds using their keyboard or touchscreen. Built with React, the app offers three dynamic modes of music-making:  


- **Preset Mode** – Play with preloaded sound samples  
- **Piano Mode** – Simulates piano keys for playing melodies  
- **Import Mode** – Upload and modify your own audio files
  

Originally built in 2020 and fully reimagined in 2023, PeachMix now features optimized audio rendering, a curated collection of playable pop songs, and hidden easter eggs - just look out for the little peach icon.

👉 [Live Demo](https://peachmix.netlify.app/)


## Features

- 🎧 Real-time sound generation via keyboard or touch input  
- 🎹 Piano Mode with iconic pop song playback  
- 📁 Custom audio file import and editing  
- 🚀 Optimized audio handling for smooth playback and performance  
- 🍑 Fun easter eggs hidden throughout the app
- 💻 Made using React, Web Audio API, and hosted on Netlify

## Piano mode

Piano mode uses [Tone.js Sampler](https://tonejs.github.io/docs/15.1.22/classes/Sampler.html)
with the [Salamander grand piano samples](https://tonejs.github.io/examples/sampler.html).
Samples download and decode once when you enter piano mode; the loading message
disappears when the piano is ready.
The samples are hosted by Tone.js, so the first load needs an internet connection.
The recordings are by Alexander Holm, distributed under
[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/); see the
[sample collection's attribution](https://github.com/Tonejs/audio/blob/master/salamander/README).
Keyboard, mouse, and touch input share the same piano sound, with polyphonic notes
and a natural release when you let go of a key. The range is C4–B6.
The piano volume is reduced, with a shared limiter and output gain
to control peaks when playing chords.

Search for a song or artist and select a result to start the falling-note guide.
Click the **Autoplay** icon to hear the selected song from the current position while the
keys light up. The icon is light gray when off and matches the blue piano notes when on. Pause/resume,
stop, and the 0.5×/1×/2× speed control work for both the guide and autoplay. Autoplay
starts off for each new song so you can still practice manually.

Run locally with `npm install` and `npm start`. Use `npm run build` for a production build.

import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import animation from './animation.js';
import { fClamp, fLerp } from './functions.js';
import songs from './songs.js';

const upload = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221 215"><path d="M95 58 69 85c-2.76 2.76-10.01 10.5-13 12.12-2.16.93-4.75.99-7 0C44.23 95.47 34.24 85.11 33.28 80c-1.08-5.72 3.22-10.14 6.81-14l16.87-17L67 38l26-27c5.68-5.67 9.34-10.2 18-9.94 9.11.27 15.11 7.92 20.99 13.94L171 56c4.41 4.41 15.49 14.23 16.7 20 1.71 8.22-13.4 24.34-21.7 21.4-3.95-1.4-15.37-13.75-19-17.4l-21-22v78c-.01 3.19.29 6.97-1.89 9.57-4 4.78-23.22 4.78-27.22 0-2.18-2.6-1.88-6.38-1.89-9.57V58ZM6.02 132.74c4.52-1.11 9.33-.8 13.98-.74 21.08.29 7.18 27.05 13.69 40 4.6 9.15 13.2 9.99 22.31 10h109c4.08-.01 6.97-.03 11-1.04 16.76-4.23 12.85-22.91 13-35.96.05-3.9.17-7.72 3.28-10.57 3.62-3.32 11.94-2.49 16.72-2.43 11.07.16 11.99 5.4 12 15v21c0 14.26.97 25.96-10.04 36.96-3.32 3.33-6.48 5.74-10.96 7.28-4.84 1.67-8 1.75-13 1.76H34c-4.75-.01-7.35-.02-12-1.44C-1.94 205.22 0 180.82 0 161c0-5.25-.78-19.93 1.31-23.96 1.34-2.57 2.35-2.98 4.71-4.3Z"/></svg>;
const piano = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1064 1064"><path d="M24 1.07h1002c12.32-.07 19.6-.9 28.91 8.95 3.26 3.44 5.25 6.43 6.65 10.98 1.42 4.65 1.43 7.25 1.44 12v999c-.09 19.13-11.91 30.97-31 31H38c-12.32 0-19.6.83-28.91-9.02-3.26-3.44-5.25-6.43-6.65-10.98-1.42-4.65-1.43-7.25-1.44-12V41C1 28.6-.21 19.85 9.09 10.02 13.84 4.99 17.37 3.04 24 1.07ZM193 60H60v944h192V665h-26c-21.95-.03-32.97-16.37-33-37V60Zm250 0h-73v565c-.03 20.4-8.95 39.89-32 40h-27v339h191V665h-25c-5.3-.01-10.08-.27-15-2.55-15.2-7.06-18.98-26.39-19-41.45V60Zm251 0h-73v561c-.03 21.17-6.76 43.88-32 44h-27v339h191V665h-26c-23.77-.04-32.97-18.62-33-40V60Zm310 0H871v568c-.02 13.59-6.29 30.21-20 35.44-4.09 1.56-7.72 1.55-12 1.56h-27v339h192V60Z"/></svg>;
const preset = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 216"><path d="M142 .66c7.31-1.17 11.15 2.22 12.75 9.34v189c.25 2.57.33 5.51 0 8-.61 1.34-1.12 2.77-1.84 3.96-6.51 10.75-16.8 1.51-22.91-3.91l-43-37.2c-3.71-3.27-12.81-11.93-17-13.29-2.05-.67-4.83-.56-7-.56H25c-4.57 0-14.18.6-17.98-1.31C.96 151.65 1.01 146.86 1 141V74c.02-12.14 4.08-14.94 16-15h47c2.12 0 5 .09 7-.51 4.55-1.36 13.95-10.59 18-14.07l33-28.55C127.65 11 135.28 3.42 142 .66Zm88.99.92c8.14-1.1 10.99 3.31 15.29 9.42C252.14 19.33 259 30.66 263 40c19.36 45.18 19.15 94.05-.86 139-3.26 7.33-15.69 28.99-21.31 33.57-6.91 5.63-17.91.94-16.59-8.57.62-4.48 6.11-11 8.76-15 5.59-8.44 10.53-17.55 14.19-27 15.9-41.05 13.16-87.79-9.2-126l-7-11c-5.35-7.74-13.44-18.1 0-23.42Zm-25.99 26c8.01-1.03 10.67 3.34 14.66 9.42 5.79 8.83 9.01 15.11 12.66 25 12.18 33.03 11.37 65.44-1.92 98-2.76 6.74-7.34 14.94-11.4 21-2.38 3.54-4.51 6.84-9 7.72-7.98 1.56-13.63-5.05-11.35-12.72 1.11-3.77 5.34-9.27 7.48-13 3.8-6.66 6.93-13.73 9.36-21 10.65-32 5.29-65.98-13.16-94-5.03-7.65-8.57-15.98 2.67-20.42Zm-28 28.11c10.33-1.27 14.74 10.4 18.13 18.31 8.6 20.1 8.8 45.63 1.06 66-2.88 7.57-8.05 22.29-18.19 20.76-6.86-1.04-9.09-7.73-7.36-13.76l5.74-12c3.13-7.44 5.89-19.95 5.58-28-.33-8.45-2.98-19.28-6.4-27l-5.91-12c-1.63-6.23 1.93-10.1 7.35-12.31Z"/></svg>;

var pianoUnit = 128;    // Piano Height (px) per 1 second
var sharpWidth = 30;    // Sharp piano width (px)
var normalWidth = 50;   // Normal piano width (px)

var startTime = 0;    
var playingSpeed = 2;   // Playback piano song speed (Integer)

var tempPressed = {};
var keyPressed = [];

var tick = 300;
var playingSong = false;

const allSharps = [];

var mouseDown = false;
var tempMode = "menu";
var allKeys = {
  49: {character: '1', pressed: false},
  50: {character: '2', pressed: false},
  51: {character: '3', pressed: false},
  52: {character: '4', pressed: false},
  53: {character: '5', pressed: false},
  54: {character: '6', pressed: false},
  55: {character: '7', pressed: false},
  56: {character: '8', pressed: false},
  57: {character: '9', pressed: false},
  48: {character: '0', pressed: false},
  81: {character: 'Q', pressed: false},
  87: {character: 'W', pressed: false},
  69: {character: 'E', pressed: false},
  82: {character: 'R', pressed: false},
  84: {character: 'T', pressed: false},
  89: {character: 'Y', pressed: false},
  85: {character: 'U', pressed: false},
  73: {character: 'I', pressed: false},
  79: {character: 'O', pressed: false},
  80: {character: 'P', pressed: false},
  65: {character: 'A', pressed: false},
  83: {character: 'S', pressed: false},
  68: {character: 'D', pressed: false},
  70: {character: 'F', pressed: false},
  71: {character: 'G', pressed: false},
  72: {character: 'H', pressed: false},
  74: {character: 'J', pressed: false},
  75: {character: 'K', pressed: false},
  76: {character: 'L', pressed: false},
  90: {character: 'Z', pressed: false},
  88: {character: 'X', pressed: false},
  67: {character: 'C', pressed: false},
  86: {character: 'V', pressed: false},
  66: {character: 'B', pressed: false},
  78: {character: 'N', pressed: false},
  77: {character: 'M', pressed: false},
}
const pianoKeys = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 90, 83, 88, 68, 67, 70, 86, 66, 72, 78, 74, 77];

function App() {

  const [mode, changeMode] = useState(tempMode);
  const [song, setSong] = useState(null);
  const pianoNotes = useRef();
  const setMode = (temp) => {setSong(null); changeMode(temp); tempMode = temp;}

  /* ------------------------ INITIALIZATION FUNCTION ------------------------ */

  const init = () => {

    var temp = 0;
    var pianoHolder = document.querySelector(".piano");
    var launchpad = document.querySelector(".launchpad");
    var numberPerRow = 8;
    

    for (var i = 0; i < Object.keys(allKeys).length / numberPerRow; i++){
      var newRow = document.createElement("div");
      newRow.classList.add("row");

      var start = numberPerRow * i;
      var rowCount = Math.floor(Object.keys(allKeys).length / numberPerRow);
      var end = (i === rowCount - 1 ? start + (Object.keys(allKeys).length - 1) % numberPerRow : start + (numberPerRow - 1));
      console.log(start, end);

    }

    for (var e in allKeys) {
      var newKey = document.createElement("div");
      newKey.innerText = allKeys[e].character;
      newKey.classList.add("launchpad-button");
      launchpad.appendChild(newKey);

    }

    pianoKeys.forEach((e, i) => {
      var newKey = document.createElement("div");
      var newText = document.createElement("span");

      newText.innerText = allKeys[e].character;
      newKey.appendChild(newText);
  
      if (i % 12 === 1 || i % 12 === 3 || i % 12 === 6 || i % 12 === 8 || i % 12 === 10){
        allSharps.push(allKeys[e].character);
        newKey.classList.add("black-key");
        allKeys[e].keyPos = temp;
      } else {
        newKey.classList.add("white-key");
        allKeys[e].keyPos = temp++;
      }

      pianoHolder.appendChild(newKey);
      allKeys[e].pianoKey = newKey;

      var audioFile = require("./notes/note" + (i+1) + ".wav");
      var pianoAudio = new Audio(audioFile);
      allKeys[e].pianoAudio = pianoAudio;

      newKey.addEventListener("mousedown", () => {
        newKey.classList.add("pressed");
        pianoAudio.currentTime = 0;
        pianoAudio.play();
      });

      newKey.addEventListener("mouseup", () => {
        newKey.classList.remove("pressed");
      });

      newKey.addEventListener("mouseenter", () => {
        if (mouseDown === true){
          newKey.classList.add("pressed");
          pianoAudio.currentTime = 0;
          pianoAudio.play();
        }
      });

      newKey.addEventListener("mouseout", () => {
        if (newKey.classList.contains("pressed")){
        newKey.classList.remove("pressed");
        }
      });

    });

  }

  /* ------------------------------------------------------------------------- */

  window.addEventListener("load", () => {

    init();

    // Used a static variable, tempMode, instead of the declared state variable, mode, due to re-rendering issues - an honest small work around.
    document.addEventListener("keydown", (e) => {

      if (e.repeat) return; 

      if (playingSong === true && e.keyCode === 32) {

        var newNote = document.querySelector(".notes-holder");
        if (playingSpeed === 0) { newNote.classList.remove("paused"); playingSpeed = 1; console.log(playingSpeed); } 
        else { newNote.classList.add("paused"); playingSpeed = 0; console.log(playingSpeed); }

      }

      if (allKeys[e.keyCode] && typeof allKeys[e.keyCode].pianoKey !== "undefined" && tempMode === "piano" && allKeys[e.keyCode].pressed === false) {

        //console.log("Down: " + e.keyCode); 
        allKeys[e.keyCode].pressed = true;
        allKeys[e.keyCode].pianoKey.classList.add("pressed"); 
        allKeys[e.keyCode].pianoAudio.currentTime = 0; 
        allKeys[e.keyCode].pianoAudio.play();

        if (startTime === 0){ tempPressed[e.keyCode] = {delay: 0, length: 0}; startTime = new Date(); } 
        else { tempPressed[e.keyCode] = {delay: Math.floor(Math.abs(startTime - new Date()) / 1000 * 100) / 100, length: 0}; }

      }

    });

    document.addEventListener("keyup", (e) => {
      if (e.repeat) return; 
      if (allKeys[e.keyCode] && typeof allKeys[e.keyCode].pianoKey !== "undefined" && tempMode === "piano" && allKeys[e.keyCode].pressed === true) {
        //console.log("Up: " + e.keyCode); 
        allKeys[e.keyCode].pressed = false;
        tempPressed[e.keyCode].length = Math.floor(Math.abs(startTime - new Date()) / 1000 * 100) / 100 - tempPressed[e.keyCode].delay;
        keyPressed.push({note: String.fromCharCode(e.keyCode), delay: tempPressed[e.keyCode].delay, length: tempPressed[e.keyCode].length});
        delete tempPressed[e.keyCode];
        console.log(keyPressed);
        allKeys[e.keyCode].pianoKey.classList.remove("pressed");
      }
    });

    document.addEventListener("mousedown", () => {mouseDown = true});
    document.addEventListener("mouseup", () => {mouseDown = false});

    window.addEventListener("blur", () => {
      mouseDown = false;
      pianoKeys.forEach((e) => {
        allKeys[e].pianoKey.classList.remove("pressed");
        allKeys[e].pressed = false;
      });
    });

  });

  useEffect(() => {

    var pianoHolder = document.querySelector(".piano");
    var newNote = document.querySelector(".notes-holder");

    pianoNotes.current.innerHTML = "";
    pianoNotes.current.classList.remove("end");
    
    if (song === null) playingSong = false;
    else playingSong = true;

    if (song !== null){

      var longestNote = song.notes[0];
      newNote.style.width = `${pianoHolder.getBoundingClientRect().width}px`;

      song.notes.forEach((e, i) => {
        
        startTime = 0;

        var keycode = e.note.charCodeAt(0);
        var index = pianoKeys.indexOf(keycode);

        if (index === -1) return;

        if ((e.length + e.delay) > (longestNote.length + longestNote.delay)) longestNote = e;

        var newElement = document.createElement("div");
        newElement.classList.add("note");

        newElement.innerText = e.note;
        newElement.style.bottom = `${e.delay * pianoUnit}px`;
        newElement.style.height = `${e.length * pianoUnit}px`;

        if (allSharps.includes(e.note)) {
            newElement.classList.add("sharp-flat");
            newElement.style.left = `${allKeys[keycode].keyPos * normalWidth - (sharpWidth/2)}px`;   
        } else {
          newElement.style.left= `${allKeys[keycode].keyPos * normalWidth}px`;    
        }    

        pianoNotes.current.appendChild(newElement);
        pianoNotes.current.classList.add("visible");

      })

      var start = pianoHolder.getBoundingClientRect().top * -1;

      newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;
      pianoNotes.current.style.transform = `translateY(${start}px)`;
      pianoNotes.current.style.height = `${(longestNote.delay * pianoUnit) + (longestNote.length * pianoUnit)}px`;

      const startPlaying = () => {

        if (playingSong !== false && start < pianoNotes.current.clientHeight){
          //start += pianoUnit/tick * speed * playingSpeed;
          start += (1000/tick) * (pianoUnit/1000) * playingSpeed;
          pianoNotes.current.style.transform = `translateY(${start}px)`;
        } else if (playingSong !== false) {
          playingSong = false; 
          setSong(null); 
          pianoNotes.current.classList.remove("visible");
          return;
        }

        setTimeout(() => {
          if (playingSong === false && start >= pianoNotes.current.clientHeight) return;
          requestAnimationFrame(startPlaying);
        }, 1000/tick);
        
      }

      requestAnimationFrame(startPlaying);

    }

    window.addEventListener("resize", () => {newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});

    return () => {
      window.removeEventListener("resize", () => {newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});
    }

  }, [song]);

/* -------------------------------------------------------------- */
  useLayoutEffect(() => {animation();}, []); 
/* -------------------------------------------------------------- */

  return (
    
    <>
      <div className="loader">
        <div className="loader-holder">

          <span className='loader-text'>
            <span>P</span>
            <span>e</span>
            <span>a</span>
            <span>c</span>
            <span>h</span>
            <span className="bold">M</span>
            <span className="bold">i</span>
            <span className="bold">x</span>
          </span>

        </div>
      </div>
      <div className="masthead">
        <span className="logo" onClick={() => {setMode("menu");}}>Peach<span className="bold">Mix</span></span>
      </div>
      <div className={`main-page${mode !== "menu" ? " hidden" : ""}`}>

        <span className="main-text">Choose from one of the following modes</span>

        <div className="mode-selection">
          <div className="mode-button" onClick={() => {setMode("preset");}}>{preset}<span>Sound Presets</span></div>
          <div className="mode-button" onClick={() => {setMode("piano");}}>{piano}<span>Piano Mode</span></div>
          <div className="mode-button" onClick={() => {setMode("import");}}>{upload}<span>Import Audio</span></div>
        </div>

      </div>

      <div className={`page${mode === "preset" ? " visible" : ""}`}>
        <div className="launchpad">
          <div className="launchpad-button">D</div>
        </div>
      </div>

      <div className={`page${mode === "piano" ? " visible" : ""}`}>

        <div className="notes-holder">
          <div ref={pianoNotes} className="piano-notes"></div>
        </div>

        <div className="piano-holder">

          <div className="piano">
          </div>

          <div className={`song-details${song !== null ? " visible" : ""}`}>
            <div className="song-title">{song !== null ? song.title : `Restarting...`}</div>
            <div className="song-artist">{song !== null ? song.artist : ""}</div>
          </div>

          <div className={`theme-button${song !== null ? " hidden" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 646"><path d="M180 444V24c0-3.15-.1-5.93.79-9C184.13 3.45 195.86-2.13 207 1.96c5.74 2.11 17.43 10.9 23 14.7l43 30.22C324.29 84.7 383.7 129.89 425.13 178c23.69 27.51 45.31 58.27 44.87 96-.12 9.59-2.35 22.7-4.85 32-9.94 36.93-30.22 62.26-60.15 85.58-9.71 7.56-30.52 23.48-43 22.32-9.69-.9-17.82-10.24-17.82-19.9 0-6.62 5.42-15.1 7.63-22 4.47-13.99 5.03-24.65 1.98-39-7.15-33.64-36.3-70.04-61.79-92-8.18-7.05-22.48-18.36-32-23v324c-.06 40.87-27.9 71.98-63 89.24-44.26 21.77-102.65 19.35-145-5.84C23.41 608.39.41 578.39 0 544v-6c.13-10.62 2.97-22.28 7.15-32 27.38-63.74 112.04-82.26 172.85-62Z"/></svg>
            <span onClick={() => {setSong(songs[Math.floor(Math.random() * songs.length)]);}}>Play a song</span>
          </div>

        </div>

      </div>

      <div className={`page${mode === "import" ? " visible" : ""}`}>
        <div className="key-tube">
          <div className="key">5</div>
          <div className="audio-details">
            Click or drag to input an audio clip.
          </div>
        </div>
      </div>

    </>
  );
}

export default App;

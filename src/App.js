import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import animation from './animation.js';
import songs from './songs.js';


const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M10 2C15.27.5 23.33.12 27.89 3.65c1.86 1.44 4.29 4.39 3.43 6.93-.89 2.62-5.01 3.15-7.32 2.8C17.64 12.43 12.89 7.37 10 2Zm25 10c6.05 0 10.91-.74 15.96 3.39C63.5 25.64 60.44 48.11 46 55c4.12-12.59 4.98-26.19-4.33-36.96L35 12Zm-19 2.11c4.85-.16 5.23 1.28 9 1.41 5.15.17 8.97-4.14 15.47 3.57C49.53 29.84 50.92 60 33 62.79 17.71 65.17-1.18 44.85 7.26 24c1.97-4.87 3.89-7.71 8.74-9.89Z"/></svg>;
//const searchIcon = <svg xmlns="http://www.w3.org/2000/svg"><path d="M23.029 23.621 34 34ZM2 14.109C2 7.421 7.731 2 14.8 2s12.8 5.421 12.8 12.109-5.731 12.109-12.8 12.109S2 20.795 2 14.109Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></svg>

const upload = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221 215"><path d="M95 58 69 85c-2.76 2.76-10.01 10.5-13 12.12-2.16.93-4.75.99-7 0C44.23 95.47 34.24 85.11 33.28 80c-1.08-5.72 3.22-10.14 6.81-14l16.87-17L67 38l26-27c5.68-5.67 9.34-10.2 18-9.94 9.11.27 15.11 7.92 20.99 13.94L171 56c4.41 4.41 15.49 14.23 16.7 20 1.71 8.22-13.4 24.34-21.7 21.4-3.95-1.4-15.37-13.75-19-17.4l-21-22v78c-.01 3.19.29 6.97-1.89 9.57-4 4.78-23.22 4.78-27.22 0-2.18-2.6-1.88-6.38-1.89-9.57V58ZM6.02 132.74c4.52-1.11 9.33-.8 13.98-.74 21.08.29 7.18 27.05 13.69 40 4.6 9.15 13.2 9.99 22.31 10h109c4.08-.01 6.97-.03 11-1.04 16.76-4.23 12.85-22.91 13-35.96.05-3.9.17-7.72 3.28-10.57 3.62-3.32 11.94-2.49 16.72-2.43 11.07.16 11.99 5.4 12 15v21c0 14.26.97 25.96-10.04 36.96-3.32 3.33-6.48 5.74-10.96 7.28-4.84 1.67-8 1.75-13 1.76H34c-4.75-.01-7.35-.02-12-1.44C-1.94 205.22 0 180.82 0 161c0-5.25-.78-19.93 1.31-23.96 1.34-2.57 2.35-2.98 4.71-4.3Z"/></svg>;
const piano = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1064 1064"><path d="M24 1.07h1002c12.32-.07 19.6-.9 28.91 8.95 3.26 3.44 5.25 6.43 6.65 10.98 1.42 4.65 1.43 7.25 1.44 12v999c-.09 19.13-11.91 30.97-31 31H38c-12.32 0-19.6.83-28.91-9.02-3.26-3.44-5.25-6.43-6.65-10.98-1.42-4.65-1.43-7.25-1.44-12V41C1 28.6-.21 19.85 9.09 10.02 13.84 4.99 17.37 3.04 24 1.07ZM193 60H60v944h192V665h-26c-21.95-.03-32.97-16.37-33-37V60Zm250 0h-73v565c-.03 20.4-8.95 39.89-32 40h-27v339h191V665h-25c-5.3-.01-10.08-.27-15-2.55-15.2-7.06-18.98-26.39-19-41.45V60Zm251 0h-73v561c-.03 21.17-6.76 43.88-32 44h-27v339h191V665h-26c-23.77-.04-32.97-18.62-33-40V60Zm310 0H871v568c-.02 13.59-6.29 30.21-20 35.44-4.09 1.56-7.72 1.55-12 1.56h-27v339h192V60Z"/></svg>;
const preset = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 216"><path d="M142 .66c7.31-1.17 11.15 2.22 12.75 9.34v189c.25 2.57.33 5.51 0 8-.61 1.34-1.12 2.77-1.84 3.96-6.51 10.75-16.8 1.51-22.91-3.91l-43-37.2c-3.71-3.27-12.81-11.93-17-13.29-2.05-.67-4.83-.56-7-.56H25c-4.57 0-14.18.6-17.98-1.31C.96 151.65 1.01 146.86 1 141V74c.02-12.14 4.08-14.94 16-15h47c2.12 0 5 .09 7-.51 4.55-1.36 13.95-10.59 18-14.07l33-28.55C127.65 11 135.28 3.42 142 .66Zm88.99.92c8.14-1.1 10.99 3.31 15.29 9.42C252.14 19.33 259 30.66 263 40c19.36 45.18 19.15 94.05-.86 139-3.26 7.33-15.69 28.99-21.31 33.57-6.91 5.63-17.91.94-16.59-8.57.62-4.48 6.11-11 8.76-15 5.59-8.44 10.53-17.55 14.19-27 15.9-41.05 13.16-87.79-9.2-126l-7-11c-5.35-7.74-13.44-18.1 0-23.42Zm-25.99 26c8.01-1.03 10.67 3.34 14.66 9.42 5.79 8.83 9.01 15.11 12.66 25 12.18 33.03 11.37 65.44-1.92 98-2.76 6.74-7.34 14.94-11.4 21-2.38 3.54-4.51 6.84-9 7.72-7.98 1.56-13.63-5.05-11.35-12.72 1.11-3.77 5.34-9.27 7.48-13 3.8-6.66 6.93-13.73 9.36-21 10.65-32 5.29-65.98-13.16-94-5.03-7.65-8.57-15.98 2.67-20.42Zm-28 28.11c10.33-1.27 14.74 10.4 18.13 18.31 8.6 20.1 8.8 45.63 1.06 66-2.88 7.57-8.05 22.29-18.19 20.76-6.86-1.04-9.09-7.73-7.36-13.76l5.74-12c3.13-7.44 5.89-19.95 5.58-28-.33-8.45-2.98-19.28-6.4-27l-5.91-12c-1.63-6.23 1.93-10.1 7.35-12.31Z"/></svg>;

var pianoUnit = 128;    // Piano Height (px) per 1 second
var sharpWidth = 30;    // Sharp piano width (px)
var normalWidth = 50;   // Normal piano width (px)

var pianoVolume = 1;

var startTime = null;    
var maxPlayingSpeed = 2.05;
var playingSpeed = maxPlayingSpeed;   // Playback piano song speed (Integer)

//var tempPressed = {};
//var keyPressed = [];

var tick = 150;
var playingSong = false;

const allSharps = [];

var mouseDown = false;
var tempMode = "menu";

var playerX, playerY, velX = 1, velY = 0;

const printNotes = () => {

  /*
  var string = "";

  keyPressed.forEach((e, i) => {
    string += `{ note: '${e.note}', delay: '${e.delay}', length: '${Math.floor(e.length * 100) / 100}'},`;
    string += "\n";
  });
  */

}

var snakeMap = [];
var allKeysMap = new Map();
allKeysMap.set(49, {character: '1', preset: true, pressed: false, color: "blue"});
allKeysMap.set(50, {character: '2', preset: true, pressed: false, color: "blue"});
allKeysMap.set(51, {character: '3', preset: true, pressed: false, color: "blue"});
allKeysMap.set(52, {character: '4', preset: true, pressed: false, color: "blue"});
allKeysMap.set(53, {character: '5', preset: true, pressed: false, color: "blue"});
allKeysMap.set(54, {character: '6', preset: true, pressed: false, color: "blue"});
allKeysMap.set(55, {character: '7', preset: true, pressed: false, color: "red"});
allKeysMap.set(56, {character: '8', preset: true, pressed: false, color: "red"});
allKeysMap.set(57, {character: '9', preset: true, pressed: false, color: "red"});
allKeysMap.set(48, {character: '0', preset: true, pressed: false, color: "red"});
allKeysMap.set(81, {character: 'Q', preset: true, pressed: false, color: "red"});
allKeysMap.set(87, {character: 'W', preset: true, pressed: false, color: "red"});
allKeysMap.set(69, {character: 'E', preset: true, pressed: false, color: "green"});
allKeysMap.set(82, {character: 'R', preset: true, pressed: false, color: "green"});
allKeysMap.set(84, {character: 'T', preset: true, pressed: false, color: "green"});
allKeysMap.set(89, {character: 'Y', preset: true, pressed: false, color: "green"});
allKeysMap.set(85, {character: 'U', preset: true, pressed: false, color: "green"});
allKeysMap.set(73, {character: 'I', preset: true, pressed: false, color: "green"});
allKeysMap.set(79, {character: 'O', preset: true, pressed: false, color: "purple"});
allKeysMap.set(80, {character: 'P', preset: true, pressed: false, color: "purple"});
allKeysMap.set(65, {character: 'A', preset: true, pressed: false, color: "purple"});
allKeysMap.set(83, {character: 'S', preset: true, pressed: false, color: "purple"});
allKeysMap.set(68, {character: 'D', preset: true, pressed: false, color: "purple"});
allKeysMap.set(70, {character: 'F', preset: true, pressed: false, color: "purple"});
allKeysMap.set(71, {character: 'G', preset: true, pressed: false, color: "pink"});
allKeysMap.set(72, {character: 'H', preset: true, pressed: false, color: "pink"});
allKeysMap.set(74, {character: 'J', preset: true, pressed: false, color: "pink"});
allKeysMap.set(75, {character: 'K', preset: true, pressed: false, color: "pink"});
allKeysMap.set(76, {character: 'L', preset: true, pressed: false, color: "pink"});
allKeysMap.set(90, {character: 'Z', preset: true, pressed: false, color: "pink"});
allKeysMap.set(88, {character: 'X', preset: true, pressed: false, color: "orange"});
allKeysMap.set(67, {character: 'C', preset: true, pressed: false, color: "orange"});
allKeysMap.set(86, {character: 'V', preset: true, pressed: false, color: "orange"});
allKeysMap.set(66, {character: 'B', preset: true, pressed: false, color: "orange"});
allKeysMap.set(78, {character: 'N', preset: true, pressed: false, color: "orange"});
allKeysMap.set(77, {character: 'M', preset: true, pressed: false, color: "orange"});

allKeysMap.set(188, {character: ',', preset: false, pressed: false, color: "orange"});
allKeysMap.set(190, {character: '.', preset: false, pressed: false, color: "orange"});
allKeysMap.set(186, {character: ';', preset: false, pressed: false, color: "orange"});
allKeysMap.set(191, {character: '/', preset: false, pressed: false, color: "orange"});
allKeysMap.set(222, {character: '\'', preset: false, pressed: false, color: "orange"});

const pianoKeys = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 90, 83, 88, 68, 67, 70, 86, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191, 222];

function App() {

  const [mode, changeMode] = useState(tempMode);
  const [song, setSong] = useState(null);
  const [playSnake, setPlaySnake] = useState(false);
  const pianoNotes = useRef();
  const setMode = (temp) => {setSong(null); changeMode(temp); tempMode = temp;}

  var searchBar = document.querySelector(".searchbar");
  var actualPiano = document.querySelector(".piano");
  var searchResults = document.querySelector(".search-results");
  const searchIcon = <svg className="search-icon" onClick={() => {searchBar.focus();}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m22.79 23.32 10.85 10.25-10.85-10.25ZM1.98 13.93c0-6.6 5.67-11.96 12.66-11.96 7 0 12.67 5.36 12.67 11.96 0 6.6-5.67 11.95-12.67 11.95-6.99 0-12.66-5.35-12.66-11.95Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/></svg>;

  /* ------------------------ INITIALIZATION FUNCTION ------------------------ */

  const init = () => {

    var temp = 0;
    var pianoHolder = document.querySelector(".piano");
    var launchpad = document.querySelector(".launchpad");

    var tempRow = [];

    for (var [key, value] of allKeysMap) {
      if (!value.preset) continue;
      var newButton = document.createElement("div");
      var newSpan = document.createElement("span");
      newSpan.innerText = value.character;
      newButton.appendChild(newSpan);
      newButton.classList.add("button");
      newButton.classList.add(value.color);
      launchpad.appendChild(newButton);
      value.presetKey = newButton;

      // This piece just makes a 2D array for the snake minigame in the Preset Mode
      if (temp % 6 === 0 && temp !== 0) {snakeMap.push(tempRow); tempRow = [];}
      tempRow.push(value.presetKey);

      var audioFile = require("./SoundPresets/JoeyTrap/note" + ((temp++ % 12) + 1) + ".ogg");
      var presetAudio = new Audio(audioFile);
      presetAudio.preload = "auto";
      value.presetAudio = presetAudio;

      // Small little bug regarding Maps that send a pointer to the last button whenever attempting to make new eventListeners,
      // Instead, pay attention to the next forEach loop, since all eventListeners are made there.
    }

    snakeMap.push(tempRow); // Makes sure to get the last row for the Snake Map.

    allKeysMap.forEach((e, i) => {

      if (!e.preset) return;

      e.presetKey.addEventListener("mousedown", () => {
        e.presetKey.classList.add("pressed");
        e.presetAudio.currentTime = 0;
        e.presetAudio.play();
      });

      e.presetKey.addEventListener("mouseup", () => {
        e.presetKey.classList.remove("pressed");
      });

      e.presetKey.addEventListener("mouseenter", () => {
        if (mouseDown === true){
          e.presetKey.classList.add("pressed");
          e.presetAudio.currentTime = 0;
          e.presetAudio.play();
        }
      });

      e.presetKey.addEventListener("mouseout", () => {
        if (e.presetKey.classList.contains("pressed")){
        e.presetKey.classList.remove("pressed");
        }
      });

    });

    temp = 0;

    pianoKeys.forEach((e, i) => {
      var newKey = document.createElement("div");
      var newText = document.createElement("span");

      newText.innerText = allKeysMap.get(e).character;
      newKey.appendChild(newText);
  
      if (i % 12 === 1 || i % 12 === 3 || i % 12 === 6 || i % 12 === 8 || i % 12 === 10){
        allSharps.push(allKeysMap.get(e).character);
        newKey.classList.add("black-key");
        allKeysMap.get(e).keyPos = temp;
      } else {
        newKey.classList.add("white-key");
        allKeysMap.get(e).keyPos = temp++;
      }

      pianoHolder.appendChild(newKey);
      allKeysMap.get(e).pianoKey = newKey;

      var audioFile = require("./oggNotes/note" + (i+1) + ".ogg");
      var pianoAudio = new Audio(audioFile);
      pianoAudio.preload = "auto";
      pianoAudio.volume = pianoVolume;
      allKeysMap.get(e).pianoAudio = pianoAudio;

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

    var lastKey = document.createElement("div");
    lastKey.classList.add("white-key");
    pianoHolder.appendChild(lastKey);

  }

  /* ------------------------------------------------------------------------- */

  window.addEventListener("load", () => {

    init();

    // Used a static variable, tempMode, instead of the declared state variable, mode, due to re-rendering issues - an honest small work around.
    document.addEventListener("keydown", (e) => {

      if (e.repeat) return; 

      /*
      if (playingSong === true && e.keyCode === 32) {

        var newNote = document.querySelector(".notes-holder");
        if (playingSpeed === 0) { newNote.classList.remove("paused"); playingSpeed = maxPlayingSpeed; console.log(playingSpeed); } 
        else { newNote.classList.add("paused"); playingSpeed = 0; console.log(playingSpeed); }

      }*/

      // PRESET MODE

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).presetKey !== "undefined" && tempMode === "preset" && allKeysMap.get(e.keyCode).pressed === false) {
        allKeysMap.get(e.keyCode).pressed = true;
        allKeysMap.get(e.keyCode).presetKey.classList.add("pressed"); 
        allKeysMap.get(e.keyCode).presetAudio.currentTime = 0; 
        allKeysMap.get(e.keyCode).presetAudio.play();
      }

      if (e.keyCode === 37) {velX = -1; velY = 0;}
      else if (e.keyCode === 38) {velX = 0; velY = -1;}
      else if (e.keyCode === 39) {velX = 1; velY = 0;}
      else if (e.keyCode === 40) {velX = 0; velY = 1;}

      // PIANO KEYS
      if (!document.activeElement.classList.contains("searchbar") && allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).pianoKey !== "undefined" && tempMode === "piano" && allKeysMap.get(e.keyCode).pressed === false) {
        allKeysMap.get(e.keyCode).pressed = true;
        allKeysMap.get(e.keyCode).pianoKey.classList.add("pressed"); 
        allKeysMap.get(e.keyCode).pianoAudio.currentTime = 0; 
        allKeysMap.get(e.keyCode).pianoAudio.play();

        // RECORDNG KEYS

        //if (startTime === 0){ tempPressed[e.keyCode] = {delay: 0, length: 0}; startTime = new Date(); } 
        //else { tempPressed[e.keyCode] = {delay: Math.floor(Math.abs(startTime - new Date()) / 1000 * 100) / 100, length: 0}; }
      }

    });

    document.addEventListener("keyup", (e) => {
      if (e.repeat) return; 
      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).pianoKey !== "undefined" && tempMode === "piano" && allKeysMap.get(e.keyCode).pressed === true) {
        //console.log("Up: " + e.keyCode); 
        allKeysMap.get(e.keyCode).pressed = false;
        //tempPressed[e.keyCode].length = Math.floor(Math.abs(startTime - new Date()) / 1000 * 100) / 100 - tempPressed[e.keyCode].delay;
        //keyPressed.push({note: String.fromCharCode(e.keyCode), delay: tempPressed[e.keyCode].delay, length: tempPressed[e.keyCode].length});
        //delete tempPressed[e.keyCode];
        printNotes();
        allKeysMap.get(e.keyCode).pianoKey.classList.remove("pressed");
      }

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).presetKey !== "undefined" && tempMode === "preset" && allKeysMap.get(e.keyCode).pressed === true) {
        //console.log("Up: " + e.keyCode); 
        allKeysMap.get(e.keyCode).pressed = false;
        allKeysMap.get(e.keyCode).presetKey.classList.remove("pressed");
      }

    });

    document.addEventListener("mousedown", () => {mouseDown = true});
    document.addEventListener("mouseup", () => {mouseDown = false});

    window.addEventListener("blur", () => {
      mouseDown = false;

      for (var [key, value] of allKeysMap) {
        if (value.presetKey) value.presetKey.classList.remove("pressed");
        if (value.pianoKey) value.pianoKey.classList.remove("pressed");
        value.pressed = false;
      }

    });

  });

  const snakeTick = () => { 

    snakeMap.forEach((e) => {
      e.forEach((j) => {
        j.classList.remove("snake");
      });
    });

    if ((playerY + velY) >= 0 && (playerY + velY) < snakeMap.length && (playerX + velX) >= 0 && (playerX + velX) < snakeMap[0].length){
      playerX += velX;
      playerY += velY;
      snakeMap[playerY][playerX].classList.add("snake");
    } else {
      //console.log("DO NOT");
      snakeMap[playerY][playerX].classList.add("snake");
    }

  }

  useEffect(() => {

    if (playSnake){ // Enter the Snake Minigame

      playerX = Math.floor(Math.random() * snakeMap.length);
      playerY = Math.floor(Math.random() * snakeMap.length);
      snakeMap[playerY][playerX].classList.add("snake");

      setInterval(() => {
        snakeTick();
      }, 1000/5);

    } else { // Exit the Snake Minigame

      snakeMap.forEach((e) => {
        e.forEach((j) => {
          j.classList.remove("snake");
        });
      });

    }

  }, [playSnake]);

// PIANO NOTE PLAYING ----- PLAYING A SONG FUNCTION

  useEffect(() => {

    var pianoHolder = document.querySelector(".piano");
    var newNote = document.querySelector(".notes-holder");
    var detailHolder = document.querySelector(".song-details");
    //var pianoLines = document.querySelector(".piano-lines");

    pianoNotes.current.innerHTML = "";
    //pianoLines.innerHTML = "";
    pianoNotes.current.classList.remove("end");
    
    if (song === null) {playingSong = false; startTime = null; playingSpeed = 0;}
    else {playingSong = true; playingSpeed = maxPlayingSpeed; setTimeout(() => {detailHolder.classList.remove("visible");}, 2000);}

    // Executes only when there is a song available and exists.

    if (song !== null){

      startTime = new Date();
      var longestNote = song.notes[0];
      newNote.style.width = `${pianoHolder.getBoundingClientRect().width}px`;

      /*
      var lines = ((pianoKeys.length + 1) / 12 + 1);

      for (var i = 0; i < lines; i++){
        var newLine = document.createElement("div");
        newLine.classList.add("piano-line");
        pianoLines.appendChild(newLine);
        if (i === lines - 1)
          newLine.style.left = `${pianoHolder.getBoundingClientRect().width - 2}px`;
        else if (i === 0)
          newLine.style.left = `${pianoHolder.getBoundingClientRect().width / (lines - 1) * i}px`;
        else
          newLine.style.left = `${(pianoHolder.getBoundingClientRect().width / (lines - 1) * i) - 1}px`;
      }*/

      song.notes.forEach((e, i) => {

        // Simple function to find out the note that we end on, based off length and duration.
        var keycode = e.note;
        
        if (keycode === null && typeof e.tempo !== "undefined") {
          
          console.log("tempo: " + e.tempo); 
          playingSpeed = e.tempo / 60;
          var newLine = document.createElement("div");
          newLine.classList.add("line");
          newLine.style.bottom = `${e.delay * pianoUnit}px`;
          pianoNotes.current.appendChild(newLine);
          return;

        }

        var index = pianoKeys.indexOf(keycode);
        if (index === -1) return;
        if ( (parseFloat(e.length) + parseFloat(e.delay)) > (parseFloat(longestNote.length) + parseFloat(longestNote.delay)) ) longestNote = e;

        // While searching for the longest note, we make them and put them on the note holder.
        var newElement = document.createElement("div");
        newElement.classList.add("note");
        if (e.hand === "left") newElement.classList.add("left");
        newElement.innerText = allKeysMap.get(e.note).character;
        newElement.style.bottom = `${e.delay * pianoUnit}px`;
        newElement.style.height = `${e.length * pianoUnit}px`;

        if (allSharps.includes(allKeysMap.get(e.note).character)) {newElement.classList.add("sharp-flat"); newElement.style.left = `${allKeysMap.get(keycode).keyPos * normalWidth - (sharpWidth/2)}px`;   
        } else {newElement.style.left= `${allKeysMap.get(keycode).keyPos * normalWidth}px`;}    

        pianoNotes.current.appendChild(newElement);
        pianoNotes.current.classList.add("visible");

      })

      // Now that all the notes are made, we must move them accordingly down the screen.

      var start = pianoHolder.getBoundingClientRect().top * -1 - (pianoUnit * 3);
      newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;
      pianoNotes.current.style.transform = `translateY(${start}px)`;
      pianoNotes.current.style.height = `${((parseFloat(longestNote.delay) + parseFloat(longestNote.length)) * pianoUnit)}px`;

      // The actual looping portion of the Playing Song function.

      const startPlaying = () => {

        /*
        if (playingSong !== false && start < pianoNotes.current.clientHeight){ start += pianoUnit/tick * playingSpeed; pianoNotes.current.style.transform = `translateY(${start}px)`;
        } else if (playingSong === false || start >= pianoNotes.current.clientHeight) {
          playingSong = false; setSong(null); pianoNotes.current.classList.remove("visible"); return;
        }*/

        if (playingSong !== false && start < pianoNotes.current.clientHeight){ 
          start = (pianoHolder.getBoundingClientRect().top * -1 - (pianoUnit * 3)) + (pianoUnit * Math.floor(Math.abs(startTime - new Date()) / 1000 * 100) / 100 * playingSpeed);
          pianoNotes.current.style.transform = `translateY(${start}px)`;
        } else if (playingSong === false || start >= pianoNotes.current.clientHeight) {
          playingSong = false; setSong(null); pianoNotes.current.classList.remove("visible"); return;
        }

        setTimeout(() => {
          requestAnimationFrame(startPlaying);
        }, 1000/tick);
        
      }

      // Initiating the loop for the first time, exits if doesn't work out.
      requestAnimationFrame(startPlaying);

    }

    window.addEventListener("resize", () => {newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});
    return () => {window.removeEventListener("resize", () => {newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});}

  }, [song]);

// --------------------------------------------------------------------

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
        <div className={`launchpad${playSnake ? " minigame" : ""}`}>
          <div className="launchpad-logo" onClick={() => {setPlaySnake(!playSnake);}}>{logo}</div>
        </div>
      </div>

      <div className={`page${mode === "piano" ? " visible" : ""}`}>

        <div className="notes-holder">
          <div className="piano-lines">
            <div className="line"></div>
          </div>
          <div ref={pianoNotes} className="piano-notes"></div>
        </div>

        <div className="piano-holder">

          <div className="piano">
          </div>

          <div className={`song-search${song !== null ? " hidden" : ""}`}>
            <div className="searchbar-holder">
              <input className="searchbar" placeholder="Search songs & artists" onFocus={() => {
                searchResults.classList.remove("hidden");
                actualPiano.classList.add("faded");

                var text = searchBar.value.toUpperCase();
                var results = [];
                songs.forEach((song) => {
                  if (song.title === null && song.artist !== null){if (song.artist.toUpperCase().includes(text) || text.includes(song.artist.toUpperCase())) results.push(song);}
                  else if (song.title !== null && song.artist === null){if (song.title.toUpperCase().includes(text) || text.includes(song.title.toUpperCase())) results.push(song);}
                  else if (song.title !== null & song.artist !== null){if (song.title.toUpperCase().includes(text) || song.artist.toUpperCase().includes(text) || text.includes(song.title.toUpperCase()) || text.includes(song.artist.toUpperCase())) results.push(song);}
                });

                searchResults.innerHTML = "";
                
                results.forEach((result) => {
                  var search = document.createElement("div");
                  var searchDetails = document.createElement("div");
                  var searchTitle = document.createElement("div");
                  var searchArtist = document.createElement("div");

                  search.classList.add("search");
                  searchDetails.classList.add("search-details");
                  searchTitle.classList.add("search-title");
                  searchArtist.classList.add("search-artist");

                  searchTitle.innerText = result.title === null ? "" : result.title;
                  searchArtist.innerText = result.artist === null ? "" : result.artist;

                  searchDetails.appendChild(searchTitle);
                  searchDetails.appendChild(searchArtist);
                  search.appendChild(searchDetails);
                  searchResults.append(search);

                  search.addEventListener("click", () => {
                    setSong(result);
                  });

                });
              }} onBlur={() => {searchResults.classList.add("hidden"); actualPiano.classList.remove("faded");}} onInput={() => {
                var text = searchBar.value.toUpperCase();
                var results = [];
                songs.forEach((song) => {
                  if (song.title === null && song.artist !== null){if (song.artist.toUpperCase().includes(text) || text.includes(song.artist.toUpperCase())) results.push(song);}
                  else if (song.title !== null && song.artist === null){if (song.title.toUpperCase().includes(text) || text.includes(song.title.toUpperCase())) results.push(song);}
                  else if (song.title !== null & song.artist !== null){if (song.title.toUpperCase().includes(text) || song.artist.toUpperCase().includes(text) || text.includes(song.title.toUpperCase()) || text.includes(song.artist.toUpperCase())) results.push(song);}
                });

                searchResults.innerHTML = "";
                
                results.forEach((result) => {
                  var search = document.createElement("div");
                  var searchDetails = document.createElement("div");
                  var searchTitle = document.createElement("div");
                  var searchArtist = document.createElement("div");

                  search.classList.add("search");
                  searchDetails.classList.add("search-details");
                  searchTitle.classList.add("search-title");
                  searchArtist.classList.add("search-artist");

                  searchTitle.innerText = result.title === null ? "" : result.title;
                  searchArtist.innerText = result.artist === null ? "" : result.artist;

                  searchDetails.appendChild(searchTitle);
                  searchDetails.appendChild(searchArtist);
                  search.appendChild(searchDetails);
                  searchResults.append(search);

                  search.addEventListener("click", () => {
                    setSong(result);
                  });

                });

              }}></input>
              {searchIcon}
            </div>
            <div className="search-results hidden">
            </div>
          </div>

          <div className={`song-details${song !== null ? " visible" : ""}`}>
            <div className="song-title">{song !== null ? song.title : `Restarting...`}</div>
            <div className="song-artist">{song !== null ? song.artist : ""}</div>
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

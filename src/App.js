import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import animation from './animation.js';
import songs from './songs.js';


const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M10 2C15.27.5 23.33.12 27.89 3.65c1.86 1.44 4.29 4.39 3.43 6.93-.89 2.62-5.01 3.15-7.32 2.8C17.64 12.43 12.89 7.37 10 2Zm25 10c6.05 0 10.91-.74 15.96 3.39C63.5 25.64 60.44 48.11 46 55c4.12-12.59 4.98-26.19-4.33-36.96L35 12Zm-19 2.11c4.85-.16 5.23 1.28 9 1.41 5.15.17 8.97-4.14 15.47 3.57C49.53 29.84 50.92 60 33 62.79 17.71 65.17-1.18 44.85 7.26 24c1.97-4.87 3.89-7.71 8.74-9.89Z"/></svg>;

const upload = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221 215"><path d="M95 58 69 85c-2.76 2.76-10.01 10.5-13 12.12-2.16.93-4.75.99-7 0C44.23 95.47 34.24 85.11 33.28 80c-1.08-5.72 3.22-10.14 6.81-14l16.87-17L67 38l26-27c5.68-5.67 9.34-10.2 18-9.94 9.11.27 15.11 7.92 20.99 13.94L171 56c4.41 4.41 15.49 14.23 16.7 20 1.71 8.22-13.4 24.34-21.7 21.4-3.95-1.4-15.37-13.75-19-17.4l-21-22v78c-.01 3.19.29 6.97-1.89 9.57-4 4.78-23.22 4.78-27.22 0-2.18-2.6-1.88-6.38-1.89-9.57V58ZM6.02 132.74c4.52-1.11 9.33-.8 13.98-.74 21.08.29 7.18 27.05 13.69 40 4.6 9.15 13.2 9.99 22.31 10h109c4.08-.01 6.97-.03 11-1.04 16.76-4.23 12.85-22.91 13-35.96.05-3.9.17-7.72 3.28-10.57 3.62-3.32 11.94-2.49 16.72-2.43 11.07.16 11.99 5.4 12 15v21c0 14.26.97 25.96-10.04 36.96-3.32 3.33-6.48 5.74-10.96 7.28-4.84 1.67-8 1.75-13 1.76H34c-4.75-.01-7.35-.02-12-1.44C-1.94 205.22 0 180.82 0 161c0-5.25-.78-19.93 1.31-23.96 1.34-2.57 2.35-2.98 4.71-4.3Z"/></svg>;
const piano = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1064 1064"><path d="M24 1.07h1002c12.32-.07 19.6-.9 28.91 8.95 3.26 3.44 5.25 6.43 6.65 10.98 1.42 4.65 1.43 7.25 1.44 12v999c-.09 19.13-11.91 30.97-31 31H38c-12.32 0-19.6.83-28.91-9.02-3.26-3.44-5.25-6.43-6.65-10.98-1.42-4.65-1.43-7.25-1.44-12V41C1 28.6-.21 19.85 9.09 10.02 13.84 4.99 17.37 3.04 24 1.07ZM193 60H60v944h192V665h-26c-21.95-.03-32.97-16.37-33-37V60Zm250 0h-73v565c-.03 20.4-8.95 39.89-32 40h-27v339h191V665h-25c-5.3-.01-10.08-.27-15-2.55-15.2-7.06-18.98-26.39-19-41.45V60Zm251 0h-73v561c-.03 21.17-6.76 43.88-32 44h-27v339h191V665h-26c-23.77-.04-32.97-18.62-33-40V60Zm310 0H871v568c-.02 13.59-6.29 30.21-20 35.44-4.09 1.56-7.72 1.55-12 1.56h-27v339h192V60Z"/></svg>;
const preset = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 216"><path d="M142 .66c7.31-1.17 11.15 2.22 12.75 9.34v189c.25 2.57.33 5.51 0 8-.61 1.34-1.12 2.77-1.84 3.96-6.51 10.75-16.8 1.51-22.91-3.91l-43-37.2c-3.71-3.27-12.81-11.93-17-13.29-2.05-.67-4.83-.56-7-.56H25c-4.57 0-14.18.6-17.98-1.31C.96 151.65 1.01 146.86 1 141V74c.02-12.14 4.08-14.94 16-15h47c2.12 0 5 .09 7-.51 4.55-1.36 13.95-10.59 18-14.07l33-28.55C127.65 11 135.28 3.42 142 .66Zm88.99.92c8.14-1.1 10.99 3.31 15.29 9.42C252.14 19.33 259 30.66 263 40c19.36 45.18 19.15 94.05-.86 139-3.26 7.33-15.69 28.99-21.31 33.57-6.91 5.63-17.91.94-16.59-8.57.62-4.48 6.11-11 8.76-15 5.59-8.44 10.53-17.55 14.19-27 15.9-41.05 13.16-87.79-9.2-126l-7-11c-5.35-7.74-13.44-18.1 0-23.42Zm-25.99 26c8.01-1.03 10.67 3.34 14.66 9.42 5.79 8.83 9.01 15.11 12.66 25 12.18 33.03 11.37 65.44-1.92 98-2.76 6.74-7.34 14.94-11.4 21-2.38 3.54-4.51 6.84-9 7.72-7.98 1.56-13.63-5.05-11.35-12.72 1.11-3.77 5.34-9.27 7.48-13 3.8-6.66 6.93-13.73 9.36-21 10.65-32 5.29-65.98-13.16-94-5.03-7.65-8.57-15.98 2.67-20.42Zm-28 28.11c10.33-1.27 14.74 10.4 18.13 18.31 8.6 20.1 8.8 45.63 1.06 66-2.88 7.57-8.05 22.29-18.19 20.76-6.86-1.04-9.09-7.73-7.36-13.76l5.74-12c3.13-7.44 5.89-19.95 5.58-28-.33-8.45-2.98-19.28-6.4-27l-5.91-12c-1.63-6.23 1.93-10.1 7.35-12.31Z"/></svg>;

const pauseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 384"><path d="M9 .57 35 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17H15c-11.39-.14-14.95-5.11-15-16V15C.09 7.52 1.63 3.47 9 .57Zm160 0L195 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17h-64c-11.39-.14-14.95-5.11-15-16V15c.09-7.48 1.63-11.53 9-14.43Z"/></svg>;
const endIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 0h16v16H0Z"/></svg>;
const sizeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 16"><path d="m23.88 16-.946-2.6h-4.582L17.39 16h-1.773l4.1-10.667h1.908L25.728 16Zm-4.988-4.056h3.5L20.651 7.2ZM12.395 16l-1.42-3.9H4.1L2.659 16H0L6.152 0h2.863l6.152 16ZM4.912 9.915h5.251l-2.614-7.12ZM18.509.037h4.7l-2.352 3.729Z"/></svg>;
const playingIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 225"><path d="M8.04 1.74C18.72-.89 26.18 5.45 35 10.58l51 29.57 54 31.28 44 25.77c5.69 3.42 13.28 7.36 13.88 14.8.54 6.73-3.79 9.82-8.88 13.14l-31 18.06-82 47.22-56 31.79C5.89 228.63 1.02 221.64 1 208V15C1.09 8.68 2.31 4.99 8.04 1.74Z"/></svg>;


const halfSpeed = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 10"><path d="M3.359 9.401c2.235 0 3.372-1.75 3.372-4.573v-.255C6.731 1.773 5.581 0 3.359 0 1.175 0 0 1.775 0 4.573v.255c0 2.823 1.175 4.573 3.359 4.573Zm0-1.226c-1.252 0-1.839-1.06-1.839-3.283v-.383c0-2.21.588-3.283 1.839-3.283 1.29 0 1.852 1.073 1.852 3.283v.383c0 2.222-.562 3.283-1.852 3.283Zm5.71 1.06V7.702h-1.52v1.533Zm4.483.166a3.047 3.047 0 0 0 3.3-3.053v-.141a2.8 2.8 0 0 0-2.942-2.885 2.747 2.747 0 0 0-1.827.65l.422-2.567h3.934V.166h-5.02l-.8 5.1 1.252.089a2.057 2.057 0 0 1 1.706-.885 1.683 1.683 0 0 1 1.814 1.763v.179a1.7 1.7 0 0 1-1.814 1.763 1.676 1.676 0 0 1-1.813-1.533h-1.482a2.98 2.98 0 0 0 3.27 2.759Zm5.569-.166 1.608-2.402 1.648 2.4h1.622l-2.4-3.411 2.261-3.168h-1.531l-1.507 2.2-1.493-2.197h-1.626l2.261 3.206-2.376 3.372Z"/></svg>;
const normalSpeed = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 11"><path d="M3.731 10.497V.189H2.497a3.909 3.909 0 0 1-2.5 1.7v1.51a4.641 4.641 0 0 0 2.076-.958v8.056Zm3.673 0V8.755H5.677v1.742Zm4.763.189c2.541 0 3.833-1.989 3.833-5.2v-.29c0-3.18-1.307-5.2-3.833-5.2-2.483 0-3.819 2.018-3.819 5.2v.29c0 3.211 1.334 5.2 3.819 5.2Zm0-1.394c-1.423 0-2.091-1.205-2.091-3.731v-.439c0-2.512.668-3.731 2.091-3.731 1.466.003 2.105 1.222 2.105 3.731v.436c0 2.529-.639 3.734-2.105 3.734Zm6.287 1.205 1.828-2.729 1.874 2.729H24l-2.73-3.875 2.57-3.6h-1.742l-1.716 2.5-1.7-2.5h-1.84l2.57 3.642-2.701 3.833Z"/></svg>;
const doubleSpeed = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 10"><path d="M6.274 9.334V8.082H1.562c.013-1.033.3-1.536 2.053-2.3 2.117-.9 2.595-1.859 2.595-3.1v-.077A2.721 2.721 0 0 0 3.228-.003a2.92 2.92 0 0 0-3.15 2.879h1.5a1.552 1.552 0 0 1 1.675-1.654 1.369 1.369 0 0 1 1.472 1.42v.039c0 .942-.31 1.381-1.846 2.014C.401 5.706.001 6.791.001 8.301v1.033Zm2.969 0V7.785H7.707v1.549Zm4.235.168c2.259 0 3.408-1.769 3.408-4.622v-.258C16.886 1.795 15.724 0 13.478 0c-2.208 0-3.4 1.795-3.4 4.622v.258c.005 2.853 1.193 4.622 3.4 4.622Zm0-1.239c-1.265 0-1.859-1.072-1.859-3.318v-.387c0-2.233.594-3.318 1.859-3.318 1.3 0 1.872 1.084 1.872 3.318v.387c0 2.246-.568 3.318-1.872 3.318Zm5.59 1.071 1.627-2.427 1.665 2.427h1.641l-2.428-3.447 2.285-3.2h-1.549l-1.524 2.219-1.51-2.221h-1.64l2.285 3.237-2.401 3.412Z"/></svg>

var pianoUnit = 128;    // Piano Height (px) per 1 second
var sharpWidth = 30;    // Sharp piano width (px)
var normalWidth = 50;   // Normal piano width (px)

var pianoVolume = 0.65;

var firstTempo = null;
var firstTimeSignature = null;

var playingSpeed = 1;   // Playback piano song speed (Integer)
var playing = 1; // 1 for playing || 0 for not.

var tempo = 60;
var timeSignature = 4/4;
var currentTime = 0;
var startTime = null; // Starting clock for determining Piano Song note position
var tick = 150;
var playingSong = false;

const allSharps = [];

var mouseDown = false;
var tempMode = "menu";

var playerX, playerY, velX = 1, velY = 0;

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
allKeysMap.set(16, {character: '⇧', preset: false, pressed: false, color: "orange"});

const pianoKeys = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 90, 83, 88, 68, 67, 70, 86, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191, 222, 16];

const getTimeDifference = () => {

  var temp = startTime;
  startTime = new Date();
  return (Math.abs(temp - new Date()) / 1000);
}

function App() {

  const [mode, changeMode] = useState(tempMode);
  const [song, setSong] = useState(null);
  const [playSnake, setPlaySnake] = useState(false);
  const [playingState, setPlayingState] = useState(playing); 
  const [playingSpeedState, setPlayingSpeedState] = useState(playingSpeed);
  const pianoNotes = useRef();
  const setMode = (temp) => {setSong(null); changeMode(temp); tempMode = temp;}
  const changePlayingSpeed = (temp) => {setPlayingSpeedState(temp); playingSpeed = temp;};
  const changePlaying = (temp) => {setPlayingState(temp); playing = temp;}

  var searchBar = document.querySelector(".searchbar");
  var pianoContainer = document.querySelector(".piano-holder");
  //var actualPiano = document.querySelector(".piano");
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

  }

  /* ------------------------------------------------------------------------- */

  window.addEventListener("load", () => {

    init();

    // Used a static variable, tempMode, instead of the declared state variable, mode, due to re-rendering issues - an honest small work around.
    document.addEventListener("keydown", (e) => {

      if (e.repeat) return; 

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
      }

    });

    document.addEventListener("keyup", (e) => {
      if (e.repeat) return; 
      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).pianoKey !== "undefined" && tempMode === "piano" && allKeysMap.get(e.keyCode).pressed === true) {
        allKeysMap.get(e.keyCode).pressed = false;
        allKeysMap.get(e.keyCode).pianoKey.classList.remove("pressed");
      }

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).presetKey !== "undefined" && tempMode === "preset" && allKeysMap.get(e.keyCode).pressed === true) {
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
    var specialLines = [];
    //var pianoLines = document.querySelector(".piano-lines");

    const resetPiano = () => {
      changePlaying(1);
      changePlayingSpeed(1);
    }

    resetPiano();

    pianoNotes.current.innerHTML = "";
    firstTempo = null;
    firstTimeSignature = null;
    currentTime = 0;
    startTime = null;
    pianoNotes.current.classList.remove("end");
    
    if (song === null) {playingSong = false; startTime = null;}
    else {playingSong = true; setTimeout(() => {detailHolder.classList.remove("visible");}, 2000);}

    // Executes only when there is a song available and exists.

    if (song !== null){

      startTime = new Date();
      var longestNote = song.notes[0];
      newNote.style.width = `${pianoHolder.getBoundingClientRect().width}px`;

      song.notes.forEach((e, i) => {

        // Simple function to find out the note that we end on, based off length and duration.
        var keycode = e.note;
        
        if (keycode === null && typeof e.tempo !== "undefined") {
          
          if (firstTempo === null) {firstTempo = e.tempo; tempo = e.tempo;}

          var newLine = document.createElement("div");
          newLine.classList.add("line");
          newLine.innerText = e.tempo;
          newLine.style.bottom = `${e.delay * pianoUnit}px`;
          pianoNotes.current.appendChild(newLine);

          specialLines.push({element: newLine, tempo: e.tempo, delay: e.delay});

          return;

        } else if (keycode === null && typeof e.timeSignature !== "undefined"){

          if (firstTimeSignature === null) {firstTimeSignature = e.timeSignature; timeSignature = e.timeSignature;}

          var newSignature = document.createElement("div");
          newSignature.classList.add("time-signature");
          newSignature.innerText = e.timeSignature;
          newSignature.style.bottom = `${e.delay * pianoUnit}px`;
          pianoNotes.current.appendChild(newSignature);

          specialLines.push({element: newSignature, timeSignature: e.timeSignature, delay: e.delay});

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

      var startPosition = pianoHolder.getBoundingClientRect().top * -1 - (pianoUnit * 3);

      currentTime = startPosition;
      newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;
      pianoNotes.current.style.transform = `translateY(${currentTime}px)`;
      pianoNotes.current.style.height = `${((parseFloat(longestNote.delay) + parseFloat(longestNote.length)) * pianoUnit)}px`;

      // The actual looping portion of the Playing Song function.

      const startPlaying = () => {

        if (playingSong !== false && currentTime < pianoNotes.current.clientHeight){
          
          specialLines.forEach((e, i) => {
            
            var element = e.element;
            var bounds = element.getBoundingClientRect().bottom;
            if (typeof e.tempo !== "undefined" && bounds >= pianoHolder.getBoundingClientRect().top){
              tempo = e.tempo
              specialLines.splice(i, 1);
            } else if (typeof e.timeSignature !== "undefined" && bounds >= pianoHolder.getBoundingClientRect().top){
              timeSignature = parseFloat(e.timeSignature);
              specialLines.splice(i, 1);
            }

          });

          currentTime += (pianoUnit * getTimeDifference() * playing * playingSpeed * timeSignature * tempo/60);
          pianoNotes.current.style.transform = `translateY(${currentTime}px)`;
        } else if (playingSong === false || currentTime >= pianoNotes.current.clientHeight) {
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

        <div className={`notes-holder${playingState === 0 ? " paused" : ""}`}>
          <div ref={pianoNotes} className="piano-notes"></div>
        </div>

        <div className="piano-holder">

          <div className="piano">
          </div>

          <div className={`song-buttons${song !== null ? " visible" : ""}`}>
            <div className="song-button" onClick={() => {playingState === 0 ? changePlaying(1) : changePlaying(0);}}>{playingState === 0 ? playingIcon : pauseIcon}</div>
            <div className="song-button" onClick={() => {playingSong = false; setSong(null); pianoNotes.current.classList.remove("visible");}}>{endIcon}</div>
            {
            //<div className="song-button" onClick={() => {if (pianoUnit === 128) pianoUnit = 176; else if (pianoUnit === 176) pianoUnit = 80; else pianoUnit = 128;}}>{sizeIcon}</div>
            }
            <div className="song-button playback" onClick={() => {if (playingSpeedState === 1) changePlayingSpeed(2); else if (playingSpeedState === 2) changePlayingSpeed(0.5); else changePlayingSpeed(1);}}>
              {playingSpeedState === 2 && doubleSpeed}
              {playingSpeedState === 1 && normalSpeed}
              {playingSpeedState === 0.5 && halfSpeed}
            </div>
          </div>

          <div className={`song-search${song !== null ? " hidden" : ""}`}>
            <div className="searchbar-holder">
              <input className="searchbar" placeholder="Search songs & artists" onFocus={() => {
                searchResults.classList.remove("hidden");
                pianoContainer.classList.add("faded");

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
              }} onBlur={() => {searchResults.classList.add("hidden"); pianoContainer.classList.remove("faded");}} onInput={() => {
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
            <div className="song-title">{song !== null ? song.title : ""}</div>
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

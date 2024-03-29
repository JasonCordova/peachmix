import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import Knob from './Knob.js';
import ModeElement from './ModeElement.js';
import AudioWave from './AudioWave.js';
import animation from './animation.js';
import songs from './songs.js';

const logo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M10 2C15.27.5 23.33.12 27.89 3.65c1.86 1.44 4.29 4.39 3.43 6.93-.89 2.62-5.01 3.15-7.32 2.8C17.64 12.43 12.89 7.37 10 2Zm25 10c6.05 0 10.91-.74 15.96 3.39C63.5 25.64 60.44 48.11 46 55c4.12-12.59 4.98-26.19-4.33-36.96L35 12Zm-19 2.11c4.85-.16 5.23 1.28 9 1.41 5.15.17 8.97-4.14 15.47 3.57C49.53 29.84 50.92 60 33 62.79 17.71 65.17-1.18 44.85 7.26 24c1.97-4.87 3.89-7.71 8.74-9.89Z"/></svg>;

const upload = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221 215"><path d="M95 58 69 85c-2.76 2.76-10.01 10.5-13 12.12-2.16.93-4.75.99-7 0C44.23 95.47 34.24 85.11 33.28 80c-1.08-5.72 3.22-10.14 6.81-14l16.87-17L67 38l26-27c5.68-5.67 9.34-10.2 18-9.94 9.11.27 15.11 7.92 20.99 13.94L171 56c4.41 4.41 15.49 14.23 16.7 20 1.71 8.22-13.4 24.34-21.7 21.4-3.95-1.4-15.37-13.75-19-17.4l-21-22v78c-.01 3.19.29 6.97-1.89 9.57-4 4.78-23.22 4.78-27.22 0-2.18-2.6-1.88-6.38-1.89-9.57V58ZM6.02 132.74c4.52-1.11 9.33-.8 13.98-.74 21.08.29 7.18 27.05 13.69 40 4.6 9.15 13.2 9.99 22.31 10h109c4.08-.01 6.97-.03 11-1.04 16.76-4.23 12.85-22.91 13-35.96.05-3.9.17-7.72 3.28-10.57 3.62-3.32 11.94-2.49 16.72-2.43 11.07.16 11.99 5.4 12 15v21c0 14.26.97 25.96-10.04 36.96-3.32 3.33-6.48 5.74-10.96 7.28-4.84 1.67-8 1.75-13 1.76H34c-4.75-.01-7.35-.02-12-1.44C-1.94 205.22 0 180.82 0 161c0-5.25-.78-19.93 1.31-23.96 1.34-2.57 2.35-2.98 4.71-4.3Z"/></svg>;
const piano = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1064 1064"><path d="M24 1.07h1002c12.32-.07 19.6-.9 28.91 8.95 3.26 3.44 5.25 6.43 6.65 10.98 1.42 4.65 1.43 7.25 1.44 12v999c-.09 19.13-11.91 30.97-31 31H38c-12.32 0-19.6.83-28.91-9.02-3.26-3.44-5.25-6.43-6.65-10.98-1.42-4.65-1.43-7.25-1.44-12V41C1 28.6-.21 19.85 9.09 10.02 13.84 4.99 17.37 3.04 24 1.07ZM193 60H60v944h192V665h-26c-21.95-.03-32.97-16.37-33-37V60Zm250 0h-73v565c-.03 20.4-8.95 39.89-32 40h-27v339h191V665h-25c-5.3-.01-10.08-.27-15-2.55-15.2-7.06-18.98-26.39-19-41.45V60Zm251 0h-73v561c-.03 21.17-6.76 43.88-32 44h-27v339h191V665h-26c-23.77-.04-32.97-18.62-33-40V60Zm310 0H871v568c-.02 13.59-6.29 30.21-20 35.44-4.09 1.56-7.72 1.55-12 1.56h-27v339h192V60Z"/></svg>;
const preset = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 216"><path d="M142 .66c7.31-1.17 11.15 2.22 12.75 9.34v189c.25 2.57.33 5.51 0 8-.61 1.34-1.12 2.77-1.84 3.96-6.51 10.75-16.8 1.51-22.91-3.91l-43-37.2c-3.71-3.27-12.81-11.93-17-13.29-2.05-.67-4.83-.56-7-.56H25c-4.57 0-14.18.6-17.98-1.31C.96 151.65 1.01 146.86 1 141V74c.02-12.14 4.08-14.94 16-15h47c2.12 0 5 .09 7-.51 4.55-1.36 13.95-10.59 18-14.07l33-28.55C127.65 11 135.28 3.42 142 .66Zm88.99.92c8.14-1.1 10.99 3.31 15.29 9.42C252.14 19.33 259 30.66 263 40c19.36 45.18 19.15 94.05-.86 139-3.26 7.33-15.69 28.99-21.31 33.57-6.91 5.63-17.91.94-16.59-8.57.62-4.48 6.11-11 8.76-15 5.59-8.44 10.53-17.55 14.19-27 15.9-41.05 13.16-87.79-9.2-126l-7-11c-5.35-7.74-13.44-18.1 0-23.42Zm-25.99 26c8.01-1.03 10.67 3.34 14.66 9.42 5.79 8.83 9.01 15.11 12.66 25 12.18 33.03 11.37 65.44-1.92 98-2.76 6.74-7.34 14.94-11.4 21-2.38 3.54-4.51 6.84-9 7.72-7.98 1.56-13.63-5.05-11.35-12.72 1.11-3.77 5.34-9.27 7.48-13 3.8-6.66 6.93-13.73 9.36-21 10.65-32 5.29-65.98-13.16-94-5.03-7.65-8.57-15.98 2.67-20.42Zm-28 28.11c10.33-1.27 14.74 10.4 18.13 18.31 8.6 20.1 8.8 45.63 1.06 66-2.88 7.57-8.05 22.29-18.19 20.76-6.86-1.04-9.09-7.73-7.36-13.76l5.74-12c3.13-7.44 5.89-19.95 5.58-28-.33-8.45-2.98-19.28-6.4-27l-5.91-12c-1.63-6.23 1.93-10.1 7.35-12.31Z"/></svg>;

const pauseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 384"><path d="M9 .57 35 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17H15c-11.39-.14-14.95-5.11-15-16V15C.09 7.52 1.63 3.47 9 .57Zm160 0L195 0h45c12.78.06 15.98 4.81 16 17v350c-.02 13.19-3.81 16.98-17 17h-64c-11.39-.14-14.95-5.11-15-16V15c.09-7.48 1.63-11.53 9-14.43Z"/></svg>;
const endIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 0h16v16H0Z"/></svg>;
const rotateIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M50 16.15h180c25.26-.11 41.96 16.59 42 41.85v396c-.04 25.26-16.74 41.96-42 42H58c-25.26-.04-41.96-16.74-42-42V77c0-22.37-2.65-43.82 21-56.22 5.17-2.7 7.37-3.29 13-4.63ZM80 32c-17.22 0-40.34-4.24-46.95 17-1.16 3.73-1.04 6.19-1.05 10v394c.02 12.09 4.58 22.08 17 25.95 3.73 1.16 6.19 1.04 10 1.05h171c17.02-.08 25.97-10.4 26-27V58c-.05-9.48-2.79-16.65-11-22.15-8.6-5.76-26.57-3.85-37-3.85 0 12.02-.68 15.98-14 16H94c-9.44-.02-13.85-1.46-14-12v-4Zm243 51 8.62 12c2 2.72 4.17 5.44 4.17 9-.01 5.67-5.5 9.28-10.75 7.26-3.41-1.32-6.01-5.42-8.17-8.26l-16.83-22c-2.5-3.4-5.03-7.55-3.3-11.91 1.32-3.31 6.4-6.57 9.26-8.72l26-18.92c6.89-3.09 12.71 3 11.53 8.55-1.16 5.41-13.64 13.48-18.53 16 8.41 3.52 20.39 3.87 41 13.31 33.36 15.28 59.7 39.44 77.3 71.69 4.46 8.16 9.64 18.96 11.7 28h2c1.45-4.98 6.54-15.34 12.01-16.53 5.27-1.14 11.13 4 9.01 10.53l-15.87 28c-1.86 3.24-4.7 9-8.24 10.4-4.54 1.79-9.1-.98-12.91-3.12l-27-15.9c-3.71-2.35-7.36-5.42-6.34-10.36 2.2-10.69 14.02-4.16 19.34-1.03l14 8.01c-2-8.79-5.74-16.97-9.75-25-15.75-31.5-42.79-57.54-75.25-71.42-9.35-4-22.91-8.75-33-9.58Zm0-1h-1l1 1v-1Zm157 222c0-17.7 3.85-40.15-18-46.95-3.73-1.16-6.19-1.04-10-1.05H309c-2.77 0-6.43.21-8.89-1.17-4.82-2.72-5.26-9.78-.88-13.09 2.68-2.03 6.58-1.73 9.77-1.74h145c25.26.04 41.96 16.74 42 42v172c-.04 25.26-16.74 41.96-42 42H293c-3.19-.01-7.09.29-9.77-1.74-4.38-3.31-3.94-10.37.88-13.09 2.46-1.38 6.12-1.17 8.89-1.17h161c14.98-.18 25.82-11.02 26-26v-22c-11.88 0-15.98.64-16-13V317c.02-13.64 4.12-13 16-13Z"/></svg>;
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

var selectedImport = null;

var tempo = 60;
var timeSignature = 4/4;
var currentTime = 0;
var startTime = null; // Starting clock for determining Piano Song note position
var tick = 150;
var playingSong = false;

const allSharps = [];

var mouseDown = false;
var tempMode = "menu";

function Snake(){
  this.head = {x: 0, y: 0};
  this.length = 1;
  this.direction = {x: 1, y: 0}
  this.body = [
    {x: 0, y: 1},
  ]
}

function Food(x, y){
  this.x = x;
  this.y = y;
}

var player = new Snake();
var food = new Food(5, 5);

var snakeMap = [];
var spotAvailable = [];
var snakeTickInterval = 1000 / 4;
var allKeysMap = new Map();

allKeysMap.set(49, {character: '1', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "blue"});
allKeysMap.set(50, {character: '2', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "blue"});
allKeysMap.set(51, {character: '3', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "blue"});
allKeysMap.set(52, {character: '4', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "blue", mode: "oneshot"});
allKeysMap.set(53, {character: '5', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "blue", mode: "oneshot"});
allKeysMap.set(54, {character: '6', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "blue", mode: "oneshot"});
allKeysMap.set(55, {character: '7', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "red", mode: "oneshot"});
allKeysMap.set(56, {character: '8', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "red"});
allKeysMap.set(57, {character: '9', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "red"});
allKeysMap.set(48, {character: '0', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "red"});
allKeysMap.set(81, {character: 'Q', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "red"});
allKeysMap.set(87, {character: 'W', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "red"});
allKeysMap.set(69, {character: 'E', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "green"});
allKeysMap.set(82, {character: 'R', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "green", mode: "oneshot"});
allKeysMap.set(84, {character: 'T', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "green", mode: "oneshot"});
allKeysMap.set(89, {character: 'Y', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "green", mode: "oneshot"});
allKeysMap.set(85, {character: 'U', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "green", mode: "oneshot"});
allKeysMap.set(73, {character: 'I', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "green"});
allKeysMap.set(79, {character: 'O', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "purple"});
allKeysMap.set(80, {character: 'P', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "purple"});
allKeysMap.set(65, {character: 'A', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "purple"});
allKeysMap.set(83, {character: 'S', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "purple"});
allKeysMap.set(68, {character: 'D', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "purple"});
allKeysMap.set(70, {character: 'F', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "purple", mode: "oneshot"});
allKeysMap.set(71, {character: 'G', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "pink", mode: "oneshot"});
allKeysMap.set(72, {character: 'H', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "pink", mode: "oneshot"});
allKeysMap.set(74, {character: 'J', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "pink", mode: "oneshot"});
allKeysMap.set(75, {character: 'K', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "pink"});
allKeysMap.set(76, {character: 'L', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "pink"});
allKeysMap.set(90, {character: 'Z', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "pink"});
allKeysMap.set(88, {character: 'X', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(67, {character: 'C', import: false, preset: true, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(86, {character: 'V', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "orange", mode: "oneshot"});
allKeysMap.set(66, {character: 'B', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "orange", mode: "oneshot"});
allKeysMap.set(78, {character: 'N', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "orange", mode: "oneshot"});
allKeysMap.set(77, {character: 'M', import: true, preset: true, pressed: false, clicked: false, touched: false, color: "orange", mode: "oneshot"});
allKeysMap.set(188, {character: ',', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(190, {character: '.', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(186, {character: ';', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(191, {character: '/', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(222, {character: '\'', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});
allKeysMap.set(16, {character: '⇧', import: false, preset: false, pressed: false, clicked: false, touched: false, color: "orange"});

const pianoKeys = [81, 50, 87, 51, 69, 82, 53, 84, 54, 89, 55, 85, 73, 57, 79, 48, 80, 90, 83, 88, 68, 67, 70, 86, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191, 222, 16];

const getPresetFromTouch = function(temp){

  var x = temp.clientX;
  var y = temp.clientY;
  for (var [key, value] of allKeysMap) {
    if (!value.preset) continue;
    var bounds = value.presetKey.getBoundingClientRect();
    if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom){
      return key;
    } else continue;
  }
  return null;

};

const getPianoFromTouch = function(temp){

  var x = temp.clientX;
  var y = temp.clientY;
  for (var [key, value] of allKeysMap) {
    if (!value.pianoKey) continue;
    var bounds = value.pianoKey.getBoundingClientRect();
    if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom){
      return key;
    } else continue;
  }
  return null;

};

const resetPianoTouches = function(temp){

  for (var [key, value] of allKeysMap) {

    if (temp === key) continue;
    allKeysMap.get(key).touched = false;
    if (!value.pianoKey) continue;

    if (!allKeysMap.get(key).pressed && !allKeysMap.get(key).touched && !allKeysMap.get(key).clicked)
          allKeysMap.get(key).pianoKey.classList.remove("pressed");
    
  }

}

const getTimeDifference = function(){

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
  const [selectedImportState, setSelectedImportState] = useState(null); 
  const [currentAudio, setCurrentAudio] = useState("null");
  const pianoNotes = useRef();
  const pianoObject = useRef();
  const launchpadObject = useRef();
  const setMode = function(temp){setSong(null); changeMode(temp); tempMode = temp;}
  const changePlayingSpeed = function(temp){setPlayingSpeedState(temp); playingSpeed = temp;};
  const changePlaying = function(temp){setPlayingState(temp); playing = temp;}
  const changeSelected = function(temp){
    if (typeof allKeysMap.get(selectedImport) !== "undefined") allKeysMap.get(selectedImport).importKey.classList.remove("selected"); 
    selectedImport = temp; setSelectedImportState(temp); 
    if (allKeysMap.get(temp).importKey) allKeysMap.get(temp).importKey.classList.add("selected"); 
    if (allKeysMap.get(selectedImport).importAudio) setCurrentAudio(allKeysMap.get(selectedImport).importAudio.getAttribute("src"));
  }

   const handleFileChange = function(file){
    if (typeof file === "undefined") return;
    if (file.type === "audio/mpeg" || file.type === "audio/wav" || file.type === "audio/ogg"){
      allKeysMap.get(selectedImport).importAudioTitle = file.name;
      allKeysMap.get(selectedImport).importAudio.setAttribute("src", URL.createObjectURL(file));
      allKeysMap.get(selectedImport).importKey.classList.add("loaded");
      setCurrentAudio(allKeysMap.get(selectedImport).importAudio.getAttribute("src"));
    }
  }

  var searchBar = document.querySelector(".searchbar");
  var pianoContainer = document.querySelector(".piano-holder");
  var searchResults = document.querySelector(".search-results");
  const searchIcon = <svg className="search-icon" onClick={function(){searchBar.focus();}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m22.79 23.32 10.85 10.25-10.85-10.25ZM1.98 13.93c0-6.6 5.67-11.96 12.66-11.96 7 0 12.67 5.36 12.67 11.96 0 6.6-5.67 11.95-12.67 11.95-6.99 0-12.66-5.35-12.66-11.95Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/></svg>;

  /* ------------------------ INITIALIZATION FUNCTION ------------------------ */

  const init = function(){

    var temp = 0;
    var pianoHolder = document.querySelector(".piano");
    var launchpad = document.querySelector(".launchpad");
    var importPad = document.querySelector(".import-pad");
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

      var audioFile = require("./SoundPresetsMP3/note" + (temp++ + 1) + ".mp3");
      var audioObject = new Audio(audioFile);
      audioObject.preload = "auto";
      value.presetAudio = audioObject;

      // Small little bug regarding Maps that send a pointer to the last button whenever attempting to make new eventListeners,
      // Instead, pay attention to the next forEach loop, since all eventListeners are made there.
    }

    snakeMap.push(tempRow); // Makes sure to get the last row for the Snake Map.

    allKeysMap.forEach(function(e, i){

      if (!e.preset) return;

      e.presetKey.addEventListener("mousedown", function(){
        e.presetKey.classList.add("pressed");
        e.presetAudio.currentTime = 0;
        e.presetAudio.play();
        e.clicked = true;
      });

      e.presetKey.addEventListener("mouseup", function(){
        e.clicked = false;
        if (!e.pressed && !e.touched && !e.clicked)
          e.presetKey.classList.remove("pressed");
      });

      e.presetKey.addEventListener("mouseenter", function(){
        if (mouseDown === true){
          e.presetKey.classList.add("pressed");
          e.presetAudio.currentTime = 0;
          e.presetAudio.play();
          e.clicked = true;
        }
      });

      e.presetKey.addEventListener("mouseout", function(){
        e.clicked = false;
        if (!e.pressed && !e.touched && !e.clicked)
          e.presetKey.classList.remove("pressed");
      });

      /* ----------- IOS ------------- */

      
      e.presetKey.addEventListener("touchstart", function(){
        if (!e.touched){
          e.touched = true;
          e.presetKey.classList.add("pressed");
          e.presetAudio.currentTime = 0;
          e.presetAudio.play();
        }
      });

      e.presetKey.addEventListener("touchend", function(){
        e.touched = false;
        e.presetKey.classList.remove("pressed");
      });
      

    });

    temp = 0;

    pianoKeys.forEach(function(e, i){
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

      var audioFile = require("./PianoNotesMP3/note" + (i+1) + ".mp3");

      var pianoAudio = new Audio(audioFile);
      pianoAudio.preload = "auto";
      pianoAudio.volume = pianoVolume;
      allKeysMap.get(e).pianoAudio = pianoAudio;

      newKey.addEventListener("mousedown", function(){
        allKeysMap.get(e).clicked = true;
        newKey.classList.add("pressed");
        pianoAudio.currentTime = 0;
        pianoAudio.play();
      });

      newKey.addEventListener("mouseup", function(){
        allKeysMap.get(e).clicked = false;
        if (!allKeysMap.get(e).pressed && !allKeysMap.get(e).touched && !allKeysMap.get(e).clicked)
          newKey.classList.remove("pressed");
      });

      newKey.addEventListener("mouseenter", function(){
        if (mouseDown === true){
          allKeysMap.get(e).clicked = true;
          newKey.classList.add("pressed");
          pianoAudio.currentTime = 0;
          pianoAudio.play();
        }
      });

      newKey.addEventListener("mouseout", function(){
        allKeysMap.get(e).clicked = false;
        if (!allKeysMap.get(e).pressed && !allKeysMap.get(e).touched && !allKeysMap.get(e).clicked)
          newKey.classList.remove("pressed");
      });

      /* ----------- IOS ------------- */

      newKey.addEventListener("touchstart", function(){
        allKeysMap.get(e).touched = true;
        newKey.classList.add("pressed");
        pianoAudio.currentTime = 0;
        pianoAudio.play();
      });

      newKey.addEventListener("touchend", function(){
        allKeysMap.get(e).touched = false;
        if (!allKeysMap.get(e).pressed && !allKeysMap.get(e).touched && !allKeysMap.get(e).clicked)
          newKey.classList.remove("pressed");
      });

    });

    for ([key, value] of allKeysMap) {
      if (!value.import) continue;
      var importButton = document.createElement("div");
      var importSpan = document.createElement("span");
      if (!selectedImport) {
        changeSelected(key);
        importButton.classList.add("selected");
      }
      importSpan.innerText = value.character;
      importButton.appendChild(importSpan);
      importButton.classList.add("button");
      importPad.appendChild(importButton);
      value.importKey = importButton;

      var importAudio = new Audio(null);
      value.importAudio = importAudio;

    }

    allKeysMap.forEach(function(e, i){

      if (!e.import) return;

      e.importKey.addEventListener("mousedown", function(){
        e.importKey.classList.add("pressed");
        changeSelected(i);
        setCurrentAudio(e.importAudio.getAttribute("src"));
        if (e.importAudio.getAttribute("src") !== "null"){e.importAudio.currentTime = 0; e.importAudio.play();}
      });

      e.importKey.addEventListener("mouseup", function(){
        e.importKey.classList.remove("pressed");

        if (e.mode === "gate" || e.mode === "loop"){
          e.importAudio.pause();
          e.importAudio.currentTime = 0;
        }

      });

      e.importKey.addEventListener("touchstart", function(){
        e.importKey.classList.add("pressed");
        if (e.mode === "gate" || e.mode === "loop"){
          e.importAudio.currentTime = 0;
          e.importAudio.play();
        }

      });

      e.importKey.addEventListener("touchend", function(){
        e.importKey.classList.remove("pressed");

        if (e.mode === "gate" || e.mode === "loop"){
          e.importAudio.pause();
          e.importAudio.currentTime = 0;
        }
      });

      e.importKey.addEventListener("mouseenter", function(){
        if (mouseDown === true){
          e.importKey.classList.add("pressed");
          changeSelected(i);
          setCurrentAudio(e.importAudio.getAttribute("src"));
          if (e.importAudio.getAttribute("src") !== "null"){e.importAudio.currentTime = 0; e.importAudio.play();}
        }
      });

      e.importKey.addEventListener("mouseout", function(){
        if (e.importKey.classList.contains("pressed")){
        e.importKey.classList.remove("pressed");
        }

        if (e.mode === "gate" || e.mode === "loop"){
          e.importAudio.pause();
          e.importAudio.currentTime = 0;
        }
        
      });

    });

  }

  /* ------------------------------------------------------------------------- */

  useEffect(function(){

    init();

    launchpadObject.current.addEventListener("touchstart", function(e){e.preventDefault();}, {passive: false});
    launchpadObject.current.addEventListener("touchmove", function(e){

      e.preventDefault();
      var keyFromElement = getPresetFromTouch(e.changedTouches[0]);
      if (keyFromElement !== null){
        if (!allKeysMap.get(keyFromElement).touched){
          allKeysMap.get(keyFromElement).presetKey.classList.add("pressed");
          allKeysMap.get(keyFromElement).presetAudio.currentTime = 0;
          allKeysMap.get(keyFromElement).presetAudio.play();
          allKeysMap.get(keyFromElement).touched = true;
        }
      } else {
        for (var [key, value] of allKeysMap) {
          value.touched = false;
          if (!value.presetKey) continue;
          if (!value.pressed && !value.touched && !value.clicked)
            value.presetKey.classList.remove("pressed");
        }
      }

    }, {passive: false});

    pianoObject.current.addEventListener("touchstart", function(e){e.preventDefault();}, {passive: false});
    pianoObject.current.addEventListener("touchmove", function(e){

      e.preventDefault();
      var keyFromElement = getPianoFromTouch(e.changedTouches[0]);
      if (keyFromElement !== null){
        resetPianoTouches(keyFromElement);
        if (!allKeysMap.get(keyFromElement).touched){
          allKeysMap.get(keyFromElement).pianoKey.classList.add("pressed");
          allKeysMap.get(keyFromElement).pianoAudio.currentTime = 0;
          allKeysMap.get(keyFromElement).pianoAudio.play();
          allKeysMap.get(keyFromElement).touched = true;
        }
      } else {
        for (var [key, value] of allKeysMap) {
          e.touched = false;
          if (!value.pianoKey) continue;
          if (!value.pressed && !value.touched && !value.clicked)
            value.pianoKey.classList.remove("pressed");
        }
      }

    }, {passive: false});

    // Used a static variable, tempMode, instead of the declared state variable, mode, due to re-rendering issues - an honest small work around.
    document.addEventListener("keydown", function(e){

      if (e.repeat) return; 

      // PRESET MODE

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).presetKey !== "undefined" && tempMode === "preset" && allKeysMap.get(e.keyCode).pressed === false) {
        allKeysMap.get(e.keyCode).pressed = true;
        allKeysMap.get(e.keyCode).presetKey.classList.add("pressed"); 
        allKeysMap.get(e.keyCode).presetAudio.currentTime = 0; 
        allKeysMap.get(e.keyCode).presetAudio.play();
      }

      if (e.keyCode === 37) {player.direction.x = -1; player.direction.y = 0;}
      else if (e.keyCode === 38) {player.direction.x = 0; player.direction.y = -1;}
      else if (e.keyCode === 39) {player.direction.x = 1; player.direction.y = 0;}
      else if (e.keyCode === 40) {player.direction.x = 0; player.direction.y = 1;}

      // PIANO KEYS
      if (!document.activeElement.classList.contains("searchbar") && allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).pianoKey !== "undefined" && tempMode === "piano" && allKeysMap.get(e.keyCode).pressed === false) {
        allKeysMap.get(e.keyCode).pressed = true;
        allKeysMap.get(e.keyCode).pianoKey.classList.add("pressed"); 
        allKeysMap.get(e.keyCode).pianoAudio.currentTime = 0; 
        allKeysMap.get(e.keyCode).pianoAudio.play();
      }

      // IMPORT KEYS

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).importKey !== "undefined" && tempMode === "import" && allKeysMap.get(e.keyCode).pressed === false) {

        for (var [key, value] of allKeysMap) {
          if (!value.import) continue;
          if (value.importAudio.getAttribute("src") !== "null") value.importKey.classList.add("loaded");
        }

        allKeysMap.get(e.keyCode).pressed = true;
        changeSelected(e.keyCode);

        if (allKeysMap.get(e.keyCode).importAudio.getAttribute("src") !== "null"){
          allKeysMap.get(e.keyCode).importKey.classList.add("pressed"); 
          allKeysMap.get(e.keyCode).importAudio.currentTime = 0;
          allKeysMap.get(e.keyCode).importAudio.play();
        }

      }

    }, false);

    document.addEventListener("keyup", function(e){

      if (e.repeat) return; 

      // PIANO MODE

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).pianoKey !== "undefined" && tempMode === "piano") {
        allKeysMap.get(e.keyCode).pressed = false;
        if (!allKeysMap.get(e.keyCode).pressed && !allKeysMap.get(e.keyCode).touched && !allKeysMap.get(e.keyCode).clicked)
          allKeysMap.get(e.keyCode).pianoKey.classList.remove("pressed");
      }

      // PRESET MODE

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).presetKey !== "undefined" && tempMode === "preset") {
        allKeysMap.get(e.keyCode).pressed = false;
        if (!allKeysMap.get(e.keyCode).pressed && !allKeysMap.get(e.keyCode).touched && !allKeysMap.get(e.keyCode).clicked)
          allKeysMap.get(e.keyCode).presetKey.classList.remove("pressed");
      }

      // IMPORT KEYS

      if (allKeysMap.get(e.keyCode) && typeof allKeysMap.get(e.keyCode).importKey !== "undefined" && tempMode === "import") {
        allKeysMap.get(e.keyCode).pressed = false;
        if (!allKeysMap.get(e.keyCode).pressed && !allKeysMap.get(e.keyCode).touched && !allKeysMap.get(e.keyCode).clicked)
          allKeysMap.get(e.keyCode).importKey.classList.remove("pressed"); 
        if (allKeysMap.get(e.keyCode).mode === "gate" || allKeysMap.get(e.keyCode).mode === "loop"){
          allKeysMap.get(e.keyCode).importAudio.pause();
          allKeysMap.get(e.keyCode).importAudio.currentTime = 0;
        } else if (allKeysMap.get(e.keyCode).mode === "oneshot"){

        }
      }

    });

      document.addEventListener("mousedown", function(event){
        if (event.button === 0) mouseDown = true;
      });
      document.addEventListener("mouseup", function(event){
        if (event.button === 0) mouseDown = false;
      });

      window.addEventListener("blur", function(){
        mouseDown = false;

        for (var [key, value] of allKeysMap) {
          if (value.presetKey) value.presetKey.classList.remove("pressed");
          if (value.pianoKey) value.pianoKey.classList.remove("pressed");
          if (value.importKey) value.importKey.classList.remove("pressed");
          value.pressed = false;
          value.clicked = false;
          value.touched = false;
        }

      });

  }, []);

  /* ------------------------------------------------------------------------- */

  const snakeWin = function(){
    snakeMap.forEach(function(e){
      e.forEach(function(j){
        j.classList.remove("snake");
        j.classList.remove("food");
        j.classList.remove("body");
      });
    });
    clearTimeout(snakeTick);
    snakeMap.forEach(function(e){
      e.forEach(function(j){
        j.classList.add("snake");
      });
    });
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("snake");
        });
      });
    }, 500);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.add("snake");
        });
      });
    }, 1000);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("snake");
        });
      });
    }, 1500);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.add("snake");
        });
      });
    }, 2000);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("snake");
        });
      });
      setPlaySnake(false);
    }, 2500);
  }

  const snakeLose = function(){
    snakeMap.forEach(function(e){
      e.forEach(function(j){
        j.classList.remove("snake");
        j.classList.remove("food");
        j.classList.remove("body");
      });
    });
    clearTimeout(snakeTick);
    snakeMap.forEach(function(e){
      e.forEach(function(j){
        j.classList.add("food");
      });
    });
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("food");
        });
      });
    }, 500);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.add("food");
        });
      });
    }, 1000);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("food");
        });
      });
    }, 1500);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.add("food");
        });
      });
    }, 2000);
    setTimeout(function(){
      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("food");
        });
      });
      setPlaySnake(false);
    }, 2500);
  }

  const snakeTick = function(){ 

    if ((player.head.y + player.direction.y) >= 0 && (player.head.y + player.direction.y) < snakeMap.length && (player.head.x + player.direction.x) >= 0 && (player.head.x + player.direction.x) < snakeMap[0].length){
      
      if (player.head.y + player.direction.y === food.y && food.x === player.head.x + player.direction.x) { // WHEN EAT THE FOOD
        player.body.push({x: player.head.x, y: player.head.y});
        player.length++;

        if (player.length === 36) {snakeWin(); return;}

        spotAvailable = [];

        snakeMap.forEach(function(row, yPos){
          row.forEach(function(element, xPos){
            
            if (element.classList.contains("snake") || element.classList.contains("body") || element.classList.contains("food")){}
            else {
              spotAvailable.push({x: xPos, y: yPos});
            }

          });
        });

        var newFood = spotAvailable[Math.floor(Math.random() * spotAvailable.length)];
        food = new Food(newFood.x, newFood.y);
      } else {
        player.body.push({x: player.head.x, y: player.head.y});
        player.body.splice(0, 1);
      }
      
      player.head.x += player.direction.x;
      player.head.y += player.direction.y;

      if (snakeMap[player.head.y][player.head.x].classList.contains("body")){
        snakeLose();
        return;
      }

      snakeMap.forEach(function(e){
        e.forEach(function(j){
          j.classList.remove("snake");
          j.classList.remove("body");
          j.classList.remove('food');
        });
      });

      snakeMap[player.head.y][player.head.x].classList.add("snake");

      player.body.forEach(function(e){
        snakeMap[e.y][e.x].classList.add("body");
      })

      snakeMap[food.y][food.x].classList.add("food");

      setTimeout(function(){
        snakeTick();
      }, snakeTickInterval);

    } else snakeLose();

  }

  useEffect(function(){

    if (playSnake){ // Enter the Snake Minigame

      food = new Food(5, 5);
      snakeMap[food.y][food.x].classList.add("food");

      player.head.x = 0;
      player.head.y = 0;
      player.direction.x = 1;
      player.direction.y = 0;
      player.length = 1;
      player.body = [];
      snakeMap[player.head.y][player.head.x].classList.add("snake");

      setTimeout(function(){
        snakeTick();
      }, snakeTickInterval);

    }

  }, [playSnake]);

// PIANO NOTE PLAYING ----- PLAYING A SONG FUNCTION

  useEffect(function(){

    var pianoHolder = document.querySelector(".piano");
    var newNote = document.querySelector(".notes-holder");
    var detailHolder = document.querySelector(".song-details");
    var specialLines = [];
    //var pianoLines = document.querySelector(".piano-lines");

    const resetPiano = function(){
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
    else {playingSong = true; setTimeout(function(){detailHolder.classList.remove("visible");}, 2000);}

    // Executes only when there is a song available and exists.

    if (song !== null){

      startTime = new Date();
      var longestNote = song.notes[0];
      newNote.style.width = `${pianoHolder.getBoundingClientRect().width}px`;

      song.notes.forEach(function(e, i){

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

      const startPlaying = function(){

        if (playingSong !== false && currentTime < pianoNotes.current.clientHeight){
          
          specialLines.forEach(function(e, i){
            
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

        setTimeout(function(){
          requestAnimationFrame(startPlaying);
        }, 1000/tick);
        
      }

      // Initiating the loop for the first time, exits if doesn't work out.
      requestAnimationFrame(startPlaying);

    }

    window.addEventListener("resize", function(){newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});
    return function(){window.removeEventListener("resize", function(){newNote.style.height = `${pianoHolder.getBoundingClientRect().top}px`;});}

  }, [song]);

// --------------------------------------------------------------------

/* -------------------------------------------------------------- */
  useLayoutEffect(function(){animation();}, []); 
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
        <span className="logo" onClick={function(){setMode("menu");}}>Peach<span className="bold">Mix</span></span>
        <span className='text'>Not responsive yet - JC</span>
      </div>

      <div className="page-holder">

      <div className={`main-page${mode !== "menu" ? " hidden" : " visible"}`}>

        <span className="main-text">Choose from one of the following modes</span>

        <div className="mode-selection">
          <div className="mode-button" onClick={function(){setMode("preset");}}>{preset}<span>Sound Presets</span></div>
          <div className="mode-button" onClick={function(){setMode("piano");}}>{piano}<span>Piano Mode</span></div>
          <div className="mode-button" onClick={function(){setMode("import");}}>{upload}<span>Import Audio</span></div>
        </div>

      </div>

      <div className={`launchpad-page page${mode === "preset" ? " visible" : ""}`}>
        <div ref={launchpadObject} className={`launchpad${playSnake ? " minigame" : ""}`} onTouchEnd={function(){

          for (var [key, value] of allKeysMap) {
            value.touched = false;
            if (!value.presetKey) continue;
            if (!value.pressed && !value.touched && !value.clicked)
              value.presetKey.classList.remove("pressed");
          }

        }}>
          <div className="launchpad-logo" onClick={function(){setPlaySnake(!playSnake);}}>{logo}</div>
        </div>
      </div>

      <div className={`piano-page page${mode === "piano" ? " visible" : ""}`}>

        <div className="page-message-piano">
          {rotateIcon}
          <span>Rotate your phone or enlarge screen to see this panel.</span>
        </div>

        <div className={`notes-holder${playingState === 0 ? " paused" : ""}`}>
          <div ref={pianoNotes} className="piano-notes"></div>
        </div>

        <div className="piano-holder">

          <div ref={pianoObject} className="piano" onTouchEnd={function(){

            for (var [key, value] of allKeysMap) {
              value.touched = false;
              if (!value.pianoKey) continue;
              if (!value.pressed && !value.touched && !value.clicked)
                value.pianoKey.classList.remove("pressed");
            }

            }}></div>

          <div className={`song-buttons${song !== null ? " visible" : ""}`}>
            <div className="song-button" onClick={function(){playingState === 0 ? changePlaying(1) : changePlaying(0);}}>{playingState === 0 ? playingIcon : pauseIcon}</div>
            <div className="song-button" onClick={function(){playingSong = false; setSong(null); pianoNotes.current.classList.remove("visible");}}>{endIcon}</div>
            {
            //<div className="song-button" onClick={function(){if (pianoUnit === 128) pianoUnit = 176; else if (pianoUnit === 176) pianoUnit = 80; else pianoUnit = 128;}}>{sizeIcon}</div>
            }
            <div className="song-button playback" onClick={function(){if (playingSpeedState === 1) changePlayingSpeed(2); else if (playingSpeedState === 2) changePlayingSpeed(0.5); else changePlayingSpeed(1);}}>
              {playingSpeedState === 2 && doubleSpeed}
              {playingSpeedState === 1 && normalSpeed}
              {playingSpeedState === 0.5 && halfSpeed}
            </div>
          </div>

          <div className={`song-search${song !== null ? " hidden" : ""}`}>
            <div className="searchbar-holder">
              <input className="searchbar" placeholder="Search songs & artists" onFocus={function(){
                searchResults.classList.remove("hidden");
                pianoContainer.classList.add("faded");

                var text = searchBar.value.toUpperCase();
                var results = [];
                songs.forEach(function(song){
                  if (song.title === null && song.artist !== null){if (song.artist.toUpperCase().includes(text) || text.includes(song.artist.toUpperCase())) results.push(song);}
                  else if (song.title !== null && song.artist === null){if (song.title.toUpperCase().includes(text) || text.includes(song.title.toUpperCase())) results.push(song);}
                  else if (song.title !== null & song.artist !== null){if (song.title.toUpperCase().includes(text) || song.artist.toUpperCase().includes(text) || text.includes(song.title.toUpperCase()) || text.includes(song.artist.toUpperCase())) results.push(song);}
                });

                searchResults.innerHTML = "";
                
                results.forEach(function(result){
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

                  search.addEventListener("click", function(){
                    setSong(result);
                  });

                });
              }} onBlur={function(){searchResults.classList.add("hidden"); pianoContainer.classList.remove("faded");}} onInput={function(){
                var text = searchBar.value.toUpperCase();
                var results = [];
                songs.forEach(function(song){
                  if (song.title === null && song.artist !== null){if (song.artist.toUpperCase().includes(text) || text.includes(song.artist.toUpperCase())) results.push(song);}
                  else if (song.title !== null && song.artist === null){if (song.title.toUpperCase().includes(text) || text.includes(song.title.toUpperCase())) results.push(song);}
                  else if (song.title !== null & song.artist !== null){if (song.title.toUpperCase().includes(text) || song.artist.toUpperCase().includes(text) || text.includes(song.title.toUpperCase()) || text.includes(song.artist.toUpperCase())) results.push(song);}
                });

                searchResults.innerHTML = "";
                
                results.forEach(function(result) {
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

                  search.addEventListener("click", function(){
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

      <div className={`import-page page${mode === "import" ? " visible" : ""}`}>

        <div className="page-message">
          {rotateIcon}
          <span>Rotate your phone or enlarge screen to see this panel.</span>
        </div>
        <div className="key-tube">
          <div className="import-pad">
            <div className="launchpad-logo" onClick={function(){
              for (var [key, value] of allKeysMap) {
                if (!value.import) continue;
                value.importAudio.pause();
                value.importAudio.currentTime = 0;
              }
            }}>{logo}</div>
          </div>
          <div className="audio-details">
            <input multiple={false} className="ghst-input" type="file" accept="audio/mpeg, audio/wav, audio/ogg" onChange={function(e){if (e.target.files[0] !== null) {var file = e.target.files[0]; handleFileChange(file); }}}></input>
            
            {currentAudio !== "null" ? 
              <div className="audio-options">

                <span className="audio-title">{allKeysMap.get(selectedImportState).importAudioTitle}</span>

                <AudioWave current={selectedImportState} element={allKeysMap.get(selectedImportState).importAudio}/>

                <div className="row">
                  <Knob current={selectedImportState} element={allKeysMap.get(selectedImportState).importAudio} type={"volume"} min={0.0} max={1.0} default={allKeysMap.get(selectedImportState).importAudio.volume} label={"Volume"}/>

                  <Knob current={selectedImportState} element={allKeysMap.get(selectedImportState).importAudio} type={"speed"} min={0.25} max={4.0} default={allKeysMap.get(selectedImportState).importAudio.playbackRate} label={"Speed"}/>

                  <ModeElement current={selectedImportState} element={allKeysMap.get(selectedImportState)}/>
                </div>

              </div> 
              :
              <div className="drag-input" onClick={function(){var button = document.querySelector(".ghst-input"); button.click();}} 
              onDragOver={function(e){e.preventDefault();}}
              onDragStart={function(e){e.preventDefault();}}
              onDrop={function(e){e.preventDefault(); var file = e.dataTransfer.files[0]; handleFileChange(file); }}
              onDragEnd={function(e){e.preventDefault(); e.stopPropagation();}}>
                {upload}
                <div>Click or drag to input an audio clip.</div>
              </div>
            }
          
          </div>

        </div>

      </div>

      </div>

    </>
  );
}

export default App;

"use strict";
const path = require("path");
const playSound = (animalSymbol, soundFile, ...args) => {
    console.log(`${animalSymbol}: `, ...args);
    const soundFilePath = path.join(__dirname, "sounds", soundFile);
    playAudioFile.sound(soundFilePath);
};
const sayMeow = (...args) => {
    const randomNumberFrom1To5 = Math.floor(Math.random() * 5) + 1;
    playSound("🐱", `elsa-${randomNumberFrom1To5}.mp3`, ...args);
};
const bark = (...args) => playSound("🐶", "dog-bark.mp3", ...args);
const bark2 = (...args) => playSound("🐕", "dog-barks-2.wav", ...args);
const moo = (...args) => playSound("🐮", "cow-moos.wav", ...args);
const manyMoos = (...args) => playSound("🐮🐮🐮🐮", "many-moos.mp3", ...args);
const snort = (...args) => playSound("🐴", "horse-snort.mp3", ...args);
const cluck = (...args) => playSound("🐔", "chicken-click.mp3", ...args);
const longMeow = (...args) => playSound("🐈🐾", "cat-meow.mp3", ...args);
const trumpet = (...args) => playSound("🐘", "elephant-trumpets.mp3", ...args);
module.exports = {
    bark,
    bark2,
    cluck,
    longMeow,
    meow: sayMeow,
    mew: sayMeow,
    moo,
    manyMoos,
    snort,
    trumpet,
};
const playAudioFile = {
    sound: function (file) {
        console.log(file);
        const e = document.getElementById(file);
        console.log(e);
        const alarmElement = document.getElementById("alarm");
        if (alarmElement)
            alarmElement.remove();
        if (e) {
            e.volume = 0.2;
            e.autoplay = true;
            document.body.appendChild(e);
        }
    },
};
if (typeof exports !== "undefined") {
    // not the browser, worst env check ever
    const http = require("http");
    const spawn = require("child_process").spawn;
    playAudioFile.playerList = ["afplay", "play"];
    playAudioFile.sound = function (file) {
        var _a;
        if (((_a = playAudioFile.playerList) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            // console.log("No suitable audio player could be found - exiting.".red)
            return true;
        }
        const command = ["-v", "0.2", file];
        // console.log("playing".magenta + "=>".yellow + file.cyan)
        if (playAudioFile.playerList) {
            const child = spawn(playAudioFile.playerList[0], command);
            child.stderr.setEncoding("ascii");
            child.on("exit", function (code, signal) {
                if (code == null || signal != null || code === 1) {
                    // console.log("couldnt play, had an error " + "[code: " + code + "] " + "[signal: " + signal + "]")
                }
                else if (code === 127) {
                    if (playAudioFile.playerList) {
                        playAudioFile.playerList.shift();
                        playAudioFile.sound(file);
                    }
                }
                else if (code === 2) {
                    // console.log(file.cyan + "=>".yellow + "could not be read by your player.".red)
                }
                else {
                    // console.log("completed".green + "=>".yellow + file.magenta)
                }
            });
        }
    };
}
// ! in case we'd want to override the console object fr:
// const soundMap = {
//   bark,
//   bark2,
//   cluck,
//   longMeow,
//   meow: sayMeow,
//   mew: sayMeow,
//   moo,
//   manyMoos,
//   snort,
//   trumpet,
// }
// console.dog = (sound, ...args) => {
//   if (typeof soundMap[sound] === "function") {
//     soundMap[sound](...args)
//   } else {
//     console.error(`Sound function ${sound} not found`)
//   }
// }

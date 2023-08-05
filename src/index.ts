const path = require("path");

const playSound = (animalSymbol: string, soundFile: string, ...args: any[]): void => {
  console.log(`${animalSymbol}: `, ...args);
  const soundFilePath = path.join(__dirname, "sounds", soundFile);
  playAudioFile.sound(soundFilePath);
};

const sayMeow = (...args: any[]): void => {
  const randomNumberFrom1To5 = Math.floor(Math.random() * 5) + 1;
  playSound("🐱", `elsa-${randomNumberFrom1To5}.mp3`, ...args);
};

const bark = (...args: any[]): void => playSound("🐶", "dog-bark.mp3", ...args);
const bark2 = (...args: any[]): void => playSound("🐕", "dog-barks-2.wav", ...args);
const moo = (...args: any[]): void => playSound("🐮", "cow-moos.wav", ...args);
const manyMoos = (...args: any[]): void => playSound("🐮🐮🐮🐮", "many-moos.mp3", ...args);
const snort = (...args: any[]): void => playSound("🐴", "horse-snort.mp3", ...args);
const cluck = (...args: any[]): void => playSound("🐔", "chicken-click.mp3", ...args);
const longMeow = (...args: any[]): void => playSound("🐈🐾", "cat-meow.mp3", ...args);
const trumpet = (...args: any[]): void => playSound("🐘", "elephant-trumpets.mp3", ...args);

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

interface Play {
  playerList?: string[];
  sound: (file: string) => void;
}

const playAudioFile: Play = {
  sound: function (file: string): void {
    console.log(file);

    const e = document.getElementById(file) as HTMLMediaElement | null;
    console.log(e);

    const alarmElement = document.getElementById("alarm");
    if (alarmElement) alarmElement.remove();

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

  playAudioFile.sound = function (file: string): boolean | void {
    if (playAudioFile.playerList?.length === 0) {
      // console.log("No suitable audio player could be found - exiting.".red)
      return true;
    }
    const command = ["-v", "0.2", file];
    // console.log("playing".magenta + "=>".yellow + file.cyan)
    if (playAudioFile.playerList) {
      const child = spawn(playAudioFile.playerList[0], command);

      child.stderr.setEncoding("ascii");
      child.on("exit", function (code: number | null, signal: string | null): void {
        if (code == null || signal != null || code === 1) {
          // console.log("couldnt play, had an error " + "[code: " + code + "] " + "[signal: " + signal + "]")
        } else if (code === 127) {
          if (playAudioFile.playerList) {
            playAudioFile.playerList.shift();
            playAudioFile.sound(file);
          }
        } else if (code === 2) {
          // console.log(file.cyan + "=>".yellow + "could not be read by your player.".red)
        } else {
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

declare const path: any;
declare const playSound: (animalSymbol: string, soundFile: string, ...args: any[]) => void;
declare const sayMeow: (...args: any[]) => void;
declare const bark: (...args: any[]) => void;
declare const bark2: (...args: any[]) => void;
declare const moo: (...args: any[]) => void;
declare const manyMoos: (...args: any[]) => void;
declare const snort: (...args: any[]) => void;
declare const cluck: (...args: any[]) => void;
declare const longMeow: (...args: any[]) => void;
declare const trumpet: (...args: any[]) => void;
interface Play {
    playerList?: string[];
    sound: (file: string) => void;
}
declare const playAudioFile: Play;

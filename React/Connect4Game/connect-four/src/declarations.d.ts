//Allows for wav files to be played in the game for sound effects
declare module '*.wav' {
    const src: string; 
    export default src;
}

//Allows for mp3 files to be played in the game for sound effects
declare module '*.mp3' {
    const src: string; 
    export default src;
}
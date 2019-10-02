export function pickRandom(options : any[]) : any {
    return options[Math.floor(Math.random()*options.length)];
}
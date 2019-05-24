export interface Character {
    name: string;
}

const INIT_CHARACTERS_COUNT = 2;

export function getInitialCharacters(): Character[] {
    const characters: Character[] = [];

    for (let index = 0; index < INIT_CHARACTERS_COUNT; index++) {
        const newCharacter = makeCharacter();
        characters.push(newCharacter);
    }

    return characters;

}

export function makeCharacter(): Character {
    return {
        name: "bibi",
    };
}

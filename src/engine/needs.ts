export interface Needs {
    hunger: number;
}

export function getDefaultNeeds() : Needs {
    return {
        hunger: 0,
    }
}
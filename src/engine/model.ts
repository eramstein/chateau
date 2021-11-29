export interface GameState {
  world: World;
  characters: Character[];
  items: { [key: number]: Item };
  time: number; // minutes passed since T0
}

export interface World {
  regions: Region[];
}

export interface Region {
  name: string;
  description: string;
  places: Place[];
}

export interface Place {
  name: string;
  description: string;
  zones: Zone[];
}

export interface Zone {
  name: string;
  description: string;
}

export interface Item {
  id: number;
  type: ItemType;
  position: Position;
  name?: string;
  description?: string;
  isContainer?: boolean;
}

export enum ItemType {
  Food = "FOOD",
  Drink = "DRINK",
}

export type Food = Item & {
  foodType: FoodType;
};

export enum FoodType {
  Meat = "MEAT",
  Vegetable = "VEGETABLE",
  Baked = "BAKED",
}

export interface Character {
  name: string;
  position: Position;
  needs: Needs;
  health: Health;
}

export interface Position {
  region: number;
  place: number;
  zone: number;
}

export interface Needs {
  hunger: number;
  thirst: number;
}

export interface Health {
  alive: boolean;
}

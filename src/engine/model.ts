export interface GameState {
  world: World;
  characters: Character[];
  items: { [key: number]: Item };
  time: number; // minutes passed since T0
}

export interface World {
  tiles: Tile[][][];
}

export interface Tile {
  pos: Pos;
}

export interface Pos {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  pos: Pos;
}

export interface Item {
  id: number;
  type: ItemType;
  pos: Pos;
  carriedBy?: Character;
  name?: string;
  description?: string;
}

export enum ItemType {
  Food = "FOOD",
  Container = "CONTAINER",
}

export type Container = Item & {
  containerType: ContainerType;
  contentType: ContentType;
  volume: number;
  fillRatio: number;
};

export enum ContainerType {
  Bottle = "BOTTLE",
}

export enum ContentType {
  Water = "WATER",
}

export type Food = Item & {
  foodType: FoodType;
  calories: number;
};

export enum FoodType {
  Meat = "MEAT",
  Vegetable = "VEGETABLE",
  Baked = "BAKED",
}

export interface Character {
  name: string;
  pos: Pos;
  needs: Needs;
  health: Health;
  activity: Activity;
  objectives: Objective[];
  priorityObjective: Objective;
}

export interface Activity {
  type: ActivityType;
  doneRatio?: number;
  objectiveId: string;
  targetPos?: Pos;
  targetItemId?: number;
}

export enum ActivityType {
  Idle = "",
  Move = "MOVE",
  Consume = "CONSUME",
}

export interface Objective {
  id: string;
  type: ObjectiveType;
}

export enum ObjectiveType {
  None = "",
  Drink = "DRINK",
  Eat = "EAT",
}

export interface Needs {
  vital: {
    hunger: number;
    thirst: number;
    sleep: number;
  };
  confort: {};
  security: {};
  relational: {};
  social: {};
}

export interface Health {
  alive: boolean;
}

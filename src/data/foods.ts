import { Food, FoodType, ItemType } from "../engine/model";

const DEFAULTS: Food = {
  id: -1,
  type: ItemType.Food,
  foodType: FoodType.Baked,
  calories: 50,
  pos: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export const FOODS: { [key: string]: Food } = {
  Bread: {
    ...DEFAULTS,
    name: "Bread",
    foodType: FoodType.Baked,
  },
};

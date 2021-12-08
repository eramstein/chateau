import { Food, FoodType, ItemType } from "../engine/model";

const DEFAULTS: Food = {
  id: -1,
  type: ItemType.Food,
  foodType: FoodType.Baked,
  calories: 50,
  position: {
    region: 0,
    place: 0,
    zone: 0,
  },
};

export const FOODS: { [key: string]: Food } = {
  Bread: {
    ...DEFAULTS,
    name: "Bread",
    foodType: FoodType.Baked,
  },
};

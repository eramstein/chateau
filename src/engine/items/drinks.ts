import { ContentType, Container } from "../model";

const drinkable = [ContentType.Water];

export function isDrinkable(item: Container): boolean {
  return drinkable.indexOf(item.contentType) >= 0;
}

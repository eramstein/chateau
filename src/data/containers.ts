import {
  Container,
  ContainerType,
  ContentType,
  ItemType,
} from "../engine/model";

const DEFAULTS: Container = {
  id: -1,
  type: ItemType.Container,
  containerType: ContainerType.Bottle,
  contentType: ContentType.Water,
  volume: 1,
  fillRatio: 0,
  pos: {
    x: 0,
    y: 0,
    z: 0,
  },
};

export const CONTAINERS: { [key: string]: Container } = {
  WaterBottle: {
    ...DEFAULTS,
    name: "Water Bottle",
    containerType: ContainerType.Bottle,
    contentType: ContentType.Water,
    volume: 1000,
    fillRatio: 1,
  },
};

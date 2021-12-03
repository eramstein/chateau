import { Region } from "../engine/model";

export const REGIONS: { [key: string]: Region } = {
  Village: {
    name: "Village",
    description: "Un charmant petit village",
    places: [
      {
        name: "La maison de Robert",
        description: "Mais quelle jolie maison",
        zones: [
          {
            name: "Chambre",
            description: "La où on dort pardi",
            items: [],
          },
          {
            name: "Cuisine",
            description: "La où on cusine pardi",
            items: [],
          },
          {
            name: "Jardin",
            description: "Dehors",
            items: [],
          },
        ],
      },
    ],
  },
};

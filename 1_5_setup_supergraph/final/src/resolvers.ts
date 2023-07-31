import { HORSES } from "./data/horses";
import { RACES } from "./data/races";

export const resolvers = {
  Query: {
    races: () => RACES,
    horses: () => HORSES,
  },
  Horse: {
    __resolverReference(horse) {
      return HORSES.find((h) => h.id === horse.id);
    },
  },
  Race: {
    __resolverReference(race) {
      return RACES.find((r) => r.id === race.id);
    },
  },
};

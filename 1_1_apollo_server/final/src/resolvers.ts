import { Resolvers } from "./resolvers-types";
import { HORSES } from "./data/horses";
import { RACES } from "./data/races";

export const resolvers: Resolvers = {
  Query: {
    races: () => RACES,
    horses: () => HORSES,
  },
};

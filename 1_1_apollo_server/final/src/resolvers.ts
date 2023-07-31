import { HORSES } from "./data/horses";
import { RACES } from "./data/races";

export const resolvers = {
    Query: {
        races: () => RACES,
        horses: () => HORSES,
    }
};

import { HORSES } from "./data/horses";
import { RACES } from "./data/races";
import { Race, Horse } from './entities';

export const resolvers = {
    Query: {
        races: () => RACES,
        horses: () => HORSES,
    },
    Horse: {
        __resolveReference(horse: Horse) {
            return HORSES.find(h => h.id === horse.id);
        },
    },
    Race: {
        __resolveReference(race: Race) {
            return RACES.find(r => r.id === race.id)
        }
    }
};

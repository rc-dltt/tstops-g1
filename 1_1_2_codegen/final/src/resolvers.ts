import { Resolvers } from "./resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    races: (_, __, { dataSources }) => {
      return dataSources.races.list();
    },
    horses: (_, __, { dataSources }) => {
      return dataSources.horses.list();
    },
  },
  Race: {
    horses: (parent, __, { dataSources }) => {
      return dataSources.horses.list()
        .filter(horse => horse.race === parent.id);
    },
  },
  Horse: {
    race: (parent, _, { dataSources }) => {
      return dataSources.races.get(parent.race);
    },
  },
};

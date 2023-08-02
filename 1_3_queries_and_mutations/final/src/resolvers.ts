export const resolvers = {
  Query: {
    races: (_, __, { dataSources }) => {
      return dataSources.races.list();
    },
    horses: (_, __, { dataSources }) => {
      return dataSources.horses.list();
    },
  },
  Mutation: {
    addRace: (_, { command }, { dataSources }) => {
      command.horses = [];
      const id = dataSources.races.create(command);
      return {
        id,
        no: command.no,
        startTime: command.startTime,
        venue: command.venue,
        horses: command.horses,
      };
    },
    addHorse: (_, { command }, { dataSources }) => {
      const id = dataSources.horses.create(command);
      return {
        id,
        name: command.name,
        rank: command.rank,
      };
    },
    enrollHorse: (_, { command }, { dataSources }) => {
      const horse = dataSources.horses.get(command.horse);
      horse.race = command.race;
      dataSources.horses.update(horse);
      return horse;
    },
  },
  Race: {
    horses: (parent, __, { dataSources }) => {
      return dataSources.horses
        .list()
        .filter((horse) => horse.race === parent.id);
    },
  },
  Horse: {
    race: (parent, _, { dataSources }) => {
      return dataSources.races.get(parent.race);
    },
  },
};

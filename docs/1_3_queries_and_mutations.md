# 1.3 Queries and Mutations

In the demo folder you can find that we start from where we ledt at [apollo server lab](./1_1_1_setup_apollo_server.md)

We now want to add **mutations** to our schema

## Schema

Let's update our `schema.graphql` adding mutations to add new races and horses and to add a horse to a race

```graphql
schema {
    query: Query
    mutation: Mutation
}

...

type Mutation {
    addRace(command: AddRaceInput!): Race!
    addHorse(command: AddHorseInput!): Horse!
    enrollHorse(command: EnrollHorseInput!): Horse!
}

input AddRaceInput {
    no: Int
    startTime: String!
    venue: String
}

input AddHorseInput {
    name: String!
    rank: Int
}

input EnrollHorseInput {
  race: ID!
  horse:ID!
}

...
```

We need to add the missing resolvers to `resolvers.ts`

```ts
export const resolvers = {
  ...
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
  ...
};
```

Start the server and try some queries and mutations

## Next

You have completed this section

[< prev](./1_2_setup_apollo_client.md) | [home](../readme.md) | [next >](./1_4_securing_graphql_with_jwt.md)
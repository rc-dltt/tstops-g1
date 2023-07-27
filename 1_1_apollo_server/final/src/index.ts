import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  type Query {
    races: [Race]
  }

  type Race {
    id: ID!
    no: Int
    startTime: String!
    venue: String!
    horses: [Horse]!
  }

  type Horse {
    id: ID!
    name: String!
    rank: Int
  }
`;

const races = [
  {
    id: "race#1",
    no: 1001,
    startTime: "2023-08-31T19:00:00",
    venue: "Sha Tin Racecourse",
    horses: [],
  },
  {
    id: "race#2",
    no: 1002,
    startTime: "2023-08-31T19:15:00",
    venue: "Happy Valley Racecourse",
    horses: [],
  },
];

const resolvers = {
  Query: {
    races: () => races,
  },
};

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server is running at ${url}`);
}

start();

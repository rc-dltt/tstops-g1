export const typeDefs = `#graphql

  type Query {
    races: [Race]!
    horses: [Horse]!
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

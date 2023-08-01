import gql from "graphql-tag";

export const typeDefs = gql`#graphql

  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    matches: [FootballMatch]!
    teams: [Team]!
    players: [Player]!
  }

  type FootballMatch @key(fields: "id") {
    id: ID!
    no: Int
    startTime: String!
    venue: String!
    homeTeam: Team!
    visitorsTeam: Team!
  }

  type Team @key(fields: "id") {
    id: ID!
    name: String!
    country: String!
    players: [Player!]!
  }

  type Player @key(fields: "id") {
    id: ID!
    name: String!
    age: Int
    team: Team
  }
`;

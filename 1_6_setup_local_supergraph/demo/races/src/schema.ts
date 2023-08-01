import gql from "graphql-tag";

export const typeDefs = gql`#graphql

  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    races: [Race]!
    horses: [Horse]!
  }

  type Race @key(fields: "id") {
    id: ID!
    no: Int
    startTime: String!
    venue: String!
    horses: [Horse]!
  }

  type Horse @key(fields: "id") {
    id: ID!
    name: String!
    rank: Int
  }
`;

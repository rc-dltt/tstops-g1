import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";

import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const PORT = parseInt(process.env.PORT || "4001");
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`Server is running at ${url}`);
}

start();

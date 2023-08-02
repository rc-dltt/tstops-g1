import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

import { buildContext } from "./context";
import { resolvers } from "./resolvers";

config();

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const PORT = parseInt(process.env.PORT || "4001");
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: buildContext,
  });
  console.log(`Server is running at ${url}`);
}

start();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from '@apollo/subgraph';

import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

async function start() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const PORT = parseInt(process.env.PORT || "4001");
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });
  console.log(`Server is running at ${url}`);
}

start();

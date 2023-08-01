const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");

const supergraphSdl = readFileSync("./src/supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
});

const PORT = process.env.PORT || 4003;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

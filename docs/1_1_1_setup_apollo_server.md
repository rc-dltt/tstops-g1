# 1.1 Setup Apollo server

In this lab section we are going to create a simple graphQL server using Apollo

## Create the NodeJS module

The first step is to create a folder for our application

```bash
mkdir demo
cd demo
```

Now that we have out app folder, let's initialize a new NodeJs application

```bash
npm init
...
```

## Install dependencies

Let's now install the required `npm` dependencies

For this application, we are going to need `graphql` and `apollo-server`

```bash
npm install @apollo/server graphql
```

Let's now install typescript development dependencies

```bash
npm install --save-dev typescript @types/node
```

Create a new file named `tsconfig.json` in the root folder of your project 

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "commonjs",
        "outDir": "./dist" ,
        "strict": false,
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
            "*": [
                "src/types/*"
            ]
        },
        "esModuleInterop": true,
        "types": [
            "node"
        ],
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "**/*.spec.ts"
    ],
}
```

Add `compile` script in `package.json`

```json
...
"scripts": {
    "compile": "tsc"
}
...
```

and finally the `run` script

```json
...
"scripts": {
    "compile": "tsc",
    "start": "npm run compile && node ./dist/index.js"
}
...
```

This will compile and serve our application

If we try to run it now, we'll get an error

```bash
npm start
```

Let's fix it by adding an empty `index.ts` file in our `src` folder

Now our application runs correctly

```bash
npm start
> final@1.0.0 start
> npm run compile && node ./dist/index.js
> final@1.0.0 compile
> tsc
```

## Schema

Let's create a new `schema.graphql` file and add the graphql schema we are going to use for this application:

```graphql
schema {
    query: Query
}

type Query {
  users: [User!]!
  currentUser: User
  races: [Race]!
  horses: [Horse]!
}

type Race {
  id: ID!
  no: Int
  startTime: String!
  venue: String!
  horses: [Horse!]!
}

type Horse {
  id: ID!
  name: String!
  rank: Int
  race: Race
}
`;
```

The domain model is very simple: a collection of races, each one having a set of racing horses.


Now we can add our datasource. For this lab we are going to use a in memory list of Race and Horse objects as defined in our graph

Let's install `notarealdb` to mock a database

```bash
npm install notarealdb
```

Let's create a data folder under `src`:

```bash
mkdir data
```

and the following json files: 

`horses.json`

```json
[
    {
        "id": "horse#1",
        "name": "Tornado",
        "rank": 11
    },
    {
        "id": "horse#2",
        "name": "Roncinant",
        "rank": 99
    },
    {
        "id": "horse#3",
        "name": "Harry Trotter",
        "rank": 54
    },
    {
        "id": "horse#4",
        "name": "Pony Soprano",
        "rank": 14
    },
    {
        "id": "horse#5",
        "name": "Neigh Sayer",
        "rank": 86
    },
    {
        "id": "horse#6",
        "name": "Pony Montana",
        "rank": 77
    }
]
```
and `races.json`
```json
[
  {
    "id": "race#1",
    "no": 1001,
    "startTime": "2023-08-31T19:00:00",
    "venue": "Sha Tin Racecourse",
    "horses": ["horse#1", "horse#2", "horse#3"]
  },
  {
    "id": "race#2",
    "no": 1002,
    "startTime": "2023-08-31T19:15:00",
    "venue": "Happy Valley Racecourse",
    "horses": ["horse#4", "horse#5", "horse#6"]
  }
]
```

Finally add a `db.ts` file to expose the db collections

```ts
import { DataStore } from "notarealdb";

export const store = new DataStore("./dist/data");

export const races = store.collection("races");

export const horses = store.collection("horses");
```

For this to work at runtime we have to copy our data files in the `dist` folder. We are going to use the `copyfiles` npm package for this purpose

```bash
npm install copyfiles
```

and change our `scripts` section in `package.json` accordingly

```json
...
  "scripts": {
    "copy-data": "copyfiles -f ./src/data/*.json ./dist/data",
    "compile": "tsc && npm run copy-data",
    "start": "npm run compile && node ./dist/index.js"
  },
...
```

We should add our datasources in the context object.
Let's create a new file `context.ts`

```ts
import { horses, races } from "./db";

export const buildContext = async (req) => {
  const dataSources = {
    races,
    horses,
  };

  return {
    dataSources,
  };
};
```

We can now write the resolvers using our data sources.
Let's add a new `resolvers.ts` file 

```ts
export const resolvers = {
  Query: {
    races: (_, __, { dataSources }) => {
      return dataSources.races.list();
    },
    horses: (_, __, { dataSources }) => {
      return dataSources.horses.list();
    },
  },
  Race: {
    horses: (parent, __, { dataSources }) => {
      return dataSources.horses.list()
        .filter(horse => horse.race === parent.id);
    },
  },
  Horse: {
    race: (parent, _, { dataSources }) => {
      return dataSources.races.get(parent.race);
    },
  },
};
```

Note that we need to _resolve_ **Race.horses** objects for the `horses` query because in our db `horse.race` only returns a list of horse IDs but our schema requires a collection of **Horse** object.

Similarly we need to _resolve_ **Horse.race**. 

In both cases we can rely on the `parent` argument to filter the db collections


Finally we can create and initialize an instance of apollo server in `index.ts`.

Let's load the schema first:

```ts
import { readFileSync } from "node:fs";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");
```

and then we can initialize and run the server instance

```ts
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
```

For this to work we need a few imports: 

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
```

and our context and resolvers

```ts
import { buildContext } from "./context";
import { resolvers } from "./resolvers";
```

the complete `index.ts` should look like this

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";

import { buildContext } from "./context";
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
    context: buildContext,
  });
  console.log(`Server is running at ${url}`);
}

start();
```

## Querying the server

The server app is ready and we can run

```bash
npm start
```

We should see the following output

```bash
Server is running at http://localhost:4001/
```

and browsing to [http://localhost:4001/](http://localhost:4001/) we should see the default apollo studio page where we can test our first query

You can build the query interactively, ideally something like this:

```graphql
query GetRaces {
  races {
    id
    no
    startTime
    venue
    horses {
      name
    }
  }
}
```

Runing the query should return the list or races

```json
{
  "data": {
    "races": [
      {
        "id": "race#1",
        "no": 1001,
        "startTime": "2023-08-31T19:00:00",
        "venue": "Sha Tin Racecourse",
        "horses": [
          {
            "name": "Tornado"
          },
          {
            "name": "Roncinant"
          }
        ]
      },
      {
        "id": "race#2",
        "no": 1002,
        "startTime": "2023-08-31T19:15:00",
        "venue": "Happy Valley Racecourse",
        "horses": [
          {
            "name": "Harry Trotter"
          },
          {
            "name": "Pony Soprano"
          }
        ]
      }
    ]
  }
}
```

## Docker

Let's build and run the server application with docker

For this we need to create a `Dockerfile` with the following content

```Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY src ./src
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm run compile

CMD ["./dist/index.js"]
```

Let's build

```bash
docker build -t hkjc-demo-grapqh-server .
```

and run

```bash
docker run --rm -p 4001:4001 -e PORT=4001 hkjc-demo-grapqh-server
> Server is running at http://localhost:4001/
```

## CodeGen

We can improve our application by adding GraphQL code generation

Create a new file `schema.graphql` in the `src` folder

```graphql
schema {
    query: Query
}

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
```

add the `readFileSync` import in `index.ts` and assign `typeDefs` from `schema.graphql`

```ts
import { readFileSync } from "node:fs";
...
const typeDefs = readFileSync("./src/schema.graphql", "utf8");
```

Now we can install the following dev dependencies

```bash
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript-resolvers @graphql-codegen/typescript
```

and add `codegen.ts` in the root folder of the project

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  generates: {
    "./src/resolvers-types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
```

this is going to generate statically typed resolvers from the schema

Finally we add the codegen script in `package.json`

```json
  ...
  "scripts": {
    "generate": "graphql-codegen",
    ...
  },
  ...
```

Running the following should create a new file named `resolvers-types.ts` in the `src` folder

```bash
npm run generate
```

Update the `resolvers.ts` file importing the generated `Resolvers`

```ts
import { Resolvers } from "./resolvers-types";
...

export const resolvers: Resolvers = {
  ...
}
```

Let's try to run the application and verify that everything works as usual

```bash
npm start

> Server is running at http://localhost:4001/
```

## Next

You have completed this section

[< prev](./0_1_setup_environment.md) | [home](../readme.md) | [next >](./1_1_2_codegen.md)
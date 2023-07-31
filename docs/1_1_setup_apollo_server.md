# 1.1 Setup Apollo server

In this lab section we are going to create a simple graphQL server using Apollo

## Create the NodeJS module

The first step is to create a folder for our application

```bash
app_name=<your app folder name>

mkdir $app_name
cd $app_name
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

Let's create a new `schema.ts` file and add the graphql schema we are going to use for this application:

```ts
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
```

The domain model is very simple: a collection of races, each one having a set of racing horses.

Now we can add our datasource. For this lab we are going to use a in memory list of Race and Horse objects as defined in our graph


Let's create a data folder under `src`:

```bash
mkdir data
```

and two files: `horses.ts` and `races.ts`

```ts
export const HORSES = [
    {
        id: "horse#1",
        name: "Tornado",
        rank: 11,
    },
    {
        id: "horse#2",
        name: "Roncinant",
        rank: 99,
    },
    {
        id: "horse#3",
        name: "Harry Trotter",
        rank: 54,
    },
    {
        id: "horse#4",
        name: "Pony Soprano",
        rank: 14,
    },
    {
        id: "horse#5",
        name: "Neigh Sayer",
        rank: 86,
    },
    {
        id: "horse#6",
        name: "Pony Montana",
        rank: 77,
    },
];
```

```ts
import { HORSES } from "./horses";

export const RACES = [
    {
        id: "race#1",
        no: 1001,
        startTime: "2023-08-31T19:00:00",
        venue: "Sha Tin Racecourse",
        horses: HORSES.slice(0,3),
    },
    {
        id: "race#2",
        no: 1002,
        startTime: "2023-08-31T19:15:00",
        venue: "Happy Valley Racecourse",
        horses: HORSES.slice(3),
    },
];
```

We can now write the resolvers which will just return out in memory collections.
Let's add a new `resolvers.ts` file 

```ts
import { HORSES } from "./data/horses";
import { RACES } from "./data/races";

export const resolvers = {
    Query: {
        races: () => RACES,
        horses: () => HORSES,
    }
};
```

Finally we can create and initialize an instance of apollo server in `index.ts`.

In order to do that, let's first add the following `import` directives at the top of our file

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
```

we need to import our schema and resolvers

```ts
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
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
  });
  console.log(`Server is running at ${url}`);
}

ssstart();
```

## Querying the server

The server app is ready and we can run it with

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
query Races {
  races {
    id
    no
    startTime
    venue
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
        "venue": "Sha Tin Racecourse"
      },
      {
        "id": "race#2",
        "no": 1002,
        "startTime": "2023-08-31T19:15:00",
        "venue": "Happy Valley Racecourse"
      }
    ]
  }
}
```

## Next

You have completed this section

[< prev](./0_1_setup_environment.md) | [home](../readme.md) | [next >](./1_2_setup_apollo_client.md)
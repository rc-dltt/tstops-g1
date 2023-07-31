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
npm init --yes && npm pkg set type="module"
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
        "rootDirs": [
            "src"
        ],
        "outDir": "dist",
        "lib": [
            "es2022"
        ],
        "target": "es2022",
        "module": "esnext",
        "moduleResolution": "node",
        "esModuleInterop": true,
        "types": [
            "node"
        ]
    },
    "include": ["src/**/*"],
    "exclude": ["**/*.spec.ts"]
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

In the `index.ts` file let's add the graphql schema we are going to use for this application:

```ts
const typeDefs = `#graphql

  type Query {
    races: [Race]
  }

  type Race {
    id: ID!
    no: Int
    startTime: Date
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

Now we can add our datasource. For this lab we are going to use a in memory list of Race objects as defined in our graph

```ts
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
```

We can now write the resolvers - in this case we only have one.
The races resolver will just return our list of races

```ts
const resolvers = {
  Query: {
    races: () => races,
  },
};
```

Finally we can create and initialize an instance of apollo server.

In order to do that, let's first add the following `import` directives at the top of our file

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
```

and then we can initialize and run the server instance

```ts
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
```

## Querying the server

The server app is ready and we can run it with

```bash
npm start
```

We should see the following output

```bash
Server is running at http://localhost:4000/
```

and browsing to [http://localhost:4000/](http://localhost:4000/) we should see the default apollo studio page where we can test our first query

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
# 1.5 Setup a supergraph with ApolloOS

In this lab section we are going to use graphQL **ApolloOS** to compose a super graph from two existing subgraphs  

## Update our graph

In order to use an existing graph as subgraph we need to make some changes to our schema and our server

A list of federated-compatibel subgraph libraries can be found in the official documentation [here](https://www.apollographql.com/docs/federation/building-supergraphs/supported-subgraphs) and `@apollo/subgraph` is one of these.

Change current directory to `1_5_setup_supergraph/server`; this is where we left off from section [1.1 Setup Apollo Server](./1_1_setup_apollo_server.md)

```bash
cd ./1_5_setup_supergraph/server
```

Let's add `@apollo/subgraph` and `graphql-tag`

```bash
npm install graphql-tag @apollo/subgraph
```

We can now update our schema to make it a federation-compatible subgraph. Open `schema.ts` and add the tag import

```ts
import { gql } from "graphql-tag"; 
```


Then add the following line at the top of the schema

```graphql
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
```

and finally add `@key` directive to our entities:

```graphql
...
type Race @key(fields: "id") {
    ...
}

...
type Horse @key(fields: "id") {
    ...
}
```

Our schema is now ready.

Next step is adding `__resolveReference` to our resolvers. Open `resolvers.ts` and add the following after the `Query` object

```ts
Horse: {
    __resolverReference(horse) {
        return HORSES.find(h => h.id === horse.id);
    }
},
Race: {
    __resolverReference(race) {
        return RACES.find(r => r.id === race.id);
    }
}
```

Normally we would pass the context object and query the database, like

```ts
Horse: {
    __resolverReference(horse, context) {
        return context.api.findHorseById(horse.id);
    }
}
```

Finally we need to use the subgraph in our Apollo server.
Open `index.ts` and import `@apollo/subgraph`

```ts
import { buildSubgraphSchema } from "@apollo/subgraph";
```

and change the `ApolloServer` initialization as follows

```ts
const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs, 
      resolvers
    })
});
```

Our subgraph is ready to be added to a supergraph and for this it must be visible from ApolloOS.

We have already deployed our races service at: [https://dltt-races-717a66b9ce08.herokuapp.com/](https://dltt-races-717a66b9ce08.herokuapp.com/)

## Create a supergraph

For this we are going to need an ApolloOS account

Open Apollo Studio and create a new account [https://studio.apollographql.com/signup](https://studio.apollographql.com/signup)

Now we can click on the **+ Create New Graph** button 

Add our first supergraph url in the Endpoint URL and a unique name as Subgraph Name, for example `hkjc-demo-races-001`

Input values Supergraph ID: `hkjc-demo-supergraph-001`, Supergraph Name: `HKJC Demo Supergraph` and confirm.

After a while a new supergraph `hkjc-demo-supergraph-001@main` will be provisioned

## Add a subgraph via rover

Let's add a second subgraph but this time using `rover cli`.

Install rover 

```bash
curl -sSL https://rover.apollo.dev/nix/latest | sh
```

We are going to need an api key to login rover. Let's create one from our Apollo Studio profile
Click `Personal settings` link.
Select `API Key` from the left menu and create a new Key named, for example `hkjc-demo-001-api-key`.

Login rover

```bash
rover config auth 
```

and paste the api key.

We are going to add a second `football-matches` service subgraph.
For convenience it was already published here [https://dltt-matches-a3f8f625791e.herokuapp.com/](https://dltt-matches-a3f8f625791e.herokuapp.com/)

We are going to add it to our supergraph with the unique name: `hkjc-demo-matches-001`

Let's inspect the schema with rover:

```bash
rover subgraph introspect https://dltt-matches-a3f8f625791e.herokuapp.com

Introspection Response: 

schema
  @link(url: "https://specs.apollo.dev/link/v1.0")
{
  query: Query
}

extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

directive @link(url: String, as: String, for: link__Purpose, import: [link__Import]) repeatable on SCHEMA

directive @key(fields: federation__FieldSet!, resolvable: Boolean = true) repeatable on OBJECT | INTERFACE

directive @federation__requires(fields: federation__FieldSet!) on FIELD_DEFINITION

directive @federation__provides(fields: federation__FieldSet!) on FIELD_DEFINITION

directive @federation__external(reason: String) on OBJECT | FIELD_DEFINITION

directive @federation__tag(name: String!) repeatable on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ARGUMENT_DEFINITION | SCALAR | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION

directive @federation__extends on OBJECT | INTERFACE

directive @shareable on OBJECT | FIELD_DEFINITION

directive @federation__inaccessible on FIELD_DEFINITION | OBJECT | INTERFACE | UNION | ARGUMENT_DEFINITION | SCALAR | ENUM | ENUM_VALUE | INPUT_OBJECT | INPUT_FIELD_DEFINITION

directive @federation__override(from: String!) on FIELD_DEFINITION

type Query {
  matches: [FootballMatch]!
  teams: [Team]!
  players: [Player]!
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
}

type FootballMatch
  @key(fields: "id")
{
  id: ID!
  no: Int
  startTime: String!
  venue: String!
  homeTeam: Team!
  visitorsTeam: Team!
}

type Team
  @key(fields: "id")
{
  id: ID!
  name: String!
  country: String!
  players: [Player!]!
}

type Player
  @key(fields: "id")
{
  id: ID!
  name: String!
  age: Int
  team: Team
}

enum link__Purpose {
  """
  `SECURITY` features provide metadata necessary to securely resolve fields.
  """
  SECURITY

  """
  `EXECUTION` features provide metadata necessary for operation execution.
  """
  EXECUTION
}

scalar link__Import

scalar federation__FieldSet

scalar _Any

type _Service {
  sdl: String
}

union _Entity = FootballMatch | Player | Team
```

Rover allows us to check the compatibility and validate the schema

```bash
rover subgraph introspect https://dltt-matches-a3f8f625791e.herokuapp.com | \
  rover subgraph check hkjc-demo-supergraph-001@main \
  --schema - \
  --name hkjc-demo-matches-001
...

Checking the proposed schema for subgraph hkjc-demo-matches-001 against hkjc-demo-supergraph-001@main

There were no changes detected in the composed API schema, but the core schema was modified.

Operation Check [PASSED]:
Compared 20 schema changes against 0 operations.
┌────────┬─────────────┬──────────────────────────────────────────────────┐
│ Change │    Code     │                   Description                    │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED  │ type `FootballMatch`: created                    │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `id` added           │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `no` added           │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `startTime` added    │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `venue` added        │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `homeTeam` added     │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `FootballMatch`: field `visitorsTeam` added │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED  │ type `Player`: created                           │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Player`: field `id` added                  │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Player`: field `name` added                │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Player`: field `age` added                 │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Player`: field `team` added                │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Query`: field `matches` added              │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Query`: field `teams` added                │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Query`: field `players` added              │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED  │ type `Team`: created                             │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Team`: field `id` added                    │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Team`: field `name` added                  │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Team`: field `country` added               │
├────────┼─────────────┼──────────────────────────────────────────────────┤
│ PASS   │ FIELD_ADDED │ type `Team`: field `players` added               │
└────────┴─────────────┴──────────────────────────────────────────────────┘
```

After checking that everything is valid, we can add it to the supergraph

```bash
rover subgraph introspect https://dltt-matches-a3f8f625791e.herokuapp.com | \
  rover subgraph publish hkjc-demo-supergraph-001@main \
  --name hkjc-demo-matches-001 \
  --schema - \
  --routing-url "https://dltt-matches-a3f8f625791e.herokuapp.com"
```

## Query the Supergraph

Now that we have successfully created our supergraph we can run some queries
In Apollo Studio open the supergraph and click on `Explorer` in the left menu.

Let's query from but our subgraphs

```gql
query Events {
  matches {
    id
    no
    venue
    homeTeam {
      name
    }
    visitorsTeam {
      name
    }
  }
  races {
    id
    no
    venue
    horses {
      name
    }
  }
}
```

This should return something like

```json
{
  "data": {
    "matches": [
      {
        "id": "match#1",
        "startTime": "2023-08-31T20:00:00",
        "venue": "Etihad Stadium",
        "homeTeam": {
          "name": "Manchester City"
        },
        "visitorsTeam": {
          "name": "Bayern München"
        }
      },
      {
        "id": "match#2",
        "startTime": "2023-08-24T20:00:00",
        "venue": "Allianz Arena",
        "homeTeam": {
          "name": "Bayern München"
        },
        "visitorsTeam": {
          "name": "Real Madrid"
        }
      },
      {
        "id": "match#3",
        "startTime": "2023-08-17T20:00:00",
        "venue": "Santiago Bernabeu Stadium",
        "homeTeam": {
          "name": "Real Madrid"
        },
        "visitorsTeam": {
          "name": "Manchester City"
        }
      }
    ],
    "races": [
      {
        "id": "race#1",
        "startTime": "2023-08-31T19:00:00",
        "venue": "Sha Tin Racecourse"
      },
      {
        "id": "race#2",
        "startTime": "2023-08-31T19:15:00",
        "venue": "Happy Valley Racecourse"
      }
    ]
  }
}
```

If not responding, we can configure the cloud rourter in the settings to allow cors origins (NOT for production)

```yaml
cors:
  allow_any_origin: true
...
```

## Next

You have completed this section

[< prev](./1_4_securing_graphql_with_jwt.md) | [home](../readme.md) | [next >](./1_6_setup_local_supergraph.md)
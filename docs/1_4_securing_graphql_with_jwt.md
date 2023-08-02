# 1.4 Securing your GraphQL enpoint with JWT

## Demo project

We start from the basic Apollo Server application from [the first lab](./1_3_queries_and_mutations.md)


We want to add JWT authentication to our GraphQL server

## Schema

We are going to need new types in our schema

```graphql
...
type Mutation {
    login(email: String!, password: String!): String
    ...
}

type User {
    id: ID!
    name: String!
    email: String!
    roles: [String!]!
    permissions: [String!]!
}
```

## Data

Let's add some users in the db

```json
[
  {
    "id": "user#1",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "pAsSWoRd!",
    "roles": ["user", "admin"]
  },
  {
    "id": "user#2",
    "name": "Mary Sue",
    "email": "marysue@email.com",
    "password": "pAsSWoRd!",
    "roles": ["user"]
  }
]
```

Let's export the users collection in `db.ts`

```ts
...
export const users = store.collection("users");
```

and add the users collection to the data sources in `context.ts`

```ts
import { horses, races, users } from "./db";

export const buildContext = async (req) => {
  const dataSources = {
    races,
    horses,
    users,
  };

  return {
    dataSources,
  };
};
```

## Dependencies

We are going to need `jsonwebtoken` to generate a valid token for our clients and we need to load our JWT secret from a local .env file and load it with `dotenv`

```bash
npm install jsonwebtoken dotenv
```

Let's create the `.env` file

```env
PORT=4001
JWT_SECRET=<your-secret>
```

let's load the env file in `index.ts`

```ts
...
import { config } from "dotenv";

config();
...
```

## Context and Resolvers

We now need to update `context.ts` to make the current user available for all requests

```ts
import { verify } from "jsonwebtoken";
...

const getPrincipal = (token) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch(err) {
    return null;
  }
}

export const buildContext = async ({ req }) => {
  
  const token = (req.headers && req.headers["x-access-token"]) ?? "";

  const principal = getPrincipal(token);

  const dataSources = {
    races,
    horses,
    users,
  };

  return {
    dataSources,
    principal,
  };
};
```

Finally we need to _resolve_ the login mutation, let's modify `resolvers.ts`

```ts
import { sign } from "jsonwebtoken";

...
Mutation: {
    login(_, { email, password }, { dataSources }) {
      const { id, roles } = dataSources.users
        .list()
        .find(user => user.email === email && user.password === password);
      return sign({ id, roles }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        subject: id,
        expiresIn: "1d",
      });
    },
    ...
},
...
```

## Authorization

Try adding authorization to your queries and mutations


## Next

You have completed this section

[< prev](./1_3_queries_and_mutations.md) | [home](../readme.md) | [next >](./1_5_setup_supergraph_with_apollo_os.md)
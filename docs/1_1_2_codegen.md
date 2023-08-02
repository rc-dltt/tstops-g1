# 1.1.2 Setup codegen for typescript

In this lab section we are going to setup typescript codegen for Apollo resolvers 

## Demo project

We start from where we left in the [previous lab](./1_1_1_setup_apollo_server.md), an Apollo Server graphql standalone application.

We can improve our application by adding GraphQL code generation


## Install dependencies

Let's install the following dev dependencies

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

Finally we add the codegen script in `package.json` and have it run automatically before compilation

```json
  ...
  "scripts": {
    "generate": "graphql-codegen",
    ...
    "compile": "npm run generate && tsc && npm run copy-data",
    ...
  },
  ...
```

Running either compile or generate scripts should create a new file named `resolvers-types.ts` in the `src` folder

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

[< prev](./1_1_1_setup_apollo_server.md) | [home](../readme.md) | [next >](./1_2_setup_apollo_client.md)
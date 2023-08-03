# 1.2 Create Queries and Mutations

In this lab section we are going to create queries and mutations based on the `schema.graphql` on server side.

## Creating Queries in `query.js`

`query.js`
```js
...
const allRaceQuery = gql`
  query races {
    races{
      id
      no
      startTime
      venue
    }
  }
`;

const allHorseQuery = gql`
  query horses {
    horses {
        id
        name
        rank
      }
    }
`;
...
```

## Create Mutations in `mutation.js`
`mutation.js`
```js
...

const addRaceMutation = gql`
  mutation addRace(
    $command: AddRaceInput!
  ) {
    addRace(
      command: $command) {
      no
      startTime
      venue
    }
  }
`;

const addHorseMutation = gql`
  mutation addHorse(
    $command: AddHorseInput!
  ) {
    addHorse(
      command: $command) {
      name
      rank
    }
  }
`;

const enrollHorseMutation = gql`
  mutation enrollHorse(
    $command: EnrollHorseInput!
  ) {
    enrollHorse(
      command: $command) {
      race
      horse
    }
  }
`;
...
```

## Exporting Queries and Mutations
Export the queries and mutations at the end of each file for further use.

`query.js`
```js
...
export {
  allRaceQuery,
  allHorseQuery
};
```

`mutation.js`
```js
...
export {
  addRaceMutation,
  addHorseMutation,
  enrollHorseMutation
};
```

## Next

You have completed this section

[< prev](./1_1_create_react-native-project.md) | [home](../readme.md) | [next >](./1_3_setup_application.md)
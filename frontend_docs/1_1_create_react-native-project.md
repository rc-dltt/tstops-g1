# 1.1 Create React-Native Project

In this lab section we are going to create a react-native project using React-Native CLI.

## Create the NodeJS module

The first step is to create a folder for our application

```bash
mkdir frontend
cd frontend
```

Now that we have our app folder, let's initialize a new NodeJs application

```bash
npm init
...
```

## Install packages

Let's now install the required `npm` packages.

For this application, we are going to need `react`, `react-native`, `react-native-paper`, `@apollo/client`, `@react-native-async-storage/async-storage` and `graphql-tag`.

```bash
npm install react react-native react-native-paper @apollo/client @react-native-async-storage/async-storage graphql-tag
```

## Create React-Native project wtih React-Native CLI
To create a react-native project named  `frontend-demo`.
```bash
npx react-native@latest init frontend-demo
```

Add `build:ios` script in `package.json`

```json
...
"scripts": {
    "build:ios": "react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=true --platform='ios'"
}
...
```

## Create `LandingPage.js` / `query.js` / `mutation.js`

Create `LandingPage.js`, `query.js` and `mutation.js` in project's root directory with packages imported.

`LandingPage.js`
```js
import { React, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
...
```

`query.js`
```js
import { gql } from 'graphql-tag';
...
```

`mutation.js`
```js
import { gql } from 'graphql-tag';
...
```

## Import packages, `LandingPage.js` and setup Apollo Client in `App.js`
`App.js`
```js
import { React } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './LandingPage';

const client = new ApolloClient({
  link: createHttpLink({
  uri: 'http://localhost:4001/'
});,
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
      <LandingPage/>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
```

## Next

You have completed this section

[< prev](./0_1_setup_environment.md) | [home](../readme.md) | [next >](./1_2_create_queries_mutations.md)
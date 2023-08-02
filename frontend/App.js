import { React } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink } from '@apollo/client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloProvider } from '@apollo/react-hooks';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './LandingPage';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4001',
  }),
  cache: new InMemoryCache(),
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

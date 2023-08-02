import { React } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import LandingPage from './LandingPage';


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <LandingPage/>
    </ApolloProvider>
  );
};

export default App;

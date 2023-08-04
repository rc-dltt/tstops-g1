import { React } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './LandingPage';

const client = new ApolloClient({
  link: createHttpLink({
  uri: 'http://localhost:4001/'
}),
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
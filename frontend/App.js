import { React } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setContext } from '@apollo/client/link/context';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './LandingPage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
console.log(getToken(), 'TOKEN')
const authLink = setContext(async (_, { headers }) => {

  const token = await getToken();
  return {
    headers: {
      ...headers,
      'x-access-token': token ? `${token}` : ""
    },
  };

});

const httpLink = createHttpLink({
  uri: 'http://localhost:4001/'
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

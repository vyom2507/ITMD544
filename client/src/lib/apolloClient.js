import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // Adjust the URI if your server runs on a different port
  cache: new InMemoryCache(),
});

export default client;
